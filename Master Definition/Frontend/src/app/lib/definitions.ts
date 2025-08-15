export interface User {
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

export interface Leave {
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
