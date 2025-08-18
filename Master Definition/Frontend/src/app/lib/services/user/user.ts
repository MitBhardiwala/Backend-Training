import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;

export const getUserDetails = async (accessToken: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/user`, {
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

export const getUserLeaveBalance = async (accessToken: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/user/leaveBalance`, {
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

export const getUserDetailsById = async (id: number) => {
  try {
    const response = await axios.get(`${BASE_URL}/user/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data;
    }
    return { success: false, error: "An unknown error occurred." };
  }
};
export const getUserLeaveHistory = async (accessToken: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/user/leaveHistory`, {
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

export const applyLeave = async (
  leaveData: {
    startDate: string;
    endDate: string;
    leaveType: string;
    reason: string;
    requestToId: number;
  },
  accessToken: string
) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/student/applyLeave`,
      leaveData,
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

export const updateUserProfile = async (accessToken, user) => {
  try {
    const response = await axios.put(`${BASE_URL}/user`, user, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "multipart/form-data",
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

export const getDepartments = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/user/departments`, {});
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data;
    }
    return { success: false, error: "An unknown error occurred." };
  }
};

