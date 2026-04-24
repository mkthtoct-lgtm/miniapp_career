import {
  NumerologyEducationOption,
  NumerologyFormValues,
  NumerologyResultData,
} from "./types";

const API_BASE = (import.meta as any).env?.VITE_NUMEROLOGY_API_BASE || "https://api.hto.edu.vn/";

type AnalyzeApiResponse = {
  success: boolean;
  message?: string;
  data?: {
    submissionId: string;
    result: {
      coreNumbers: {
        lifePath: number;
        destiny: number;
        soulUrge: number;
      };
      radarScores: {
        leadership: number;
        technical: number;
        empathy: number;
        creativity: number;
        discipline: number;
      };
      suggestedProgram: {
        id: string;
        market: string;
        title: string;
        description: string;
        tags?: string[];
      };
      summary: {
        title: string;
        summary: string;
        detail: string;
        strengths?: string[];
        recommendation?: string;
        note?: string;
      };
    };
  };
};

type MetaApiResponse = {
  success: boolean;
  data?: {
    educationLevels: NumerologyEducationOption[];
  };
};

export type ProvinceOption = {
  code: number;
  name: string;
  division_type: string;
};

export type WardOption = {
  code: number;
  name: string;
  division_type: string;
  province_code: number;
};

const fallbackEducationLevels: NumerologyEducationOption[] = [
  { value: "high_school", label: "Cấp 3" },
  { value: "college_student", label: "Đang học Đại học" },
  { value: "university_graduated", label: "Đã tốt nghiệp Đại học" },
];

async function parseJsonSafe<T>(response: Response): Promise<T | null> {
  try {
    return (await response.json()) as T;
  } catch {
    return null;
  }
}

function buildFallbackResult(values: NumerologyFormValues): NumerologyResultData {
  return {
    submissionId: "",
    fullName: values.fullName,
    title: "Hồ sơ tiềm năng",
    subtitle: "Hình thái năng lực được mô phỏng tạm thời do backend chưa sẵn sàng.",
    lifePathDescription: "Cần kết nối backend để nhận diễn giải đầy đủ.",
    soulMissionText: "Cần kết nối backend để nhận chỉ số linh hồn và sứ mệnh.",
    strengths: ["Đang kết nối dữ liệu từ backend numerology."],
    caution: "Kiểm tra backend numerology hoặc cấu hình VITE_NUMEROLOGY_API_BASE.",
    aiWarning: "Backend numerology đang chưa phản hồi, đây là dữ liệu tạm.",
    primaryProgram: {
      title: "Đang cập nhật lộ trình",
      highlight: "Tạm thời",
      market: "HTO",
      detail: "Cần gọi API analyze để nhận gợi ý thật.",
    },
    secondaryProgram: {
      title: "Đang cập nhật",
      detail: "Backend sẽ trả về gợi ý sau khi kết nối thành công.",
    },
    tertiaryProgram: {
      title: "Đang cập nhật",
      detail: "Backend sẽ trả về gợi ý sau khi kết nối thành công.",
    },
    ecosystem: [
      { title: "Định hướng", detail: "Cần kết nối backend để nhận dữ liệu thật." },
      { title: "CRM", detail: "Cần kết nối backend để nhận dữ liệu thật." },
      { title: "PDF", detail: "Cần kết nối backend để nhận dữ liệu thật." },
    ],
    coreNumbers: {
      lifePath: "-",
      destiny: "-",
      soulUrge: "-",
    },
    radarScores: {
      leadership: 40,
      technical: 40,
      empathy: 40,
      creativity: 40,
      discipline: 40,
    },
  };
}

export async function fetchNumerologyMeta(): Promise<NumerologyEducationOption[]> {
  try {
    const response = await fetch(`${API_BASE}/api/numerology/meta`);
    const json = await parseJsonSafe<MetaApiResponse>(response);
    if (!response.ok || !json?.success || !json.data?.educationLevels?.length) {
      return fallbackEducationLevels;
    }

    return json.data.educationLevels;
  } catch {
    return fallbackEducationLevels;
  }
}

export async function fetchProvinceOptions(): Promise<ProvinceOption[]> {
  const response = await fetch("https://provinces.open-api.vn/api/v2/");
  if (!response.ok) {
    throw new Error("Khong the tai danh sach tinh thanh");
  }

  const json = await parseJsonSafe<ProvinceOption[]>(response);
  return Array.isArray(json) ? json : [];
}

export async function fetchWardOptionsByProvinceCode(provinceCode: number): Promise<WardOption[]> {
  const response = await fetch(`https://provinces.open-api.vn/api/v2/p/${provinceCode}?depth=2`);
  if (!response.ok) {
    throw new Error("Khong the tai danh sach xa phuong");
  }

  const json = await parseJsonSafe<{ wards?: WardOption[] }>(response);
  return Array.isArray(json?.wards) ? json.wards : [];
}

export async function analyzeNumerology(values: NumerologyFormValues): Promise<NumerologyResultData> {
  console.log("[Numerology] analyze request", values);

  const response = await fetch(`${API_BASE}/api/numerology/analyze`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fullName: values.fullName,
      phone: values.phone,
      email: values.email,
      birthDate: values.birthDate,
      province: values.province,
      district: values.district,
      educationLevel: values.educationLevel,
      source: "Zalo_MiniApp_Numerology",
      campaign: "Career_Orientation_DCL_2026",
    }),
  });

  const json = await parseJsonSafe<AnalyzeApiResponse>(response);

  if (!response.ok || !json?.success || !json.data) {
    throw new Error(json?.message || "Không thể phân tích thần số học");
  }

  const { submissionId, result } = json.data;
  const program = result.suggestedProgram;
  const summary = result.summary;

  console.log("[Numerology] analyze response", json.data);

  return {
    submissionId,
    fullName: values.fullName,
    title: summary.title || "Hồ sơ tiềm năng",
    subtitle: summary.summary || "Biểu đồ năng lực được xây dựng từ tên và ngày sinh.",
    lifePathDescription: summary.summary || "Đang cập nhật diễn giải life path.",
    soulMissionText: summary.detail || "Đang cập nhật linh hồn và sứ mệnh.",
    strengths: summary.strengths || [],
    caution: summary.detail || "Cần thêm thông tin tư vấn để đối chiếu lộ trình.",
    aiWarning:
      "Trong kỷ nguyên AI, điều giữ giá trị lâu dài là khả năng tư duy độc lập, phân tích chiều sâu và ra quyết định trên bối cảnh thật.",
    primaryProgram: {
      title: `LỰA CHỌN 1: ${program.title.toUpperCase()}`,
      highlight: "ƯU TIÊN NHẤT",
      market: program.market,
      detail: program.description,
    },
    secondaryProgram: {
      title: "Lựa chọn 2: Mở rộng thị trường",
      detail: summary.recommendation || "HTO sẽ đối chiếu thêm các thị trường phù hợp từ dữ liệu CRM.",
    },
    tertiaryProgram: {
      title: "Lựa chọn 3: Tối ưu chi phí",
      detail: summary.note || "Cần kết hợp mục tiêu học tập, tài chính và ngoại ngữ để chốt lộ trình.",
    },
    ecosystem: [
      {
        title: "Định hướng hồ sơ",
        detail: "Phân tích life path, radar năng lực và học vấn để chốt lộ trình phù hợp.",
      },
      {
        title: "Công nghệ minh bạch",
        detail: "Đồng bộ CRM, PDF và feedback sau tư vấn để theo sát quá trình chuyển đổi.",
      },
      {
        title: "Hỗ trợ địa phương",
        detail: "Văn phòng HTO và đội ngũ tư vấn đồng hành trong suốt lộ trình.",
      },
    ],
    coreNumbers: result.coreNumbers,
    radarScores: result.radarScores,
  };
}

export function buildNumerologyPdfUrl(submissionId: string) {
  return `${API_BASE}/api/numerology/report/${submissionId}.pdf`;
}

export { API_BASE, buildFallbackResult };

export async function fetchZaloPhone(accessToken: string, code: string): Promise<string> {
  const response = await fetch(`${API_BASE}/get-phone-new`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      accessToken,
      code,
    }),
  });

  const json = await parseJsonSafe<any>(response);
  if (!response.ok) {
    throw new Error(json?.message || json?.error || "Không lấy được số điện thoại");
  }

  return json?.phoneNumber || json?.data?.number || json?.data?.phone_number || "";
}

export async function fetchZaloUserName(accessToken: string, code?: string): Promise<string> {
  const response = await fetch(`${API_BASE}/user-info`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      accessToken,
      code: code || "",
    }),
  });

  const json = await parseJsonSafe<any>(response);
  if (!response.ok) {
    throw new Error(json?.message || "Không lấy được tên từ Zalo");
  }

  return json?.data?.display_name || json?.data?.name || "";
}
