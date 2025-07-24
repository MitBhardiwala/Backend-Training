import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const base_url = import.meta.env.VITE_API_URL;

export const fetchAllData = (setData) => {
  const fetchData = async () => {
    try {
      let { data } = await axios.get(`${base_url}/books/get-all-books`);

      toast.success(data.message);
      setData(data.data);
    } catch (error) {
      console.log("Error : ", error);
      toast.error(error.response.data.message);
    }
  };

  fetchData();
};

const showMoreThan100 = async (setData) => {
  try {
    const { data } = await axios.get(
      `${base_url}/books/get-books-gt-100-pages`
    );

    toast.success(data.message);
    setData(data.data);
  } catch (error) {
    console.log("Error:", error);
    toast.error(error.response.data.message);
  }
};

const showBetween25and90 = async (setData) => {
  try {
    const { data } = await axios.get(`${base_url}/books/books-pages-bt-25-90`);

    toast.success(data.message);
    setData(data.data);
  } catch (error) {
    console.log("Error:", error);
    toast.error(error.response.data.message);
  }
};

const showBetween25and80 = async (setData) => {
  try {
    const { data } = await axios.get(
      `${base_url}/books/books-pages-bt-25-90-not-80`
    );

    toast.success(data.message);
    setData(data.data);
  } catch (error) {
    console.log("Error:", error);
    toast.error(error.response.data.message);
  }
};

const showZeroPageBooks = async (setData) => {
  try {
    const { data } = await axios.get(
      `${base_url}/books/get-books-equal-to-0-pages`
    );

    toast.success(data.message);
    setData(data.data);
  } catch (error) {
    console.log("Error:", error);
    toast.error(error.response.data.message);
  }
};

const showBetweenYear2001and2015 = async (setData) => {
  try {
    const { data } = await axios.get(
      `${base_url}/books/get-books-release-year-bt-2001-and-2015`
    );
    toast.success(data.message);
    setData(data.data);
  } catch (error) {
    console.log("Error:", error);
    toast.error(error.response.data.message);
  }
};

function handleShowFunctions(id, setData) {
  if (id == 7) {
    fetchAllData(setData);
  } else if (id == 11) {
    showMoreThan100(setData);
  } else if (id == 12) {
    showBetween25and90(setData);
  } else if (id == 13) {
    showBetween25and80(setData);
  } else if (id == 14) {
    showZeroPageBooks(setData);
  } else if (id == 15) {
    showBetweenYear2001and2015(setData);
  }
}

export default handleShowFunctions;
