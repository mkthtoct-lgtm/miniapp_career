import React, { useEffect, useState } from "react";

type NumerologyLoadingScreenProps = {
  title?: string;
  subtitle?: string;
};

const NumerologyLoadingScreen: React.FC<NumerologyLoadingScreenProps> = ({
  title = "Đang thiết lập kết nối...",
  subtitle = "Hito đang phân tích tần số rung động của bạn...",
}) => {
  const [progress, setProgress] = useState(0);
  const [number, setNumber] = useState(1);

  useEffect(() => {
    const numberTimer = window.setInterval(() => {
      setNumber(Math.floor(Math.random() * 9) + 1);
    }, 80);

    const progressTimer = window.setInterval(() => {
      setProgress((current) => {
        if (current >= 100) {
          window.clearInterval(progressTimer);
          return 100;
        }

        return Math.min(100, current + Math.random() * 1.5 + 0.5);
      });
    }, 50);

    return () => {
      window.clearInterval(numberTimer);
      window.clearInterval(progressTimer);
    };
  }, []);

  return (
    <div className="font-quicksand w-full min-h-screen bg-gray-950 text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-md flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-purple-950 via-slate-900 to-black px-8 shadow-2xl sm:border-x sm:border-white/10">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute left-1/4 top-1/4 h-32 w-32 rounded-full bg-purple-600/20 blur-3xl" />
          <div className="absolute bottom-1/3 right-1/4 h-40 w-40 rounded-full bg-pink-600/20 blur-3xl" />
          <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-500/10 blur-3xl" />
        </div>

        <div className="relative z-10 flex w-full flex-col items-center">
          <div className="relative mb-10 flex h-48 w-48 items-center justify-center">
            <svg className="numerology-spin-medium absolute h-full w-full text-white/10" viewBox="0 0 200 200">
              <circle cx="100" cy="100" r="98" stroke="currentColor" strokeWidth="1" fill="none" strokeDasharray="4 8" />
              <circle cx="100" cy="2" r="3" fill="#fbbf24" />
              <circle cx="100" cy="198" r="3" fill="#ec4899" />
            </svg>

            <svg
              className="numerology-spin-reverse absolute h-40 w-40 text-purple-400/30"
              viewBox="0 0 200 200"
            >
              <circle cx="100" cy="100" r="90" stroke="currentColor" strokeWidth="2" fill="none" strokeDasharray="20 10 5 10" />
              <polygon points="100,5 105,15 95,15" fill="currentColor" />
              <polygon points="100,195 105,185 95,185" fill="currentColor" />
            </svg>

            <div className="numerology-orb-glow z-10 flex h-28 w-28 items-center justify-center rounded-full border border-white/20 bg-black/40 backdrop-blur-md">
              <span className="bg-gradient-to-b from-amber-200 to-yellow-500 bg-clip-text text-6xl font-black tracking-tighter text-transparent">
                {progress >= 100 ? 9 : number}
              </span>
            </div>
          </div>

          <div className="space-y-3 text-center">
            <h3 className="animate-pulse text-lg font-bold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
              {title}
            </h3>
            <p className="text-sm font-medium leading-relaxed text-slate-300">{subtitle}</p>
          </div>

          <div className="relative mt-10 w-full">
            <div className="mb-2 flex justify-between px-1 text-xs font-semibold text-slate-400">
              <span>Đang giải mã</span>
              <span className="text-amber-400">{Math.floor(progress)}%</span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
              <div
                className="relative h-full rounded-full bg-gradient-to-r from-purple-600 via-pink-500 to-amber-400 transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute inset-y-0 right-0 w-4 bg-white/50 blur-sm" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NumerologyLoadingScreen;
