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
  name: string;
  email: string;
  roleId: number;
  department: string | null;
};
