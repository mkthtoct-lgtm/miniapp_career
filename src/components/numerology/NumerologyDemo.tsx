import React, { useEffect, useRef, useState } from "react";
import { openChat, openPhone, showToast } from "zmp-sdk/apis";

import { analyzeNumerology, buildFallbackResult, fetchNumerologyMeta, sendNumerologyPdfEmail } from "./api";
import Swal from "sweetalert2";
import NumerologyInputScreen from "./NumerologyInputScreen";
import NumerologyLoadingScreen from "./NumerologyLoadingScreen";
import NumerologyResultScreen from "./NumerologyResultScreen";
import NumerologyWelcomeScreen from "./NumerologyWelcomeScreen";
import { NumerologyEducationOption, NumerologyFormValues, NumerologyResultData } from "./types";

const BG_MUSIC_URL =
  "https://res.cloudinary.com/dfvaxlkol/video/upload/v1777883307/Nh%E1%BA%A1c_t%E1%BA%A7n_s%E1%BB%91_963_Hz_%C4%90%C3%A1nh_th%E1%BB%A9c_tr%E1%BB%B1c_gi%C3%A1c_Th%E1%BB%A9c_t%E1%BB%89nh_tri_ki%E1%BA%BFn_th%E1%BB%A9c_con_ng%C6%B0%E1%BB%9Di_cao_h%C6%A1n_pgywyn.mp3";

type DemoScreen = "welcome" | "input" | "loading" | "result";

type NumerologyDemoProps = {
  onExit?: () => void;
  initialValues?: Partial<NumerologyFormValues>;
};

const OA_ID = "2112176407138597287";
const HOTLINE = "18009078";

const NumerologyDemo: React.FC<NumerologyDemoProps> = ({ onExit, initialValues }) => {
  const [screen, setScreen] = useState<DemoScreen>("welcome");
  const [previousScreen, setPreviousScreen] = useState<DemoScreen>("welcome");
  const [educationOptions, setEducationOptions] = useState<NumerologyEducationOption[]>([]);
  const [formValues, setFormValues] = useState<NumerologyFormValues>({
    fullName: "",
    phone: "",
    birthDate: "",
    email: "",
    province: "",
    district: "",
    educationLevel: "",
    ...initialValues,
  });
  const [resultData, setResultData] = useState<NumerologyResultData>(buildFallbackResult(formValues));
  const [isSendingPdfEmail, setIsSendingPdfEmail] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    fetchNumerologyMeta().then(setEducationOptions);
  }, []);

  // Background music — plays on mount, stops on unmount
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio(BG_MUSIC_URL);
    audio.loop = true;
    audio.volume = 0.3;
    audioRef.current = audio;

    // Attempt to play (may be blocked by autoplay policy until user interaction)
    audio.play().catch(() => {
      // Autoplay blocked — will retry on first user interaction
      const resume = () => {
        audio.play().catch(() => {});
        document.removeEventListener("pointerdown", resume);
      };
      document.addEventListener("pointerdown", resume, { once: true });
    });

    return () => {
      audio.pause();
      audio.currentTime = 0;
      audioRef.current = null;
    };
  }, []);

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isMuted) {
      audio.volume = 0.3;
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
    setIsMuted(!isMuted);
  };

  const musicToggleButton = (
    <button
      type="button"
      onClick={toggleMute}
      className="fixed bottom-6 right-4 z-50 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white shadow-lg backdrop-blur-md transition-transform active:scale-90"
      aria-label={isMuted ? "Bật nhạc" : "Tắt nhạc"}
    >
      {isMuted ? (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
        </svg>
      ) : (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
        </svg>
      )}
    </button>
  );

  if (screen === "welcome") {
    return (
      <>
        <NumerologyWelcomeScreen onStart={() => setScreen("input")} onBack={onExit} />
        {musicToggleButton}
      </>
    );
  }

  if (screen === "input") {
    return (
      <>
        <NumerologyInputScreen
          initialValues={formValues}
          educationOptions={educationOptions}
          onBack={() => setScreen("welcome")}
          onSubmit={async (values) => {
            setFormValues(values);
            setPreviousScreen("input");
            setScreen("loading");

            try {
              const nextResult = await analyzeNumerology(values);
              setResultData(nextResult);
            } catch (error) {
              console.error("[Numerology] Phân tích thất bại. Vui lòng thử lại sau!!!", {
                values,
                error,
              });
              setResultData(buildFallbackResult(values));
            } finally {
              setScreen("result");
            }
          }}
        />
        {musicToggleButton}
      </>
    );
  }

  if (screen === "loading") {
    return (
      <>
        <NumerologyLoadingScreen title="Đang phân tích..." subtitle="Hệ thống đang giải mã các con số của bạn." />
        {musicToggleButton}
      </>
    );
  }

  return (
    <>
      <NumerologyResultScreen
        data={resultData}
        isSendingPdfEmail={isSendingPdfEmail}
        onBack={() => setScreen(previousScreen)}
        onDownloadPdf={async () => {
          if (isSendingPdfEmail) {
            return;
          }

          if (!resultData.submissionId) {
            await showToast({
              message: "Báo cáo PDF chưa sẵn sàng. Vui lòng thử lại sau!!!",
            });
            return;
          }

          setIsSendingPdfEmail(true);
          try {
            const sent = await sendNumerologyPdfEmail(resultData.submissionId, formValues.email);
            await Swal.fire({
              title: "Thành công!",
              text: `Đã gửi PDF báo cáo đến email: ${sent.email}`,
              icon: "success",
              confirmButtonText: "Đóng",
              confirmButtonColor: "#1e3a8a", // blue-900 to match theme
            });
          } catch (error) {
            console.error("[Numerology] Gửi PDF thất bại", {
              submissionId: resultData.submissionId,
              email: formValues.email,
              error,
            });
            await showToast({
              message: error instanceof Error ? error.message : "Không thể gửi PDF qua email. Vui lòng thử lại!!!",
            });
          } finally {
            setIsSendingPdfEmail(false);
          }
        }}
        onConnectExpert={async () => {
          try {
            await openChat({
              type: "oa",
              id: OA_ID,
              message: `Tôi muốn được tư vấn lộ trình Thần số học. Mã hồ sơ: ${resultData.submissionId || "chưa có"}.`,
            });
          } catch (error) {
            console.error("[Numerology] openChat failed, fallback to hotline", error);
            try {
              await openPhone({
                phoneNumber: HOTLINE,
              });
            } catch (phoneError) {
              console.error("[Numerology] openPhone failed", phoneError);
              await showToast({
                message: "Không thể kết nối. Vui lòng gọi hotline 1800 9078!!!",
              });
            }
          }
        }}
      />
      {musicToggleButton}
    </>
  );
};

export default NumerologyDemo;
