import React, { useState, useEffect } from 'react';

const GameScreen = ({ character, currentQIndex, questions, exp, stats, maxStat, onAnswer, onNext }) => {
  const [selectedAns, setSelectedAns] = useState<number | null>(null);
  const q = questions[currentQIndex];
  const totalQ = questions.length;
  const progress = ((currentQIndex) / totalQ) * 100;

  useEffect(() => {
    setSelectedAns(null); // Tự động Reset đáp án khi qua câu mới
  }, [currentQIndex]);

  const handleSelect = (idx: number) => {
    if (selectedAns !== null) return;
    setSelectedAns(idx);
    onAnswer(idx);
  };

  const getStatPercent = (val: number) => `${Math.min((val / maxStat) * 100, 100)}%`;

  return (
    // Khóa cuộn thẻ ngoài cùng, dùng nền Deep Ocean Blue chuẩn
    <div className="w-full min-h-screen relative flex flex-col bg-gradient-to-b from-[#0a1930] via-[#164fa0] to-[#1e3a8a] overflow-hidden fade-in pb-[env(safe-area-inset-bottom)] pt-[env(safe-area-inset-top)]">
      
      {/* Texture lưới mờ */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 pointer-events-none"></div>

      {/* Đưa thanh cuộn vào container bên trong */}
      <div className="relative z-10 flex flex-col flex-grow w-full h-full px-4 pt-4 pb-6 overflow-y-auto game-scroll">
        
        {/* === TOP BAR (Thông tin nhân vật & Tiến trình) === */}
        <div className="w-full mb-4">
          <div className="flex items-center w-full gap-3 p-3 border shadow-lg bg-white/10 backdrop-blur-md border-white/10 rounded-2xl">
            {/* Avatar */}
            <div className="flex items-center justify-center flex-shrink-0 w-16 h-16 text-4xl border rounded-full shadow-inner bg-gradient-to-b from-white/20 to-transparent border-white/20">
              {character?.icon || '🐉'}
            </div>
            
            {/* Thanh Progress */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-yellow-400 text-sm font-black font-['MuseoModerno']">LEVEL {Math.floor(exp / 30) + 1}</span>
                <span className="text-cyan-200 text-xs font-bold font-['Montserrat'] uppercase tracking-widest">{character?.name || 'EXPLORER'}</span>
              </div>
              <div className="w-full h-2 mt-1.5 overflow-hidden rounded-full bg-black/40 inset-shadow">
                <div className="h-full transition-all duration-1000 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 shadow-[0_0_8px_rgba(56,189,248,0.5)]" style={{width: `${progress}%`}}></div>
              </div>
              <span className="text-white/60 text-xs font-semibold mt-1.5 block tracking-widest uppercase">Câu {currentQIndex + 1} / {totalQ}</span>
            </div>

            {/* EXP */}
            <div className="relative flex-shrink-0 pl-3 pr-1 text-center border-l border-white/10">
              <div className="text-xs font-bold tracking-widest uppercase text-white/70">EXP</div>
              <div className="text-yellow-400 text-2xl font-black font-['MuseoModerno'] drop-shadow-md">{exp}</div>
            </div>
          </div>
        </div>
        
        {/* === KHỐI CÂU HỎI & ĐÁP ÁN === */}
        <div className="w-full mb-5">
          <div className="w-full p-5 bg-[#0f172a]/40 backdrop-blur-xl border border-white/10 rounded-[28px] shadow-lg">
            <div className="flex justify-end mb-1">
              <span className="text-cyan-300 text-xl font-black font-['Montserrat'] drop-shadow-sm">Q{currentQIndex + 1}</span>
            </div>
            
            <div className="question-slide" key={currentQIndex}>
              {/* Câu hỏi */}
              <h2 className="text-white/95 text-xl font-black font-['Montserrat'] leading-relaxed mb-1">{q.q}</h2>
              <p className="text-cyan-200/80 text-xs font-semibold font-['Montserrat'] mb-5 tracking-wide uppercase">Chọn phương án phù hợp nhất</p>
              
              {/* Danh sách đáp án */}
              <div className="flex flex-col gap-3">
                {q.answers.map((ans: string, idx: number) => {
                   let ansClass = "relative overflow-hidden cursor-pointer rounded-2xl px-4 py-4 flex items-center gap-3 transition-all duration-300 border ";
                   let letterClass = "flex items-center justify-center flex-shrink-0 text-base font-black rounded-full w-10 h-10 transition-colors border ";
                   let textClass = "text-base font-bold font-['Montserrat'] leading-snug transition-colors ";

                   if (selectedAns === null) {
                      // Trạng thái bình thường
                      ansClass += "bg-white/5 border-white/10 hover:bg-white/10 hover:border-cyan-300/40 hover:shadow-md active:scale-[0.98]";
                      letterClass += "bg-white/10 text-white/80 border-white/20";
                      textClass += "text-white/85";
                   } else if (selectedAns === idx) {
                      // Trạng thái ĐƯỢC CHỌN (Màu xanh đại dương)
                      ansClass += "bg-gradient-to-r from-[#1e40af] to-[#0284c7] border-cyan-300 scale-[1.02] shadow-[0_5px_15px_rgba(56,189,248,0.3)] z-10 answer-correct";
                      letterClass += "bg-white text-blue-700 border-transparent shadow-[0_0_10px_rgba(255,255,255,0.5)]";
                      textClass += "text-white drop-shadow-sm";
                   } else {
                      // Trạng thái BỊ BỎ QUA
                      ansClass += "bg-black/20 border-transparent opacity-50 grayscale-[30%] scale-[0.98]";
                      letterClass += "bg-white/5 text-white/40 border-transparent";
                      textClass += "text-white/40";
                   }

                   return (
                     <div key={idx} onClick={() => handleSelect(idx)} className={ansClass}>
                       <span className={letterClass}>
                         {['A', 'B', 'C', 'D'][idx]}
                       </span>
                       <span className={textClass}>{ans}</span>
                     </div>
                   )
                })}
              </div>
            </div>

            {/* Nút Câu Tiếp Theo */}
            <button 
              onClick={onNext} 
              disabled={selectedAns === null} 
              className={`w-full rounded-full py-4 mt-6 text-center font-black font-['Montserrat'] text-base tracking-widest uppercase transition-all duration-300 border-2 ${selectedAns === null ? 'bg-white/5 text-white/30 border-white/5 cursor-not-allowed' : 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-blue-900 border-yellow-300 shadow-[0_5px_15px_rgba(250,204,21,0.3)] hover:scale-105 active:scale-95 cursor-pointer btn-next'}`}
            >
              {selectedAns === null ? 'Đang phân tích...' : 'CÂU TIẾP THEO ➡️'}
            </button>
          </div>
        </div>
        
        {/* === CHỈ SỐ NĂNG LỰC MINIVIEW === */}
        <div className="w-full mb-6">
          <div className="w-full p-5 bg-white/5 backdrop-blur-md border border-white/10 rounded-[28px] shadow-lg">
            <h3 className="text-cyan-300 text-sm font-black font-['MuseoModerno'] mb-4 uppercase tracking-widest text-center border-b border-white/10 pb-3">
              ✨ Trạng thái năng lực
            </h3>
            <div className="grid grid-cols-2 gap-x-6 gap-y-4">
              {[
                {key: 'logic', icon: '🧠', label: 'Logic'}, {key: 'creative', icon: '🎨', label: 'Sáng tạo'},
                {key: 'comm', icon: '💬', label: 'Giao tiếp'}, {key: 'lead', icon: '👑', label: 'Lãnh đạo'},
                {key: 'tech', icon: '💻', label: 'Công nghệ'}, {key: 'sci', icon: '🔬', label: 'Khoa học'}
              ].map(s => (
                <div key={s.key} className="flex flex-col gap-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xl icon-hover">{s.icon}</span>
                    <span className="text-white/80 text-sm font-bold font-['MuseoModerno'] tracking-wide">{s.label}</span>
                    <span className="ml-auto text-sm font-black text-yellow-300 stat-value">{stats[s.key as keyof typeof stats]}</span>
                  </div>
                  <div className="w-full bg-black/40 rounded-full h-[6px] overflow-hidden inset-shadow">
                    <div className="h-full rounded-full stat-bar-fill bg-gradient-to-r from-cyan-400 to-blue-500 shadow-[0_0_8px_rgba(56,189,248,0.5)] transition-all duration-500 ease-out" style={{width: getStatPercent(stats[s.key as keyof typeof stats])}}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* === KHỐI HOTLINE === */}
        <div className="w-full pt-2 mt-auto">
          <div className="flex items-center justify-center gap-2 px-5 py-2 mx-auto border rounded-full w-max bg-black/30 border-white/10 backdrop-blur-md">
            <span className="text-xl">📞</span>
            <span className="text-xs font-medium tracking-wider text-blue-200 uppercase">Tổng đài:</span>
            <span className="text-lg font-bold tracking-wider text-yellow-400">1800 9078</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default GameScreen;