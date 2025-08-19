export interface UserType {
  id: number;
  name: string;
  email: string;
  gender: string;
  image: string;
  grNumber?: string;
  class?: string;
  department: string;
  phone: string;
  roleId: number;
  role: string;
}

export interface LeaveRecordType {
  id: number;
  startDate: string;
  endDate: string;
  reason: string;
  status: string;
  createdAt: string;
  RequestedTo: {
    name: string;
  };
}

export interface LeaveBalanceType {
  totalLeave: number;
  availableLeave: number;
  usedLeave: number;
  academicYear: string;
  totalWorkingDays: number;
  attendancePercentage: number;
}

export interface ErrorType {
  success: boolean;
  error: string;
}

export interface HodStats {
  totalStudents: number;
  totalFaculties: number;
  pendingRequest: number;
}
export interface AdminStats {
  totalUsers: number;
  totalStudents: number;
  totalFaculty: number;
  totalHods: number;
  totalDepartments: number;
}
