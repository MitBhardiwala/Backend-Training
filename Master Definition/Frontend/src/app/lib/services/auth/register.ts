import { signIn } from "next-auth/react";
import { registerUserInterface } from "./authTypes";
import axios, { AxiosError } from "axios";
const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;

interface MyObject {
  [key: string]: string | number | undefined;
}

export const handleRegister = async (data: registerUserInterface) => {
  try {
    //removed null values
    const filteredData: MyObject = {};
    Object.keys(data).forEach((key) => {
      const value = data[key as keyof registerUserInterface];
      if (value !== null && value !== "") {
        filteredData[key] = value;
      }
    });

    const response = await axios.post(
      `${BASE_URL}/student/register`,
      filteredData,
      {
        headers: {
          "Content-Type": "multipart/form-data", // Important for file uploads
        },
      }
    );

    if (response.data.success) {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result && result.error) {
        return {
          success: false,
          error: result.error.split(":")[1],
        };
      }
      return response.data;
    } else {
      throw Error("Error in register");
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data;
    }
    return { success: false, error: "An unknown error occurred." };
  }
};
