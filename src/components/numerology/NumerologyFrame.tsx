import React from "react";

type NumerologyFrameProps = {
  title: string;
  children: React.ReactNode;
  rightAction?: React.ReactNode;
  onBack?: () => void;
};

const NumerologyFrame: React.FC<NumerologyFrameProps> = ({ title, children, rightAction, onBack }) => {
  return (
    <div className="font-quicksand w-full min-h-screen bg-gray-950 text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-md flex-col overflow-hidden bg-gradient-to-b from-purple-950 via-slate-900 to-black shadow-2xl sm:border-x sm:border-white/10">
        <header
          className="sticky top-0 z-20 border-b border-white/5 bg-black/20 px-6 pb-4 backdrop-blur-xl"
          style={{ paddingTop: "calc(env(safe-area-inset-top, 0px) + 16px)" }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onBack}
                className="rounded-full bg-white/10 p-1.5"
                aria-label="Back"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <h1 className="text-sm font-semibold uppercase tracking-wider text-slate-100">{title}</h1>
            </div>
            {rightAction || <div className="h-8 w-8 rounded-full bg-white/10" />}
          </div>
        </header>

        <main className="flex-1 overflow-y-auto px-6 py-6">{children}</main>
      </div>
    </div>
  );
};

export default NumerologyFrame;
