import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const base_url = import.meta.env.VITE_API_URL;

const sortBookByPrice = async (setData) => {
  try {
    const { data } = await axios.get(`${base_url}/books`, {
      params: {
        sortBy: "price",
      },
    });

    toast.success(data.message);
    setData(data.data);
  } catch (error) {
    console.log("Error : ", error);
    toast.error(error.response.data.message);
  }
};

const sortBookByPage = async (setData) => {
  try {
    const { data } = await axios.get(`${base_url}/books`, {
      params: {
        sortBy: "page",
      },
    });

    toast.success(data.message);
    setData(data.data);
  } catch (error) {
    console.log("Error : ", error);
    toast.error(error.response.data.message);
  }
};

const sortBookByYear = async (setData) => {
  try {
    const { data } = await axios.get(`${base_url}/books`, {
      params: {
        sortBy: "year",
      },
    });

    toast.success(data.message);
    setData(data.data);
  } catch (error) {
    console.log("Error : ", error);
    toast.error(error.response.data.message);
  }
};

const sortBookByName = async (setData) => {
  try {
    const { data } = await axios.get(`${base_url}/books`, {
      params: {
        sortBy: "name",
      },
    });

    toast.success(data.message);
    setData(data.data);
  } catch (error) {
    console.log("Error : ", error);
    toast.error(error.response.data.message);
  }
};

const sortBookByCategory = async (setData) => {
  try {
    const { data } = await axios.get(`${base_url}/books`, {
      params: {
        sortBy: "category",
      },
    });

    toast.success(data.message);
    setData(data.data);
  } catch (error) {
    console.log("Error : ", error);
    toast.error(error.response.data.message);
  }
};

const sortBookByAuthor = async (setData) => {
  try {
    const { data } = await axios.get(`${base_url}/books`, {
      params: {
        sortBy: "author",
      },
    });

    toast.success(data.message);
    setData(data.data);
  } catch (error) {
    console.log("Error : ", error);
    toast.error(error.response.data.message);
  }
};

function handleSortOptions(id, setData) {
  if (id == 17) {
    sortBookByPrice(setData);
  } else if (id == 19) {
    sortBookByPage(setData);
  } else if (id == 21) {
    sortBookByYear(setData);
  } else if (id == 16) {
    sortBookByName(setData);
  } else if (id == 20) {
    sortBookByCategory(setData);
  } else if (id == 18) {
    sortBookByAuthor(setData);
  }
}

export default handleSortOptions;
