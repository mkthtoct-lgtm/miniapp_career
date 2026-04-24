import React from "react";

type ProductSelectionScreenProps = {
  onOpenFutureMap?: () => void;
  onOpenNumerology?: () => void;
};

const ProductSelectionScreen: React.FC<ProductSelectionScreenProps> = ({
  onOpenFutureMap,
  onOpenNumerology,
}) => {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-y-auto bg-gradient-to-b from-[#061120] via-[#102a56] to-[#0f7db7] px-5 pb-[env(safe-area-inset-bottom)] pt-[env(safe-area-inset-top)]">
      <div className="pointer-events-none absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20" />
      <div className="pointer-events-none absolute left-1/2 top-16 h-56 w-56 -translate-x-1/2 rounded-full bg-cyan-400/20 blur-[90px]" />

      <div className="relative z-10 mx-auto flex w-full max-w-md flex-1 flex-col justify-center py-8">
        <div className="mb-8 text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-[28px] border border-white/20 bg-white/10 shadow-[0_0_30px_rgba(14,165,233,0.25)] backdrop-blur-xl">
            <img
              src="https://res.cloudinary.com/djyq3kmgb/image/upload/v1771898961/Logo_HTO_GROUPpng-02_2_fpe7wl.png"
              alt="HTO Logo"
              className="h-12 w-12 object-contain"
            />
          </div>

          <h1 className="mt-5 bg-gradient-to-r from-cyan-200 via-white to-blue-100 bg-clip-text text-3xl font-black uppercase tracking-[0.24em] text-transparent">
            HTO Hub
          </h1>
          <p className="mt-3 text-sm font-medium leading-relaxed text-blue-100/90">
            Chọn hành trình phù hợp để bắt đầu khám phá năng lực và lộ trình tương lai.
          </p>
        </div>

        <div className="space-y-4">
          <button
            type="button"
            onClick={onOpenFutureMap}
            className="w-full rounded-[32px] border border-cyan-300/30 bg-white/10 p-5 text-left shadow-[0_18px_40px_rgba(2,12,27,0.28)] backdrop-blur-xl transition-transform active:scale-[0.99]"
          >
            <div className="mb-4 flex items-start justify-between gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-400/10 text-3xl shadow-lg shadow-cyan-500/20">
                <span>🌍</span>
              </div>
              <span className="rounded-full border border-cyan-300/30 bg-cyan-400/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.22em] text-cyan-200">
                HTO Future Map
              </span>
            </div>

            <h2 className="text-2xl font-black uppercase tracking-[0.12em] text-white">Bản đồ tương lai 2030</h2>
            <p className="mt-2 text-sm leading-relaxed text-blue-100/85">
              Trải nghiệm trắc nghiệm hướng nghiệp, phân tích Holland và nhận gợi ý lộ trình học tập.
            </p>
          </button>

          <button
            type="button"
            onClick={onOpenNumerology}
            className="numerology-soft-shadow w-full rounded-[32px] border border-fuchsia-400/30 bg-gradient-to-r from-fuchsia-500/15 via-purple-500/15 to-amber-400/10 p-5 text-left backdrop-blur-xl transition-transform active:scale-[0.99]"
          >
            <div className="mb-4 flex items-start justify-between gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-3xl shadow-lg shadow-fuchsia-500/20">
                <span>🔮</span>
              </div>
              <span className="rounded-full border border-amber-400/40 bg-amber-400/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.22em] text-amber-200">
                HTO Mystic Map
              </span>
            </div>

            <h2 className="text-2xl font-black uppercase tracking-[0.12em] text-white">Thần số học</h2>
            <p className="mt-2 text-sm leading-relaxed text-blue-100/85">
              Giải mã chỉ số cốt lõi, biểu đồ năng lực và nhận báo cáo thần số học chuyên sâu.
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductSelectionScreen;