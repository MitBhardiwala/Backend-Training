import axios from "axios";
import { UpdatedUserType } from "../../definitions";
import { registerUserInterface } from "../auth/authTypes";

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
    return response.data.data;
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

export const updateUserProfile = async (
  accessToken: string,
  user: UpdatedUserType
) => {
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

export const getLeaveRequests = async (
  accessToken: string,
  role: string,
  status: "pending" | "approved" | "rejected" | null
) => {
  try {
    const response = await axios.get(`${BASE_URL}/${role}/leaveRequests`, {
      params: {
        status: status,
      },
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

export const getAllUsers = async (
  accessToken: string,
  filterOptions: {
    roleName?: string;
    department?: string;
  }
) => {
  try {
    const response = await axios.get(`${BASE_URL}/user/all`, {
      params: filterOptions,
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

export const deleteUser = async (
  accessToken: string,
  userId: number,
  managerRole: string
) => {
  try {
    const response = await axios.delete(
      `${BASE_URL}/${managerRole}/user/${userId}`,
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

export const updateUser = async (
  accessToken: string,
  userId: number,
  managerRole: string,
  data: registerUserInterface
) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/${managerRole}/user/${userId}`,
      data,
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
