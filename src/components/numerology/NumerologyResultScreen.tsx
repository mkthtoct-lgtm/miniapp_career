import React from "react";

import NumerologyFrame from "./NumerologyFrame";
import { NumerologyRadarScores, NumerologyResultData } from "./types";

type NumerologyResultScreenProps = {
  data: NumerologyResultData;
  onDownloadPdf?: () => void;
  onConnectExpert?: () => void;
  onBack?: () => void;
};

function buildRadarPoints(scores: NumerologyRadarScores) {
  const centerX = 110;
  const centerY = 110;
  const radius = 78;
  const axes = [
    { angle: -Math.PI / 2, value: scores.leadership },
    { angle: -Math.PI / 10, value: scores.technical },
    { angle: (3 * Math.PI) / 10, value: scores.creativity },
    { angle: (7 * Math.PI) / 10, value: scores.empathy },
    { angle: (11 * Math.PI) / 10, value: scores.discipline },
  ];

  return axes
    .map(({ angle, value }) => {
      const ratio = (value || 0) / 100;
      const x = centerX + Math.cos(angle) * radius * ratio;
      const y = centerY + Math.sin(angle) * radius * ratio;
      return `${x},${y}`;
    })
    .join(" ");
}

const NumerologyResultScreen: React.FC<NumerologyResultScreenProps> = ({
  data,
  onDownloadPdf,
  onConnectExpert,
  onBack,
}) => {
  const radarPoints = buildRadarPoints(data.radarScores);

  return (
    <NumerologyFrame
      title="Báo cáo của bạn"
      onBack={onBack}
      rightAction={
        <button type="button" className="rounded-full bg-white/10 p-1.5">
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
            />
          </svg>
        </button>
      }
    >
      <div className="space-y-6">
        <div className="numerology-fade-up text-center">
          <p className="mb-1 text-sm font-medium text-purple-300">Bản đồ số học của</p>
          <h2 className="bg-gradient-to-r from-white to-slate-300 bg-clip-text text-3xl font-extrabold text-transparent">
            {data.fullName.toUpperCase()}
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="relative col-span-2 overflow-hidden rounded-3xl border border-amber-400/30 bg-gradient-to-br from-amber-500/20 to-pink-600/20 p-6 shadow-lg shadow-amber-900/20">
            <div className="pointer-events-none absolute -bottom-6 -right-4 text-[140px] font-black leading-none text-white/5">
              {data.coreNumbers.lifePath}
            </div>
            <div className="relative z-10">
              <p className="mb-1 flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-amber-300">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Đường Đời (Life Path)
              </p>
              <h3 className="text-5xl font-black text-white drop-shadow-md">{data.coreNumbers.lifePath}</h3>
              <p className="mt-2 text-sm font-medium text-slate-200">{data.lifePathDescription}</p>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center rounded-3xl border border-white/10 bg-white/5 p-5 text-center">
            <p className="mb-2 text-[11px] font-bold uppercase tracking-widest text-purple-300">Sứ Mệnh</p>
            <p className="mb-1 bg-gradient-to-b from-purple-200 to-pink-500 bg-clip-text text-4xl font-black text-transparent">
              {data.coreNumbers.destiny}
            </p>
            <p className="text-[10px] leading-tight text-slate-400">Người truyền cảm hứng có định hướng rõ ràng.</p>
          </div>

          <div className="flex flex-col items-center justify-center rounded-3xl border border-white/10 bg-white/5 p-5 text-center">
            <p className="mb-2 text-[11px] font-bold uppercase tracking-widest text-cyan-300">Linh Hồn</p>
            <p className="mb-1 bg-gradient-to-b from-cyan-200 to-blue-500 bg-clip-text text-4xl font-black text-transparent">
              {data.coreNumbers.soulUrge}
            </p>
            <p className="text-[10px] leading-tight text-slate-400">{data.soulMissionText}</p>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-black/40 p-5 shadow-inner shadow-purple-500/10 backdrop-blur-md">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-100">Biểu Đồ Năng Lực</h3>
            <span className="rounded border border-purple-500/30 bg-purple-500/20 px-2 py-0.5 text-[10px] font-bold text-purple-300">
              Chuyên sâu
            </span>
          </div>

          <div className="flex justify-center">
            <svg viewBox="0 0 220 220" className="h-64 w-64">
              <polygon points="110,20 190,78 160,172 60,172 30,78" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
              <polygon points="110,48 168,90 145,154 75,154 52,90" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
              <polygon points={radarPoints} fill="rgba(251,191,36,0.3)" stroke="#fbbf24" strokeWidth="2" />
              <text x="110" y="14" textAnchor="middle" fontSize="10" fill="#e2e8f0">Lãnh Đạo</text>
              <text x="196" y="82" textAnchor="start" fontSize="10" fill="#e2e8f0">Kỹ Thuật</text>
              <text x="160" y="188" textAnchor="middle" fontSize="10" fill="#e2e8f0">Sáng Tạo</text>
              <text x="60" y="188" textAnchor="middle" fontSize="10" fill="#e2e8f0">Thấu Cảm</text>
              <text x="22" y="82" textAnchor="end" fontSize="10" fill="#e2e8f0">Kỷ Luật</text>
            </svg>
          </div>
          <p className="mt-2 text-center text-[11px] font-medium italic text-slate-400">{data.subtitle}</p>
        </div>

        <div className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-5">
          <h3 className="text-lg font-bold uppercase tracking-wider text-blue-100">Phân tích sâu</h3>
          <div className="space-y-3">
            {data.strengths.map((strength) => (
              <div key={strength} className="flex gap-3">
                <span className="font-bold text-green-400">✓</span>
                <p className="text-sm text-slate-200">
                  <span className="font-bold text-white">Ưu điểm:</span> {strength}
                </p>
              </div>
            ))}
            <div className="flex gap-3">
              <span className="font-bold text-red-400">!</span>
              <p className="text-sm text-slate-200">
                <span className="font-bold text-white">Lưu ý:</span> {data.caution}
              </p>
            </div>
          </div>
        </div>

        <div className="border-r-8 border-blue-900 bg-blue-50 p-6 text-slate-800">
          <h3 className="mb-3 text-xl font-bold text-blue-900">CẢNH BÁO THỜI ĐẠI AI</h3>
          <p className="text-sm italic leading-relaxed">{data.aiWarning}</p>
        </div>

        <div className="space-y-4 rounded-3xl bg-blue-900 p-5 text-white">
          <h3 className="text-center text-xl font-bold uppercase tracking-widest text-yellow-400">
            Lộ trình sự nghiệp đề xuất
          </h3>

          <div className="border border-white/20 bg-white/10 p-5">
            <div className="mb-3 flex items-center justify-between gap-3">
              <h4 className="text-lg font-bold text-yellow-400">{data.primaryProgram.title}</h4>
              <span className="bg-yellow-400 px-2 py-1 text-xs font-bold text-blue-900">{data.primaryProgram.highlight}</span>
            </div>
            <p className="mb-3 text-sm text-white/80">{data.primaryProgram.detail}</p>
            <div className="grid grid-cols-2 gap-3 text-sm font-semibold">
              <div className="bg-blue-800 p-3">THỊ TRƯỜNG: {data.primaryProgram.market}</div>
              <div className="bg-blue-800 p-3">ĐỊNH HƯỚNG: Ưu tiên cao</div>
            </div>
          </div>

          <div className="border border-white/10 bg-white/5 p-5">
            <h4 className="mb-2 text-lg font-bold">{data.secondaryProgram.title}</h4>
            <p className="text-sm italic text-yellow-200">{data.secondaryProgram.detail}</p>
          </div>

          <div className="border border-white/10 bg-white/5 p-5">
            <h4 className="mb-2 text-lg font-bold text-slate-300">{data.tertiaryProgram.title}</h4>
            <p className="text-sm italic text-white/60">{data.tertiaryProgram.detail}</p>
          </div>
        </div>

        <div className="space-y-6 rounded-3xl border border-white/10 bg-white/5 p-5">
          <h3 className="text-center text-xl font-bold uppercase tracking-wider text-blue-100">Hệ sinh thái hỗ trợ HTO Group</h3>
          {data.ecosystem.map((item, index) => (
            <div key={item.title} className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-blue-900 font-bold text-white">
                {String(index + 1).padStart(2, "0")}
              </div>
              <div>
                <h4 className="mb-1 text-base font-bold text-white">{item.title}</h4>
                <p className="text-sm text-slate-300">{item.detail}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-5 rounded-3xl bg-slate-50 p-6 text-slate-800">
          <div className="text-center">
            <h3 className="mb-4 text-3xl font-bold italic text-blue-900">
              "Học tinh hoa thế giới -
              <br />
              Trở về xây dựng quê hương"
            </h3>
            <div className="mx-auto h-1 w-20 bg-yellow-500" />
          </div>

          <div className="relative border-2 border-dashed border-yellow-500 bg-white p-6 text-center">
            <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 bg-yellow-500 px-4 py-1 text-xs font-bold uppercase text-blue-900">
              Quà tặng đặc biệt
            </div>
            <h4 className="mb-2 text-lg font-bold italic text-blue-900">VOUCHER TƯ VẤN CHUYÊN SÂU 1:1</h4>
            <p className="mb-3 text-sm italic text-slate-500">Dành riêng cho {data.fullName} sau khi hoàn thành trắc nghiệm</p>
            <div className="font-mono text-lg font-bold tracking-tight text-blue-900">MÃ: HTO-SPECIAL-2026</div>
          </div>

          <div className="grid grid-cols-2 items-end gap-6">
            <div className="space-y-2 text-sm text-slate-700">
              <p className="mb-2 text-xs uppercase tracking-widest text-slate-400">Liên hệ chuyên viên</p>
              <p>
                <strong>Hotline:</strong> 1800 9078
              </p>
              <p>
                <strong>Địa chỉ:</strong> Văn phòng HTO gần bạn nhất
              </p>
              <p className="text-blue-600 underline">www.htogroup.vn</p>
            </div>

            <div className="text-right">
              <div className="inline-flex border border-slate-200 bg-white p-2">
                <div className="flex h-24 w-24 items-center justify-center bg-slate-100 p-2 text-center text-[8px] uppercase">
                  Quét Zalo
                  <br />
                  Nhận tư vấn
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-3 pb-8">
          <button
            type="button"
            onClick={onDownloadPdf}
            className="numerology-glow-pink flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-amber-400/70 bg-gradient-to-r from-purple-700 to-pink-600 py-4 text-base font-bold text-white transition-transform active:scale-[0.98]"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Tải báo cáo chi tiết qua Email
          </button>

          <button
            type="button"
            onClick={onConnectExpert}
            className="flex w-full items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/5 py-4 text-base font-bold text-slate-200 transition-all active:scale-[0.98]"
          >
            <svg className="h-5 w-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
              />
            </svg>
            KẾT NỐI VỚI CHUYÊN GIA HTO
          </button>
        </div>
      </div>
    </NumerologyFrame>
  );
};

export default NumerologyResultScreen;
