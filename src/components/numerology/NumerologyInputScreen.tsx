import React, { useEffect, useState } from "react";
import { getAccessToken } from "zmp-sdk/apis";

import {
  fetchProvinceOptions,
  fetchWardOptionsByProvinceCode,
  fetchZaloUserName,
  ProvinceOption,
  WardOption,
} from "./api";
import { NumerologyEducationOption, NumerologyFormValues } from "./types";

type NumerologyInputScreenProps = {
  initialValues?: Partial<NumerologyFormValues>;
  onSubmit?: (values: NumerologyFormValues) => void;
  onBack?: () => void;
  educationOptions?: NumerologyEducationOption[];
};

type FormErrors = Partial<Record<keyof NumerologyFormValues, string>>;

const defaultValues: NumerologyFormValues = {
  fullName: "",
  phone: "",
  birthDate: "",
  email: "",
  province: "",
  district: "",
  educationLevel: "",
};

const fieldShellClassName =
  "rounded-2xl border border-white/10 bg-white/5 p-1 transition-all focus-within:border-amber-400/50 focus-within:bg-white/10";

const labelClassName = "block px-3 pt-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400";

const inputClassName =
  "w-full border-none bg-transparent px-3 pb-2 pt-1 font-medium text-white outline-none placeholder:text-slate-600";

const fallbackEducationOptions: NumerologyEducationOption[] = [
  { value: "high_school", label: "Cấp 3" },
  { value: "college_student", label: "Đang học Đại học" },
  { value: "university_graduated", label: "Đã tốt nghiệp Đại học" },
];

const errorTextClassName = "px-3 pb-2 text-xs text-pink-400";

const NumerologyInputScreen: React.FC<NumerologyInputScreenProps> = ({
  initialValues,
  onSubmit,
  onBack,
  educationOptions = fallbackEducationOptions,
}) => {
  const [values, setValues] = useState<NumerologyFormValues>({ ...defaultValues, ...initialValues });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isFetchingProfile, setIsFetchingProfile] = useState(false);
  const [provinceOptions, setProvinceOptions] = useState<ProvinceOption[]>([]);
  const [wardOptions, setWardOptions] = useState<WardOption[]>([]);
  const [isLoadingProvinces, setIsLoadingProvinces] = useState(false);
  const [isLoadingWards, setIsLoadingWards] = useState(false);

  const handleChange = (field: keyof NumerologyFormValues, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: "" }));
  };

  const handleProvinceChange = (provinceName: string) => {
    setValues((current) => ({
      ...current,
      province: provinceName,
      district: "",
    }));
    setErrors((current) => ({
      ...current,
      province: "",
      district: "",
    }));
  };

  const validateForm = (nextValues: NumerologyFormValues): FormErrors => {
    const nextErrors: FormErrors = {};
    const normalizedPhone = nextValues.phone.replace(/\s+/g, "");

    if (!nextValues.fullName.trim()) {
      nextErrors.fullName = "Vui lòng nhập họ và tên.";
    }

    if (!normalizedPhone) {
      nextErrors.phone = "Vui lòng nhập số điện thoại.";
    } else if (!/^(0|\+84|84)\d{9,10}$/.test(normalizedPhone)) {
      nextErrors.phone = "Số điện thoại không hợp lệ.";
    }

    if (!nextValues.birthDate) {
      nextErrors.birthDate = "Vui lòng chọn ngày sinh.";
    }

    if (!nextValues.email.trim()) {
      nextErrors.email = "Vui lòng nhập email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(nextValues.email.trim())) {
      nextErrors.email = "Email không hợp lệ.";
    }

    if (!nextValues.province) {
      nextErrors.province = "Vui lòng chọn tỉnh / thành.";
    }

    if (!nextValues.district) {
      nextErrors.district = "Vui lòng chọn xã / phường.";
    }

    if (!nextValues.educationLevel) {
      nextErrors.educationLevel = "Vui lòng chọn trình độ học vấn.";
    }

    return nextErrors;
  };

  const handleSubmit = () => {
    const nextErrors = validateForm(values);
    setErrors(nextErrors);

    if (Object.values(nextErrors).some(Boolean)) {
      return;
    }

    onSubmit?.(values);
  };

  useEffect(() => {
    let mounted = true;

    async function hydrateNameFromZalo() {
      if (values.fullName) return;

      try {
        setIsFetchingProfile(true);
        const accessToken = await getAccessToken({});
        const fullName = await fetchZaloUserName(accessToken);
        if (mounted && fullName) {
          setValues((current) => ({ ...current, fullName }));
        }
      } catch {
        // keep manual input fallback
      } finally {
        if (mounted) {
          setIsFetchingProfile(false);
        }
      }
    }

    hydrateNameFromZalo();

    return () => {
      mounted = false;
    };
  }, [values.fullName]);

  useEffect(() => {
    let mounted = true;

    async function loadProvinces() {
      try {
        setIsLoadingProvinces(true);
        const nextProvinces = await fetchProvinceOptions();
        if (mounted) {
          setProvinceOptions(nextProvinces);
        }
      } catch {
        if (mounted) {
          setProvinceOptions([]);
        }
      } finally {
        if (mounted) {
          setIsLoadingProvinces(false);
        }
      }
    }

    loadProvinces();

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    const selectedProvince = provinceOptions.find((province) => province.name === values.province);

    if (!selectedProvince) {
      setWardOptions([]);
      return;
    }

    const provinceCode = selectedProvince.code;
    let mounted = true;

    async function loadWards() {
      try {
        setIsLoadingWards(true);
        const nextWards = await fetchWardOptionsByProvinceCode(provinceCode);
        if (!mounted) return;

        setWardOptions(nextWards);
        setValues((current) => {
          if (!current.district) return current;
          const hasSelectedWard = nextWards.some((ward) => ward.name === current.district);
          return hasSelectedWard ? current : { ...current, district: "" };
        });
      } catch {
        if (mounted) {
          setWardOptions([]);
        }
      } finally {
        if (mounted) {
          setIsLoadingWards(false);
        }
      }
    }

    loadWards();

    return () => {
      mounted = false;
    };
  }, [provinceOptions, values.province]);

  return (
    <div className="font-quicksand w-full min-h-screen bg-gray-950 text-white">
      <div className="mx-auto flex h-screen w-full max-w-md flex-col overflow-hidden bg-gradient-to-b from-purple-950 via-slate-900 to-black shadow-2xl sm:border-x sm:border-white/10">
        <header
          className="relative z-20 shrink-0 border-b border-white/5 bg-black/20 px-6 pb-4 backdrop-blur-xl"
          style={{ paddingTop: "calc(env(safe-area-inset-top, 0px) + 16px)" }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onBack}
                className="rounded-full bg-white/10 p-1.5 transition hover:bg-white/20"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <h1 className="text-sm font-semibold uppercase tracking-wider text-slate-100">Hồ sơ cá nhân</h1>
            </div>
          </div>
        </header>

        <main className="relative z-0 flex-1 overflow-y-auto px-6 py-8 pb-32">
          <div className="space-y-8">
            <div>
              <h2 className="mb-2 bg-gradient-to-r from-yellow-200 to-amber-500 bg-clip-text text-2xl font-extrabold text-transparent">
                Nhập liệu thông minh
              </h2>
              <p className="text-sm font-medium leading-relaxed text-slate-300">
                Hãy cung cấp thông tin chuẩn xác để nhận biểu đồ giải mã sâu sắc nhất từ vũ trụ.
              </p>
            </div>

            <form
              onSubmit={(event) => {
                event.preventDefault();
                handleSubmit();
              }}
              className="space-y-4"
            >
              <div className={fieldShellClassName}>
                <label className={labelClassName}>
                  Họ và tên (Theo CCCD) <span className="text-pink-500">*</span>
                </label>
                <input
                  type="text"
                  value={values.fullName}
                  onChange={(event) => handleChange("fullName", event.target.value)}
                  placeholder={isFetchingProfile ? "Đang kết nối Zalo..." : "VD: PHAN ĐỨC TOÀN"}
                  className={inputClassName}
                />
                {errors.fullName ? <p className={errorTextClassName}>{errors.fullName}</p> : null}
              </div>

              <div className={fieldShellClassName}>
                <label className={labelClassName}>
                  Số điện thoại <span className="text-pink-500">*</span>
                </label>
                <input
                  type="tel"
                  value={values.phone}
                  onChange={(event) => handleChange("phone", event.target.value)}
                  placeholder="090xxxxxxx"
                  className={inputClassName}
                />
                {errors.phone ? <p className={errorTextClassName}>{errors.phone}</p> : null}
              </div>

              <div className={`relative ${fieldShellClassName}`}>
                <label className={labelClassName}>
                  Ngày sinh (Theo CCCD) <span className="text-pink-500">*</span>
                </label>
                <input
                  type="date"
                  value={values.birthDate}
                  onChange={(event) => handleChange("birthDate", event.target.value)}
                  className={`${inputClassName} pr-10 text-left appearance-none [color-scheme:dark]`}
                />
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 pt-3">
                  <svg className="h-4 w-4 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 7V3m8 4V3m-9 8h10m-13 9h16a2 2 0 002-2V7a2 2 0 00-2-2H4a2 2 0 00-2 2v11a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                {errors.birthDate ? <p className={errorTextClassName}>{errors.birthDate}</p> : null}
              </div>

              <div className={fieldShellClassName}>
                <label className={labelClassName}>
                  Email nhận bản đồ PDF <span className="text-pink-500">*</span>
                </label>
                <input
                  type="email"
                  value={values.email}
                  onChange={(event) => handleChange("email", event.target.value)}
                  placeholder="email@example.com"
                  className={inputClassName}
                />
                {errors.email ? <p className={errorTextClassName}>{errors.email}</p> : null}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className={`relative ${fieldShellClassName}`}>
                  <label className={labelClassName}>Tỉnh / Thành</label>
                  <select
                    value={values.province}
                    onChange={(event) => handleProvinceChange(event.target.value)}
                    disabled={isLoadingProvinces}
                    className={`${inputClassName} appearance-none`}
                  >
                    <option value="">{isLoadingProvinces ? "Đang tải dữ liệu..." : "Chọn Tỉnh / Thành"}</option>
                    {provinceOptions.map((province) => (
                      <option key={province.code} value={province.name}>
                        {province.name}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 pt-3">
                    <svg className="h-4 w-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                  {errors.province ? <p className={errorTextClassName}>{errors.province}</p> : null}
                </div>

                <div className={`relative ${fieldShellClassName}`}>
                  <label className={labelClassName}>Xã / Phường</label>
                  <select
                    value={values.district}
                    onChange={(event) => handleChange("district", event.target.value)}
                    disabled={!values.province || isLoadingWards}
                    className={`${inputClassName} appearance-none`}
                  >
                    <option value="">
                      {!values.province
                        ? "Chọn Tỉnh trước"
                        : isLoadingWards
                          ? "Đang tải..."
                          : "Chọn Xã / Phường"}
                    </option>
                    {wardOptions.map((ward) => (
                      <option key={ward.code} value={ward.name}>
                        {ward.name}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 pt-3">
                    <svg className="h-4 w-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                  {errors.district ? <p className={errorTextClassName}>{errors.district}</p> : null}
                </div>
              </div>

              <p className="mt-[-8px] px-2 text-[11px] italic text-slate-500">
                Danh sách địa chỉ được cập nhật theo đơn vị hành chính mới nhất.
              </p>

              <div className={`relative mt-2 ${fieldShellClassName}`}>
                <label className={`${labelClassName} flex items-center gap-1 text-amber-400`}>
                  <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                    />
                  </svg>
                  Trình độ học vấn
                </label>
                <select
                  value={values.educationLevel}
                  onChange={(event) => handleChange("educationLevel", event.target.value)}
                  className={`${inputClassName} appearance-none`}
                >
                  <option value="">Chọn trình độ</option>
                  {educationOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 pt-3">
                  <svg className="h-4 w-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                {errors.educationLevel ? <p className={errorTextClassName}>{errors.educationLevel}</p> : null}
              </div>
            </form>
          </div>
        </main>

        <div className="pointer-events-none absolute bottom-0 left-0 z-10 w-full bg-gradient-to-t from-black via-gray-900/95 to-transparent px-6 py-6 pt-16">
          <button
            type="button"
            onClick={handleSubmit}
            className="numerology-glow-gold pointer-events-auto flex w-full items-center justify-center gap-2 rounded-full border-2 border-amber-400/70 bg-gradient-to-r from-purple-700 to-pink-600 px-10 py-3.5 text-lg font-bold text-white transition-transform active:scale-[0.98]"
          >
            Phân Tích Bản Đồ
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NumerologyInputScreen;