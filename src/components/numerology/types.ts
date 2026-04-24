export type NumerologyFormValues = {
  fullName: string;
  phone: string;
  birthDate: string;
  email: string;
  province: string;
  district: string;
  educationLevel: string;
};

export type NumerologyEducationOption = {
  value: string;
  label: string;
};

export type NumerologyCoreNumbers = {
  lifePath: number | string;
  destiny: number | string;
  soulUrge: number | string;
};

export type NumerologyRadarScores = {
  leadership: number;
  technical: number;
  empathy: number;
  creativity: number;
  discipline: number;
};

export type NumerologyResultData = {
  submissionId?: string;
  fullName: string;
  title: string;
  subtitle: string;
  lifePathDescription: string;
  soulMissionText: string;
  strengths: string[];
  caution: string;
  aiWarning: string;
  primaryProgram: {
    title: string;
    highlight: string;
    market: string;
    detail: string;
  };
  secondaryProgram: {
    title: string;
    detail: string;
  };
  tertiaryProgram: {
    title: string;
    detail: string;
  };
  ecosystem: Array<{
    title: string;
    detail: string;
  }>;
  coreNumbers: NumerologyCoreNumbers;
  radarScores: NumerologyRadarScores;
};
