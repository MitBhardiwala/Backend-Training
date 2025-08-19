import axios from "axios";
import { registerUserInterface } from "../auth/authTypes";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;
interface MyObject {
  [key: string]: string | number | undefined;
}

export const getHodStats = async (accessToken: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/hod/stats`, {
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

export const fetchFacultysList = async (accessToken: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/hod/allFaculties`, {
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
export const deleteFaculty = async (accessToken: string, facultyId: number) => {
  try {
    const response = await axios.delete(`${BASE_URL}/hod/user/${facultyId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data;
    }
    return { success: false, error: "An unknown error occurred." };
  }
};

export const createFaculty = async (
  accessToken: string,
  data: registerUserInterface
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
      `${BASE_URL}/hod/createFaculty`,
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
    if (axios.isAxiosError(error) && error.response && error.response.data) {
      return error.response.data;
    }

    return { success: false, error: "An unknown error occurred." };
  }
};

export const updateFaculty = async (
  accessToken: string,
  data: registerUserInterface,
  facultyId: number
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
      `${BASE_URL}/hod/user/${facultyId}`,
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
