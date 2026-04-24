import React from "react";

type NumerologyWelcomeScreenProps = {
  onStart?: () => void;
  onBack?: () => void;
};

const NumerologyWelcomeScreen: React.FC<NumerologyWelcomeScreenProps> = ({ onStart, onBack }) => {
  return (
    <div className="font-quicksand w-full min-h-screen bg-gray-950 text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-md flex-col overflow-hidden bg-gradient-to-b from-purple-950 via-slate-900 to-black shadow-2xl sm:border-x sm:border-white/10">
        <header
          className="sticky top-0 z-20 border-b border-white/5 bg-black/20 px-6 pb-4 backdrop-blur-xl"
          style={{ paddingTop: "calc(env(safe-area-inset-top, 0px) + 16px)" }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button type="button" onClick={onBack} className="rounded-full bg-white/10 p-1.5">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </button>
              <h1 className="text-sm font-semibold text-slate-100">Thần số học HTO</h1>
            </div>
            <div className="flex items-center gap-2">
              <button type="button" className="rounded-full bg-white/10 p-1.5">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01" />
                </svg>
              </button>
              <button type="button" className="rounded-full bg-white/10 p-1.5">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </header>

        <main className="relative flex flex-1 flex-col px-6 py-6 pb-24">
          <div className="flex flex-1 flex-col items-center justify-center">
            <div className="w-full text-center">
              <p className="text-sm font-medium text-slate-400">Khám phá bản thân cùng</p>
              <h2 className="mt-1 bg-gradient-to-r from-yellow-200 to-amber-500 bg-clip-text text-3xl font-extrabold text-transparent">
                Thần số học HTO
              </h2>
            </div>

            <div className="relative mt-4 flex w-full justify-center py-3">
              <svg className="numerology-spin-slow absolute h-72 w-72 text-white/10" viewBox="0 0 200 200">
                <circle cx="100" cy="100" r="95" stroke="currentColor" strokeWidth="0.5" fill="none" />
                <circle cx="100" cy="100" r="75" stroke="currentColor" strokeWidth="0.5" fill="none" strokeDasharray="2 4" />
                <line x1="100" y1="0" x2="100" y2="200" stroke="currentColor" strokeWidth="0.2" />
                <line x1="0" y1="100" x2="200" y2="100" stroke="currentColor" strokeWidth="0.2" />
                <circle cx="100" cy="5" r="2.5" fill="currentColor" />
                <circle cx="100" cy="195" r="2.5" fill="currentColor" />
                <circle cx="5" cy="100" r="2.5" fill="currentColor" />
                <circle cx="195" cy="100" r="2.5" fill="currentColor" />
              </svg>

              <div className="relative h-72 w-72">
                <img
                  src="https://i.ibb.co/G468t0T3/Gemini-Generated-Image-ah428uah428uah42-removebg-preview.png"
                  alt="Numerology hero"
                  className="absolute left-1/2 top-1/2 z-10 h-52 w-52 -translate-x-1/2 -translate-y-1/2 object-contain"
                />
              </div>
            </div>

            <p className="mt-2 max-w-[320px] px-2 text-center text-sm font-medium leading-relaxed text-slate-300">
              Thần số học là một lĩnh vực nghiên cứu và giải mã con người trong phạm trù huyền học. Bộ môn này đi sâu
              nghiên cứu về ý nghĩa và mối liên hệ giữa các con số với con người.
            </p>
          </div>

          <div className="absolute bottom-6 left-0 w-full px-6">
            <button
              type="button"
              onClick={onStart}
              className="numerology-glow-gold w-full rounded-full border-2 border-amber-400/70 bg-gradient-to-r from-purple-700 to-pink-600 px-10 py-4 text-lg font-bold text-white transition-transform active:scale-[0.98]"
            >
              TRA CỨU CHỈ SỐ CỦA BẠN
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default NumerologyWelcomeScreen;
