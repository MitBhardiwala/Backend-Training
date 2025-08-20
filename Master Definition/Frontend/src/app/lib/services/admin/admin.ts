import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;

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

