import axios from "axios";
import { resetPasswordInterface } from "./authTypes";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;

export const sendOtp = async (email: string) => {
  try {
    const response = await axios.post(`${BASE_URL}/user/requestPasswordReset`, {
      email: email,
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data;
    }
    return { success: false, error: "An unknown error occurred." };
  }
};

export const verifyOtp = async (data: resetPasswordInterface) => {
  try {
    const response = await axios.post(`${BASE_URL}/user/resetPassword`, {
      email: data.email,
      password: data.password,
      otp: Number(data.otp),
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data;
    }
    return { success: false, error: "An unknown error occurred." };
  }
};
