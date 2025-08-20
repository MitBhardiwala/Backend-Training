import axios from "axios";
import { registerUserInterface } from "../auth/authTypes";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;

interface MyObject {
  [key: string]: string | number | undefined;
}

export const fetchStudentsList = async (accessToken: string, role: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/${role}/allStudents`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data;
    }
    return { success: false, error: "An unknown error occurred." };
  }
};

export const deleteStudent = async (
  accessToken: string,
  studentId: number,
  role: string
) => {
  try {
    const response = await axios.delete(
      `${BASE_URL}/${role}/user/${studentId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
    throw { success: false, error: "An unknown error occurred." };
  }
};

export const createStudent = async (
  accessToken: string,
  data: registerUserInterface,
  role: string
) => {
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
      `${BASE_URL}/${role}/createStudent`,
      filteredData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data;
    }
    return { success: false, error: "An unknown error occurred." };
  }
};
export const updateStudent = async (
  accessToken: string,
  data: registerUserInterface,
  userId: number,
  role: string
) => {
  try {
    //removed null values
    const filteredData: MyObject = {};
    Object.keys(data).forEach((key) => {
      const value = data[key as keyof registerUserInterface];
      if (value !== null && value !== "") {
        filteredData[key] = value;
      }
    });

    const response = await axios.put(
      `${BASE_URL}/${role}/user/${userId}`,
      filteredData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data;
    }
    return { success: false, error: "An unknown error occurred." };
  }
};

export const getFacultyHodList = async (accessToken: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/student/facultyAndHodList`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data;
    }
    return { success: false, error: "An unknown error occurred." };
  }
};
