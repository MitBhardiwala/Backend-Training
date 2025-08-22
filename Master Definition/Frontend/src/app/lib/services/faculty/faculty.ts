import axios from "axios";
import { registerUserInterface } from "../auth/authTypes";
import { MyObject } from "../../definitions";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;

export const getHodList = async (accessToken: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/faculty/hodList`, {
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

export const fetchFacultysList = async (accessToken: string, role: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/${role}/allFaculties`, {
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
export const deleteFaculty = async (
  accessToken: string,
  facultyId: number,
  role: string
) => {
  try {
    const response = await axios.delete(
      `${BASE_URL}/${role}/user/${facultyId}`,
      {
        headers: {
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

export const createFaculty = async (
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
      `${BASE_URL}/${role}/createFaculty`,
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
  facultyId: number,
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
      `${BASE_URL}/${role}/user/${facultyId}`,
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
