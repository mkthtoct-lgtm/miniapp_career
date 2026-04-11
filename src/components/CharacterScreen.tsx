// src/components/CharacterScreen.tsx
import React from 'react';

type Character = {
  id: string;
  name: string;
  icon: string;
  desc1: string;
  desc2: string;
  border: string;
  text: string;
  badge?: string;
};

const CHARACTERS: Character[] = [
  { id: 'kiemsi', name: 'Kiếm Sư', icon: '⚔️', desc1: 'Chiến thuật & Càn quét', desc2: '"Tiên phong đột phá, bẻ gãy mọi rào cản"', border: 'border-red-500', text: 'text-red-400' },
  { id: 'cungthu', name: 'Xạ Thủ', icon: '🏹', desc1: 'Tầm nhìn & Bắn tỉa', desc2: '"Bách phát bách trúng, thao túng chiến trường"', border: 'border-teal-400', text: 'text-teal-300' },
  { id: 'phapsu', name: 'Đại Pháp Sư', icon: '🧙‍♂️', desc1: 'Tri thức & Quyền năng', desc2: '"Khống chế nguyên tố, thay đổi cục diện"', border: 'border-sky-400', text: 'text-sky-300' },
  { id: 'rong', name: 'Chân Long', icon: '🐉', desc1: 'Thống lĩnh & Bá vương', desc2: '"Thống trị bầu trời, áp đảo quần hùng"', border: 'border-yellow-500', text: 'text-yellow-400' },
  { id: 'hiepsi', name: 'Thánh Kỵ Sĩ', icon: '🛡️', desc1: 'Bảo hộ & Bất khuất', desc2: '"Tường đồng vách sắt, khiên chắn tuyệt đối"', border: 'border-fuchsia-500', text: 'text-fuchsia-300' },
  { id: 'thoren', name: 'Thần Rèn', icon: '⚒️', desc1: 'Cơ khí & Giả kim', desc2: '"Độc quyền giao dịch, tạo dựng vạn vật"', border: 'border-amber-500', text: 'text-amber-400'},
];

type CharacterScreenProps = {
  selectedChar: { name: string } | null;
  onSelect: (id: string, name: string, icon: string) => void;
  onStart: () => void;
};

const CharacterScreen: React.FC<CharacterScreenProps> = ({ selectedChar, onSelect, onStart }) => {
  const hasSelection = !!selectedChar?.name;

  return (
    <div className="w-full min-h-screen relative flex flex-col items-center bg-gradient-to-b from-[#0a1930] via-[#164fa0] to-[#1e3a8a] overflow-hidden fade-in pb-[env(safe-area-bottom)] pt-[env(safe-area-top)]">
      
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 pointer-events-none"></div>

      <div className="relative z-10 flex flex-col items-center flex-grow w-full h-full px-4 pt-6 pb-6 overflow-y-auto game-scroll">
        
        <h1 className="text-center text-yellow-400 text-4xl font-black font-['Montserrat'] drop-shadow-md mb-2 uppercase tracking-wide">
          ⚔️ CHỌN NHÂN VẬT
        </h1>
        <p className="text-center text-cyan-100/90 text-base font-medium font-['Montserrat'] mb-6 tracking-wide">
          Mỗi nhân vật đại diện cho một thế mạnh
        </p>

        <div className="grid grid-cols-2 gap-4 w-full max-w-[380px] mb-8">
          {CHARACTERS.map((char) => {
            const isSelected = selectedChar?.name === char.name;
            
            let wrapperClass = "card-wrapper relative transition-all duration-300 ease-out cursor-pointer ";
            let innerClass = "relative z-10 flex flex-col items-center justify-center p-4 text-center rounded-2xl transition-all duration-300 min-h-[190px] ";

            if (!hasSelection) {
                wrapperClass += "hover:scale-105";
                innerClass += "bg-white/10 border border-white/20 backdrop-blur-md shadow-lg";
            } else if (isSelected) {
                wrapperClass += "scale-[1.05] z-20";
                innerClass += "bg-gradient-to-b from-[#1e40af] to-[#0284c7] border-[1.5px] border-cyan-300 shadow-[0_5px_20px_rgba(56,189,248,0.4)] backdrop-blur-xl";
            } else {
                wrapperClass += "scale-95 opacity-60 grayscale-[40%]";
                innerClass += "bg-black/30 border border-white/5 backdrop-blur-sm";
            }

            return (
              <div key={char.id} onClick={() => onSelect(char.id, char.name, char.icon)} className={wrapperClass}>
                
                {char.badge && (
                  <div className="absolute -top-3 -right-2 bg-gradient-to-r from-red-600 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full animate-bounce z-30 shadow-[0_0_10px_rgba(239,68,68,0.8)] border border-white/50 tracking-wider">
                    {char.badge}
                  </div>
                )}

                {isSelected && (
                  <div className="absolute inset-0 rounded-2xl bg-cyan-400/20 blur-xl animate-pulse"></div>
                )}

                <div className={innerClass}>
                  <div className={`icon-circle w-16 h-16 bg-gradient-to-b from-white/10 to-transparent rounded-full border border-white/30 flex items-center justify-center text-4xl mb-3 transition-all duration-300 ${isSelected ? 'bg-white/20 border-cyan-200 scale-110 shadow-inner' : ''}`}>
                    {char.icon}
                  </div>
                  
                  <div className={`char-name ${isSelected ? 'text-white' : char.text} text-xl font-black font-['MuseoModerno'] tracking-wide`}>
                    {char.name.toUpperCase()}
                  </div>
                  
                  <div className={`font-bold font-['MuseoModerno'] mt-2 transition-all ${isSelected ? 'text-cyan-200 text-base' : 'text-blue-200 text-base'}`}>
                    {char.desc1}
                  </div>
                  <div className={`font-medium font-['Montserrat'] leading-snug mt-1.5 transition-all ${isSelected ? 'text-white text-sm' : 'text-blue-100/70 text-xs'}`}>
                    {char.desc2}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-center w-full h-8 mb-6">
          {selectedChar?.name ? (
            <p className="text-yellow-400 text-2xl font-black font-['Montserrat'] uppercase drop-shadow-md">
              Đã chọn: {selectedChar.name}
            </p>
          ) : (
            <p className="px-5 py-2 text-sm font-semibold tracking-widest uppercase border rounded-full text-blue-200/70 bg-black/20 border-white/5">
              Chạm để chọn
            </p>
          )}
        </div>

        <button 
          onClick={onStart} 
          disabled={!selectedChar?.name} 
          className={`w-full max-w-[320px] h-14 rounded-full flex items-center justify-center transition-all duration-300 border-2 ${selectedChar?.name ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 border-yellow-300 shadow-[0_5px_15px_rgba(250,204,21,0.3)] hover:scale-105 active:scale-95 cursor-pointer' : 'bg-white/5 border-white/10 cursor-not-allowed'}`}
        >
          <span className={`text-lg font-black font-['Montserrat'] uppercase tracking-widest ${selectedChar?.name ? 'text-blue-900' : 'text-white/30'}`}>
            🚀 Bắt đầu hành trình
          </span>
        </button>

        <div className="w-full pt-8 mt-auto">
          <div className="flex items-center justify-center gap-2 px-5 py-2 mx-auto border rounded-full w-max bg-black/30 border-white/10 backdrop-blur-md">
            <span className="text-xl">📞</span>
            <span className="text-xs font-medium tracking-wider text-blue-200 uppercase">Tổng đài:</span>
            <span className="text-xl font-bold tracking-wider text-yellow-400">1800 9078</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CharacterScreen;