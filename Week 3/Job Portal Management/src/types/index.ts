export interface ApiResponse {
  success: boolean;
  message?: string;
  data?: any;
  error?: unknown;
  token?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: "APPLICANT" | "RECRUITER";
  createdAt: Date;
}

export interface userPayload {
  userId: string;
  iat: number;
  exp: number;
}

export interface Company {
  name: string;
  industry: string;
  userId: string;
}
export interface Job {
  createdAt: Date;
  title: string;
  description: string;
  location: string;
  salaryMin: number;
  salaryMax: number;
  companyId: number;
}

