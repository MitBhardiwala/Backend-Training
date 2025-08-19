import axios from "axios";
import { registerUserInterface } from "../auth/authTypes";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;
interface MyObject {
  [key: string]: string | number | undefined;
}

export const getAdminStats = async (accessToken: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/admin/stats`, {
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

export const fetchHodsList = async (accessToken: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/admin/allHods`, {
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
export const deleteHod = async (accessToken: string, facultyId: number) => {
  try {
    const response = await axios.delete(`${BASE_URL}/admin/user/${facultyId}`, {
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

export const createHod = async (
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
      `${BASE_URL}/admin/createHod`,
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

export const updateHod = async (
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
      `${BASE_URL}/admin/user/${facultyId}`,
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
