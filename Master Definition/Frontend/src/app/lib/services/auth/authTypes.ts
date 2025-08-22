export interface loginUserInterface {
  email: string;
  password: string;
}

export interface registerUserInterface {
  name: string;
  email: string;
  password: string;
  gender: string;
  image: string | File;
  phone: string;
  address: string;
  department?: string;
  class?: string;
  role?: string;
}

export interface resetPasswordInterface {
  email: string;
  password: string;
  confirmPassword: string;
  otp: string;
}
