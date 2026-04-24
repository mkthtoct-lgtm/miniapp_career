import React, { useEffect, useState } from "react";
import { openChat, openDocument, openPhone, showToast } from "zmp-sdk/apis";

import { analyzeNumerology, buildFallbackResult, buildNumerologyPdfUrl, fetchNumerologyMeta } from "./api";
import NumerologyInputScreen from "./NumerologyInputScreen";
import NumerologyLoadingScreen from "./NumerologyLoadingScreen";
import NumerologyResultScreen from "./NumerologyResultScreen";
import NumerologyWelcomeScreen from "./NumerologyWelcomeScreen";
import { NumerologyEducationOption, NumerologyFormValues, NumerologyResultData } from "./types";

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

  useEffect(() => {
    fetchNumerologyMeta().then(setEducationOptions);
  }, []);

  if (screen === "welcome") {
    return <NumerologyWelcomeScreen onStart={() => setScreen("input")} onBack={onExit} />;
  }

  if (screen === "input") {
    return (
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
            console.error("[Numerology] Phân tích thất bại, đang sử dụng kết quả dự phòng", {
              values,
              error,
            });
            setResultData(buildFallbackResult(values));
          } finally {
            setScreen("result");
          }
        }}
      />
    );
  }

  if (screen === "loading") {
    return <NumerologyLoadingScreen title="Đang phân tích..." subtitle="Hệ thống đang giải mã các con số của bạn." />;
  }

  return (
    <NumerologyResultScreen
      data={resultData}
      onBack={() => setScreen(previousScreen)}
      onDownloadPdf={async () => {
        if (!resultData.submissionId) {
          await showToast({
            message: "Báo cáo PDF chưa sẵn sàng. Vui lòng thử lại sau.",
          });
          return;
        }

        const pdfUrl = buildNumerologyPdfUrl(resultData.submissionId);

        try {
          await openDocument({
            url: pdfUrl,
            title: `Báo cáo Thần số học - ${resultData.fullName}`,
            share: true,
            download: true,
            edit: false,
          });
        } catch (error) {
          console.error("[Numerology] openDocument failed", { pdfUrl, error });
          await showToast({
            message: "Không thể mở tập tin PDF. Vui lòng thử lại.",
          });
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
              message: "Không thể kết nối. Vui lòng gọi hotline 1800 9078.",
            });
          }
        }
      }}
    />
  );
};

export default NumerologyDemo;