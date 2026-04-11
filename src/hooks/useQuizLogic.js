    import { useState, useEffect } from 'react';
    import { CLASS_QUESTIONS, MAX_STAT } from '../models/quizData'; 

    const STORAGE_KEY = 'HTO_QUIZ_SAVE_DATA';

    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwCuu2eGgWMX1Ak1XwnYhi6RNVVUE7qI91qlD_zLMQzFPUpgwtelRYW1FdNJJ9O_IRQ3g/exec'; 
    const HOLLAND_RECOMMENDATION = {
      logic:     { label: "Logic cao (Investigative)", advice: "Bạn phù hợp với Developer, Researcher, Data Analyst.", course: "Khóa Logic & Phân tích nâng cao" },
      creative:  { label: "Sáng tạo cao (Artistic)",   advice: "Phù hợp nghề thiết kế, content, marketing sáng tạo.", course: "Khóa Sáng tạo & Thiết kế" },
      comm:      { label: "Giao tiếp cao (Social)",    advice: "Phù hợp sales, tư vấn, giáo dục, HR.", course: "Khóa Kỹ năng mềm & Giao tiếp" },
      lead:      { label: "Lãnh đạo cao (Enterprising)", advice: "Phù hợp quản lý, kinh doanh, khởi nghiệp.", course: "Khóa Lãnh đạo & Quản trị" },
      tech:      { label: "Thực hành cao (Realistic)", advice: "Phù hợp kỹ thuật, xây dựng, cơ khí.", course: "Khóa Kỹ thuật thực hành" },
      sci:       { label: "Quy ước cao (Conventional)", advice: "Phù hợp kế toán, admin, quản lý dữ liệu.", course: "Khóa Quản lý & Hành chính" }
    };

    export const useQuizLogic = () => {
      const getInitialState = () => {
        try {
          const saved = localStorage.getItem(STORAGE_KEY);
          if (saved) return JSON.parse(saved);
        } catch (e) {
          console.error("❌ Lỗi khi đọc dữ liệu cũ:", e);
        }
        return null;
      };

      const savedData = getInitialState();

      const [currentScreen, setCurrentScreen] = useState('welcome');
      const [userData, setUserData] = useState(savedData?.userData || { fullname: '', phone: '', email: '', agree: false });
      const [character, setCharacter] = useState(savedData?.character || { id: '', name: '', icon: '' });
      const [currentQIndex, setCurrentQIndex] = useState(savedData?.currentQIndex || 0);
      const [totalExp, setTotalExp] = useState(savedData?.totalExp || 0);
      
      const [stats, setStats] = useState(savedData?.stats || {
        logic: 0, creative: 0, comm: 0, lead: 0, tech: 0, sci: 0
      });

      const initialQuestions = savedData?.character?.id 
        ? (CLASS_QUESTIONS[savedData.character.id] || CLASS_QUESTIONS['default'] || []) 
        : [];

      const [activeQuestions, setActiveQuestions] = useState(initialQuestions);
      const [agentId, setAgentId] = useState(null);

      useEffect(() => {
        try {
          const urlParams = new URLSearchParams(window.location.search);
          const agent = urlParams.get('agent_id');
          if (agent) {
            setAgentId(agent);
            sessionStorage.setItem('HTO_AGENT_ID', agent);
          }
        } catch (e) {}
      }, []);

      useEffect(() => {
        if (currentScreen === 'welcome' && !userData.phone) return;
        const dataToSave = { currentScreen, userData, character, currentQIndex, totalExp, stats };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
      }, [currentScreen, userData, character, currentQIndex, totalExp, stats]);

      const navigate = (screenName) => setCurrentScreen(screenName);

      const calculateDominant = (currentStats) => {
        const entries = Object.entries(currentStats);
        if (!entries.length) return { key: 'logic', value: 0, info: HOLLAND_RECOMMENDATION.logic };

        const maxEntry = entries.reduce((max, curr) => curr[1] > max[1] ? curr : max);
        const key = maxEntry[0];
        return { key, value: maxEntry[1], info: HOLLAND_RECOMMENDATION[key] || HOLLAND_RECOMMENDATION.logic };
      };

      const calculateWeakest = (currentStats) => {
        const entries = Object.entries(currentStats);
        if (!entries.length) return { name: 'unknown', percent: 0 };

        const minEntry = entries.reduce((min, curr) => curr[1] < min[1] ? curr : min);
        const percent = MAX_STAT > 0 ? Math.round((minEntry[1] / MAX_STAT) * 100) : 0;
        return { name: minEntry[0], percent };
      };

      const finishQuiz = () => {
        const dominant = calculateDominant(stats);
        const weakest = calculateWeakest(stats);

        const dataToSend = {
          fullname: userData.fullname || "Khách",
          phone: userData.phone || "",
          email: userData.email || "",
          agentId: agentId || sessionStorage.getItem('HTO_AGENT_ID') || 'organic',
          selectedClass: character.name || "",
          totalExp: totalExp || 0,
          stats_holland: JSON.stringify(stats),
          dominant_type: dominant.key,
          rank: dominant.info.label,
          ai_advice: dominant.info.advice,
          weak_skill: weakest.name,
          weak_percent: weakest.percent,
          prize_won: totalExp >= 100 ? "Đủ điều kiện quay thưởng" : "Chưa đủ điểm",   
          completed_at: new Date().toISOString(),
          url_source: window.location.href,
          test_type: "huong_nghiep" 
        };

        sendDataToGoogleSheet(dataToSend);
        navigate('result');
      };

      const sendDataToGoogleSheet = async (data) => {
        const formData = new FormData();
        
        formData.append("fullname", data.fullname || "Khách");
        formData.append("phone", data.phone || "");
        formData.append("email", data.email || "");
        formData.append("agentId", data.agentId || 'organic');
        formData.append("status", "Hoàn thành bài test");
        
        formData.append("selectedClass", data.selectedClass || "");
        formData.append("totalExp", data.totalExp || 0);
        formData.append("stats_holland", data.stats_holland);
        formData.append("url_source", data.url_source);

        formData.append("dominant_type", data.dominant_type || "");
        formData.append("rank", data.rank || "");
        formData.append("ai_advice", data.ai_advice || "");
        formData.append("weak_skill", data.weak_skill || "Chưa xác định");
        formData.append("test_type", data.test_type); 

        let noteInfo = [];
        noteInfo.push(`🏆 Dominant: ${data.rank} (EXP: ${data.totalExp})`);
        if (data.weak_skill && data.weak_skill !== "unknown") {
          noteInfo.push(`📉 Yếu nhất: ${data.weak_skill} (${data.weak_percent}%)`);
        }
        noteInfo.push(`💡 Gợi ý: ${data.ai_advice}`);
        formData.append("ghi_chu", noteInfo.join("\n"));

        try {
          await fetch(GOOGLE_SCRIPT_URL, { method: 'POST', body: formData, mode: 'no-cors' });
          console.log("✅ Đã bắn dữ liệu thành công!");
        } catch (e) {
          console.error("❌ Lỗi gửi sheet:", e);
        }
      };

      const saveUserData = (data) => {
        setUserData(data);
        navigate('char');
      };

      const selectCharacter = (id, name, icon) => {
        setCharacter({ id, name, icon });
        setActiveQuestions(CLASS_QUESTIONS[id] || CLASS_QUESTIONS['default'] || []);
        setCurrentQIndex(0);        
        setTotalExp(0);
        setStats({ logic: 0, creative: 0, comm: 0, lead: 0, tech: 0, sci: 0 });
      };

      const HOLLAND_TO_UI = {
        investigative: 'logic', artistic: 'creative', social: 'comm',
        enterprising: 'lead', realistic: 'tech', conventional: 'sci'
      };

      const answerQuestion = (answerIndex) => {
        const q = activeQuestions[currentQIndex];
        if (!q) return;

        const statBonus = q.stats[answerIndex];

        setStats(prev => {
          const newStats = { ...prev };
          if (statBonus) {
            Object.keys(statBonus).forEach(hollandKey => {
              const uiKey = HOLLAND_TO_UI[hollandKey];
              if (uiKey && statBonus[hollandKey] > 0) {
                const addedPoint = statBonus[hollandKey] === 3 ? 12 : 6;  
                newStats[uiKey] = Math.min(newStats[uiKey] + addedPoint, MAX_STAT);
              }
            });
          }
          return newStats;
        });

        const expGain = 45 + Math.floor(Math.random() * 31); 
        setTotalExp(prev => prev + expGain);
      };

      const nextQuestion = () => {
        if (currentQIndex < activeQuestions.length - 1) {
          setCurrentQIndex(prev => prev + 1);
        } else {
          finishQuiz();
        }
      };

      const resetGame = () => {
        localStorage.removeItem(STORAGE_KEY); 
        setCurrentQIndex(0);
        setTotalExp(0);
        setStats({ logic: 0, creative: 0, comm: 0, lead: 0, tech: 0, sci: 0 });
        setCharacter({ id: '', name: '', icon: '' });
        setUserData({ fullname: '', phone: '', email: '', agree: false });
        setActiveQuestions([]); 
        navigate('welcome');
      };

      return {
        currentScreen, navigate,
        userData, saveUserData, agentId,
        character, selectCharacter,
        currentQIndex, totalExp, stats, 
        questions: activeQuestions, 
        maxStat: MAX_STAT, 
        answerQuestion, 
        nextQuestion, 
        resetGame
      };
    };