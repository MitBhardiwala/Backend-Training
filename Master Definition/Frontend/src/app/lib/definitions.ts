export interface UserType {
  id: number;
  name: string;
  email: string;
  gender: string;
  image: string;
  grNumber?: string;
  class?: string;
  department?: string;
  phone: string;
  roleId: number;
  role: string;
}
export interface UpdatedUserType {
  name: string;
  gender: string;
  image: string;
  grNumber?: string;
  class?: string;
  department?: string;
  phone: string;
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

export interface LeaveRequestType {
  id: number;
  startDate: string;
  endDate: string;
  leaveType: leaveType;
  reason: string;
  status: leaveStatus;
  RequestedBy: {
    id: number;
    name: string;
    email: string;
    department: string;
  };
}
enum leaveType {
  "firstHalf",
  "secondHalf",
  "fullDay",
}

enum leaveStatus {
  "approved",
  "rejected",
  "pending",
}
