import React, { useState } from "react";
import { followOA, getPhoneNumber, getAccessToken } from "zmp-sdk/apis";

const OA_ID = "2112176407138597287";
const OA_STORAGE_KEY = "HTO_OA_FOLLOW_STATUS";

type WelcomeScreenProps = {
  onStart?: (phone?: string) => void;
  onBack?: () => void;
};

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart, onBack }) => {
  const [isStarting, setIsStarting] = useState(false);
  const [isAgreed, setIsAgreed] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);

  const handleStart = async () => {
    if (isStarting || !isAgreed) return;
    setIsStarting(true);

    const hasFollowed = localStorage.getItem(OA_STORAGE_KEY);
    if (hasFollowed !== "true") {
      try {
        await followOA({ id: OA_ID });
        localStorage.setItem(OA_STORAGE_KEY, "true");
      } catch {
        console.log("[ZaloSDK] User closed follow OA popup or declined.");
      }
    }

    let fetchedPhone = "";

    try {
      const accessToken = await getAccessToken({});
      const { token } = await getPhoneNumber({});

      const response = await fetch("https://api.hto.edu.vn/get-phone-new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          accessToken,
          code: token,
        }),
      });

      const data = await response.json();
      fetchedPhone =
        data?.phoneNumber ||
        data?.data?.number ||
        data?.data?.phone_number ||
        data?.number ||
        "";
    } catch (error) {
      console.error("[Zalo SDK / API Error] Failed to get phone number", error);
    } finally {
      setIsStarting(false);
      onStart?.(fetchedPhone);
    }
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-y-auto bg-gradient-to-b from-[#0f172a] via-[#1e3a8a] to-[#0ea5e9] px-5 pb-[env(safe-area-inset-bottom)] pt-[env(safe-area-inset-top)] fade-in">
      <div className="pointer-events-none absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20" />
      <div className="pointer-events-none absolute left-1/2 top-20 h-64 w-64 -translate-x-1/2 rounded-full bg-cyan-500/30 blur-[80px]" />

      <div className="relative z-10 mt-6 mb-4 flex flex-col items-center">
        <div className="mb-4 flex w-full justify-start">
          <button
            type="button"
            onClick={onBack}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/10 backdrop-blur-md"
          >
            <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        </div>

        <div className="rounded-2xl border border-white/20 bg-white/10 p-3 shadow-[0_0_30px_rgba(14,165,233,0.3)] backdrop-blur-md">
          <img
            src="https://res.cloudinary.com/djyq3kmgb/image/upload/v1771898961/Logo_HTO_GROUPpng-02_2_fpe7wl.png"
            alt="HTO Logo"
            className="h-14 w-14 object-contain"
          />
        </div>

        <h1 className="mt-3 bg-gradient-to-r from-cyan-300 to-blue-100 bg-clip-text text-center text-3xl font-black uppercase leading-tight tracking-widest text-transparent drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]">
          HTO FUTURE MAP
        </h1>

        <h2 className="mt-1 flex items-center justify-center gap-2 whitespace-nowrap text-xl font-bold uppercase tracking-wider text-yellow-400 drop-shadow-md">
          <span>Ban Do Tuong Lai 2030</span>
          <span className="text-2xl">🌍</span>
        </h2>

        <p className="mt-2 px-1 text-center text-base font-medium leading-relaxed text-blue-100">
          Kham pha lo trinh su nghiep den 2030 qua nhung cau hoi trac nghiem thu vi va chinh xac.
        </p>
      </div>

      <div className="relative z-10 my-2 w-full">
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col items-center rounded-3xl border border-white/20 bg-white/10 px-2 py-5 text-center shadow-[0_8px_32px_rgba(0,0,0,0.15)] backdrop-blur-lg">
            <div className="mb-2 flex h-16 w-16 items-center justify-center overflow-hidden rounded-xl bg-white/10 shadow-lg shadow-cyan-500/30">
              <img src="https://i.ibb.co/C3THq22r/image-removebg-preview-2.png" alt="Nhanh chong" className="h-full w-full object-contain" />
            </div>
            <div className="mb-1 text-base font-black uppercase tracking-wider text-cyan-300">Nhanh chong</div>
            <div className="text-sm text-blue-100">5-15 phut lam bai</div>
          </div>

          <div className="flex flex-col items-center rounded-3xl border border-white/20 bg-white/10 px-2 py-5 text-center shadow-[0_8px_32px_rgba(0,0,0,0.15)] backdrop-blur-lg">
            <div className="mb-2 flex h-16 w-16 items-center justify-center overflow-hidden rounded-xl bg-white/10 shadow-lg shadow-pink-500/30">
              <img src="https://i.ibb.co/jPHTMWbj/sticker-hito-04-removebg-preview.png" alt="Chinh xac" className="h-full w-full object-cover" />
            </div>
            <div className="mb-1 text-base font-black uppercase tracking-wider text-pink-300">Chinh xac</div>
            <div className="text-sm text-blue-100">Thuat toan toi uu</div>
          </div>

          <div className="flex flex-col items-center rounded-3xl border border-white/20 bg-white/10 px-2 py-5 text-center shadow-[0_8px_32px_rgba(0,0,0,0.15)] backdrop-blur-lg">
            <div className="mb-2 flex h-16 w-16 items-center justify-center overflow-hidden rounded-xl bg-white/10 shadow-lg shadow-green-500/30">
              <img src="https://i.ibb.co/WpDbW2Lk/image-removebg-preview-1.png" alt="Lo trinh" className="h-full w-full object-contain" />
            </div>
            <div className="mb-1 text-base font-black uppercase tracking-wider text-green-300">Lo trinh</div>
            <div className="text-sm text-blue-100">Dinh huong cu the</div>
          </div>

          <div className="flex flex-col items-center rounded-3xl border border-white/20 bg-white/10 px-2 py-5 text-center shadow-[0_8px_32px_rgba(0,0,0,0.15)] backdrop-blur-lg">
            <div className="mb-2 flex h-16 w-16 items-center justify-center overflow-hidden rounded-xl bg-white/10 shadow-lg shadow-yellow-500/30">
              <img src="https://i.ibb.co/CKqPDCGJ/unnamed-2-removebg-preview.png" alt="Chuan Holland" className="h-full w-full object-contain" />
            </div>
            <div className="mb-1 text-sm font-black uppercase tracking-wider text-yellow-300">Chuan Holland</div>
            <div className="text-sm text-blue-100">6 nhom tinh cach</div>
          </div>
        </div>
      </div>

      <div className="relative z-10 mt-4 w-full pb-6">
        <div className="mb-4 flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 px-3 py-3 shadow-inner">
          <input
            type="checkbox"
            id="terms"
            checked={isAgreed}
            onChange={(event) => setIsAgreed(event.target.checked)}
            className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer rounded border-white/30 bg-white/10 text-cyan-500 accent-cyan-400 focus:ring-cyan-500"
          />
          <label htmlFor="terms" className="cursor-pointer text-sm font-medium leading-relaxed text-blue-100">
            Toi dong y cho phep HTO Group su dung thong tin de tu van lo trinh du hoc theo{" "}
            <span
              onClick={(event) => {
                event.preventDefault();
                setIsTermsOpen(true);
              }}
              className="pointer-events-auto font-bold text-cyan-300 underline transition-colors hover:text-cyan-200"
            >
              Dieu khoan su dung
            </span>{" "}
            va{" "}
            <span
              onClick={(event) => {
                event.preventDefault();
                setIsTermsOpen(true);
              }}
              className="pointer-events-auto font-bold text-cyan-300 underline transition-colors hover:text-cyan-200"
            >
              Chinh sach bao mat
            </span>
            .
          </label>
        </div>

        <button
          onClick={handleStart}
          disabled={isStarting || !isAgreed}
          className={`flex w-full items-center justify-center gap-2 rounded-full border border-cyan-300/50 bg-gradient-to-r from-cyan-400 to-blue-600 py-4 text-lg font-black uppercase tracking-wider text-white shadow-[0_0_20px_rgba(14,165,233,0.5)] transition-transform ${
            isStarting || !isAgreed ? "cursor-not-allowed opacity-50 grayscale-[30%]" : "active:scale-95"
          }`}
        >
          {isStarting ? (
            <>
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
              <span>Dang xu ly...</span>
            </>
          ) : (
            <span>Bat dau test ngay</span>
          )}
        </button>

        <div className="mx-auto mt-4 flex w-max items-center justify-center gap-2 rounded-full border border-white/10 bg-black/20 px-5 py-2 backdrop-blur-md">
          <span className="text-xl">📞</span>
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-200">Tong dai ho tro:</span>
          <span className="text-lg font-black tracking-wider text-cyan-400">1800 9078</span>
        </div>
      </div>

      {isTermsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a1930]/90 p-4 backdrop-blur-sm fade-in">
          <div className="relative flex max-h-[80vh] w-full max-w-sm flex-col overflow-hidden rounded-3xl border border-cyan-400/30 bg-gradient-to-b from-[#0f172a] to-[#1e3a8a] shadow-[0_15px_50px_rgba(0,0,0,0.6)]">
            <button
              onClick={() => setIsTermsOpen(false)}
              className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-black/30 text-lg font-bold text-white/60 hover:text-white"
            >
              ×
            </button>

            <div className="border-b border-white/10 p-6 pb-2">
              <h3 className="font-['Montserrat'] text-xl font-black uppercase tracking-widest text-cyan-300 drop-shadow-sm">
                Chinh Sach Bao Mat
              </h3>
            </div>

            <div className="custom-scrollbar space-y-4 overflow-y-auto p-6 text-base text-white/80">
              <p>
                Cam on ban da tham gia chuong trinh dinh huong nghe nghiep <strong>HTO FUTURE MAP</strong>. Viec bao mat thong tin ca nhan cua ban la uu tien hang dau cua chung toi.
              </p>

              <div>
                <h4 className="mb-1 text-lg font-bold text-yellow-400">1. Muc dich thu thap du lieu</h4>
                <ul className="list-disc space-y-1 pl-4 text-sm">
                  <li>Phan tich tu dong de tra ket qua trac nghiem tinh cach.</li>
                  <li>Tu dong gui file bao cao PDF ve Email cua ban.</li>
                  <li>Ho tro chuyen gia HTO lien he de tu van lo trinh du hoc/nghe nghiep 1-1 chuyen sau.</li>
                </ul>
              </div>

              <div>
                <h4 className="mb-1 text-lg font-bold text-yellow-400">2. Cam ket bao mat (NDPA)</h4>
                <p className="text-sm">
                  HTO Group cam ket tuan thu Nghi dinh 13/2023/ND-CP ve bao ve du lieu ca nhan. Thong tin cua ban duoc ma hoa an toan va <strong>tuyet doi khong mua ban hay trao doi</strong> voi bat ky ben thu ba nao nam ngoai he sinh thai doi tac giao duc cua HTO.
                </p>
              </div>

              <div>
                <h4 className="mb-1 text-lg font-bold text-yellow-400">3. Quyen cua nguoi dung</h4>
                <p className="text-sm">
                  Ban co quyen yeu cau trich xuat, sua doi hoac xoa bo hoan toan du lieu ca nhan cua minh khoi he thong cua HTO Group bat cu luc nao thong qua Tong dai ho tro.
                </p>
              </div>
            </div>

            <div className="border-t border-white/10 bg-black/20 p-5">
              <button
                onClick={() => {
                  setIsAgreed(true);
                  setIsTermsOpen(false);
                }}
                className="w-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 py-3.5 text-base font-bold uppercase tracking-widest text-white shadow-lg transition-transform active:scale-95"
              >
                Da hieu & Dong y
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WelcomeScreen;
