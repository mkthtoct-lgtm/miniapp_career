import React, { useState } from "react";
import { followOA, getPhoneNumber, getAccessToken } from "zmp-sdk/apis";

const OA_ID = "2112176407138597287";
const OA_STORAGE_KEY = "HTO_OA_FOLLOW_STATUS";

const WelcomeScreen = ({ onStart }) => {
  const [isStarting, setIsStarting] = useState(false);
  const [isAgreed, setIsAgreed] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);

  const handleStart = async () => {
    if (isStarting || !isAgreed) return;
    setIsStarting(true);
    
    const hasFollowed = localStorage.getItem(OA_STORAGE_KEY);
    if (hasFollowed !== 'true') {
      try {
        await followOA({ id: OA_ID });
        localStorage.setItem(OA_STORAGE_KEY, 'true');
      } catch (e) {
        console.log("[ZaloSDK] Popup bị đóng hoặc người dùng từ chối quan tâm.");
      }
    }

    let fetchedPhone = "";

    try {
      const accessToken = await getAccessToken({});
      const { token } = await getPhoneNumber({});

      const response = await fetch('https://api.hto.edu.vn/get-phone-new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          accessToken: accessToken,
          code: token
        })
      });
      
      const data = await response.json();
      
      if (data.success && data.phoneNumber) {
        fetchedPhone = data.phoneNumber;
      }
    } catch (error) {
      console.error("[Zalo SDK / API Error]: Lỗi hoặc người dùng từ chối cấp quyền", error);
    } finally {
      setIsStarting(false);
      if (onStart) onStart(fetchedPhone);
    }
  };

  return (
    <div className="w-full min-h-screen relative flex flex-col bg-gradient-to-b from-[#0f172a] via-[#1e3a8a] to-[#0ea5e9] overflow-y-auto px-5 pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] fade-in">
      
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 pointer-events-none"></div>

      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-64 h-64 bg-cyan-500/30 rounded-full blur-[80px] pointer-events-none"></div>

      <div className="relative z-10 flex flex-col items-center mt-6 mb-4">
        <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-[0_0_30px_rgba(14,165,233,0.3)]">
          <img
            src="https://res.cloudinary.com/djyq3kmgb/image/upload/v1771898961/Logo_HTO_GROUPpng-02_2_fpe7wl.png"
            alt="HTO Logo"
            className="object-contain w-14 h-14"
          />
        </div>

        <h1 className="mt-3 text-3xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-100 drop-shadow-[0_0_15px_rgba(34,211,238,0.5)] text-center uppercase leading-tight">
          HTO FUTURE MAP
        </h1>

        <h2 className="flex items-center justify-center gap-2 mt-1 text-xl font-bold tracking-wider text-yellow-400 uppercase drop-shadow-md whitespace-nowrap">
          <span>Bản Đồ Tương Lai 2030</span>
          <span className="text-2xl">🌍</span>
        </h2>

        <p className="px-1 mt-2 text-base font-medium leading-relaxed text-center text-blue-100">
          Khám phá lộ trình sự nghiệp đến 2030 qua những câu hỏi trắc nghiệm thú vị và chính xác.
        </p>
      </div>

      <div className="relative z-10 w-full my-2">
        <div className="grid grid-cols-2 gap-3">
          {/* Box 1 */}
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl py-5 px-2 flex flex-col items-center text-center shadow-[0_8px_32px_rgba(0,0,0,0.15)]">
            <div className="flex items-center justify-center w-16 h-16 mb-2 overflow-hidden shadow-lg bg-white/10 rounded-xl shadow-cyan-500/30">
              <img src="https://i.ibb.co/C3THq22r/image-removebg-preview-2.png" alt="Nhanh chóng" className="object-contain w-full h-full" />
            </div>
            <div className="mb-1 text-base font-black tracking-wider uppercase text-cyan-300">Nhanh chóng</div>
            <div className="text-sm text-blue-100">5-15 Phút làm bài</div>
          </div>

          {/* Box 2 */}
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl py-5 px-2 flex flex-col items-center text-center shadow-[0_8px_32px_rgba(0,0,0,0.15)]">
             <div className="flex items-center justify-center w-16 h-16 mb-2 overflow-hidden shadow-lg bg-white/10 rounded-xl shadow-pink-500/30">
              <img src="https://i.ibb.co/jPHTMWbj/sticker-hito-04-removebg-preview.png" alt="Chính xác" className="object-cover w-full h-full" />
            </div>
            <div className="mb-1 text-base font-black tracking-wider text-pink-300 uppercase">Chính xác</div>
            <div className="text-sm text-blue-100">Thuật toán tối ưu</div>
          </div>

          {/* Box 3 */}
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl py-5 px-2 flex flex-col items-center text-center shadow-[0_8px_32px_rgba(0,0,0,0.15)]">
             <div className="flex items-center justify-center w-16 h-16 mb-2 overflow-hidden shadow-lg bg-white/10 rounded-xl shadow-green-500/30">
              <img src="https://i.ibb.co/WpDbW2Lk/image-removebg-preview-1.png" alt="Lộ trình" className="object-contain w-full h-full" />
            </div>
            <div className="mb-1 text-base font-black tracking-wider text-green-300 uppercase">Lộ trình</div>
            <div className="text-sm text-blue-100">Định hướng cụ thể</div>
          </div>

          {/* Box 4 */}
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl py-5 px-2 flex flex-col items-center text-center shadow-[0_8px_32px_rgba(0,0,0,0.15)]">
             <div className="flex items-center justify-center w-16 h-16 mb-2 overflow-hidden shadow-lg bg-white/10 rounded-xl shadow-yellow-500/30">
              <img src="https://i.ibb.co/CKqPDCGJ/unnamed-2-removebg-preview.png" alt="Chuẩn Holland" className="object-contain w-full h-full" />
            </div>
            <div className="mb-1 text-sm font-black tracking-wider text-yellow-300 uppercase">Chuẩn Holland</div>
            <div className="text-sm text-blue-100">6 nhóm tính cách</div>
          </div>
        </div>
      </div>

      <div className="relative z-10 w-full pb-6 mt-4">
        
        <div className="flex items-start gap-3 px-3 py-3 mb-4 border shadow-inner bg-white/5 rounded-2xl border-white/10">
          <input
            type="checkbox"
            id="terms"
            checked={isAgreed}
            onChange={(e) => setIsAgreed(e.target.checked)}
            className="w-5 h-5 mt-0.5 rounded cursor-pointer border-white/30 text-cyan-500 focus:ring-cyan-500 bg-white/10 accent-cyan-400 shrink-0"
          />
          <label htmlFor="terms" className="text-sm font-medium leading-relaxed text-blue-100 cursor-pointer">
            Tôi đồng ý cho phép HTO Group sử dụng thông tin để tư vấn lộ trình du học theo {' '}
            <span 
              onClick={(e) => { e.preventDefault(); setIsTermsOpen(true); }}
              className="font-bold underline transition-colors pointer-events-auto text-cyan-300 hover:text-cyan-200"
            >
              Điều khoản sử dụng
            </span> 
            {' '} và {' '}
            <span 
              onClick={(e) => { e.preventDefault(); setIsTermsOpen(true); }}
              className="font-bold underline transition-colors pointer-events-auto text-cyan-300 hover:text-cyan-200"
            >
              Chính sách bảo mật
            </span>.
          </label>
        </div>

        <button
          onClick={handleStart}
          disabled={isStarting || !isAgreed}
          className={`w-full bg-gradient-to-r from-cyan-400 to-blue-600 text-white font-black text-lg rounded-full py-4 shadow-[0_0_20px_rgba(14,165,233,0.5)] transition-transform uppercase tracking-wider border border-cyan-300/50 flex justify-center items-center gap-2 ${
            isStarting || !isAgreed ? "opacity-50 cursor-not-allowed grayscale-[30%]" : "active:scale-95"
          }`}
        >
          {isStarting ? (
            <>
              <div className="w-5 h-5 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
              <span>Đang xử lý...</span>
            </>
          ) : (
            <span>Bắt đầu test ngay</span>
          )}
        </button>

        <div className="flex items-center justify-center gap-2 px-5 py-2 mx-auto mt-4 border rounded-full bg-black/20 border-white/10 w-max backdrop-blur-md">
          <span className="text-xl">📞</span>
          <span className="text-xs font-semibold tracking-wider text-blue-200 uppercase">
            Tổng đài hỗ trợ:
          </span>
          <span className="text-lg font-black tracking-wider text-cyan-400">
            1800 9078
          </span>
        </div>
      </div>

      {/* Popup Điều khoản bảo mật */}
      {isTermsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0a1930]/90 backdrop-blur-sm fade-in">
          <div className="relative w-full max-w-sm max-h-[80vh] flex flex-col bg-gradient-to-b from-[#0f172a] to-[#1e3a8a] border border-cyan-400/30 rounded-3xl shadow-[0_15px_50px_rgba(0,0,0,0.6)] overflow-hidden">
            
            <button 
              onClick={() => setIsTermsOpen(false)}
              className="absolute z-10 flex items-center justify-center w-8 h-8 text-lg font-bold border rounded-full top-4 right-4 text-white/60 hover:text-white border-white/20 bg-black/30"
            >
              ✕
            </button>

            <div className="p-6 pb-2 border-b border-white/10">
              <h3 className="text-xl font-black font-['Montserrat'] uppercase tracking-widest text-cyan-300 drop-shadow-sm">
                🔒 CHÍNH SÁCH BẢO MẬT
              </h3>
            </div>

            <div className="p-6 space-y-4 overflow-y-auto text-base custom-scrollbar text-white/80">
              <p>
                Cảm ơn bạn đã tham gia chương trình định hướng nghề nghiệp <strong>HTO FUTURE MAP</strong>. Việc bảo mật thông tin cá nhân của bạn là ưu tiên hàng đầu của chúng tôi.
              </p>
              
              <div>
                <h4 className="mb-1 text-lg font-bold text-yellow-400">1. Mục đích thu thập dữ liệu</h4>
                <ul className="pl-4 space-y-1 text-sm list-disc">
                  <li>Phân tích tự động để trả kết quả trắc nghiệm tính cách.</li>
                  <li>Tự động gửi file báo cáo PDF về Email của bạn.</li>
                  <li>Hỗ trợ chuyên gia HTO liên hệ để tư vấn lộ trình du học/nghề nghiệp 1-1 chuyên sâu.</li>
                </ul>
              </div>

              <div>
                <h4 className="mb-1 text-lg font-bold text-yellow-400">2. Cam kết bảo mật (NDPA)</h4>
                <p className="text-sm">
                  HTO Group cam kết tuân thủ Nghị định 13/2023/NĐ-CP về bảo vệ dữ liệu cá nhân. Thông tin của bạn được mã hóa an toàn và <strong>tuyệt đối không mua bán hay trao đổi</strong> với bất kỳ bên thứ ba nào nằm ngoài hệ sinh thái đối tác giáo dục của HTO.
                </p>
              </div>

              <div>
                <h4 className="mb-1 text-lg font-bold text-yellow-400">3. Quyền của người dùng</h4>
                <p className="text-sm">
                  Bạn có quyền yêu cầu trích xuất, sửa đổi hoặc xóa bỏ hoàn toàn dữ liệu cá nhân của mình khỏi hệ thống của HTO Group bất cứ lúc nào thông qua Tổng đài hỗ trợ.
                </p>
              </div>
            </div>

            <div className="p-5 border-t border-white/10 bg-black/20">
              <button 
                onClick={() => {
                  setIsAgreed(true);
                  setIsTermsOpen(false);
                }}
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-base rounded-full py-3.5 shadow-lg active:scale-95 transition-transform uppercase tracking-widest"
              >
                Đã hiểu & Đồng ý
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default WelcomeScreen;