export type User = {
  id: number;
  name: string;
  email: string;
  password: string;
  gender: "male" | "female";
  image: string;
  grNumber: string | null;
  phone: string;
  address: string;
  department: string | null;
  class: string | null;
  roleId: number;
};

export type UserPayload = {
  id: number;
};

export type Leave = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
  startDate: Date;
  endDate: Date;
  leaveType: "firstHalf" | "secondHalf" | "fullDay";
  reason: string;
  requestToId: number;
  status: "pending" | "approved" | "rejected";
};
