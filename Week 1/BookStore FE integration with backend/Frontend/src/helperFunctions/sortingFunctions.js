import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const base_url = import.meta.env.VITE_API_URL;



const sortBookByPrice = async (setData) => {
  try {
    let { data } = await axios.get(`${base_url}/books/books-sort-by-price`);

    toast.success(data.message);
    setData(data.data);
  } catch (error) {
    console.log("Error : ", error);
    toast.error(error.response.data.message);
  }
};

const sortBookByPage = async (setData) => {
  try {
    let { data } = await axios.get(`${base_url}/books/books-sort-by-page`);

    toast.success(data.message);
    setData(data.data);
  } catch (error) {
    console.log("Error : ", error);
    toast.error(error.response.data.message);
  }
};

const sortBookByYear = async (setData) => {
  try {
    let { data } = await axios.get(
      `${base_url}/books/books-sort-by-release-year`
    );

    toast.success(data.message);
    setData(data.data);
  } catch (error) {
    console.log("Error : ", error);
    toast.error(error.response.data.message);
  }
};

const sortBookByName = async (setData) => {
  try {
    let { data } = await axios.get(`${base_url}/books/books-sort-by-name`);

    toast.success(data.message);
    setData(data.data);
  } catch (error) {
    console.log("Error : ", error);
    toast.error(error.response.data.message);
  }
};

const sortBookByCategory = async (setData) => {
  try {
    let { data } = await axios.get(`${base_url}/books/books-sort-by-category`);

    toast.success(data.message);
    setData(data.data);
  } catch (error) {
    console.log("Error : ", error);
    toast.error(error.response.data.message);
  }
};

const sortBookByAuthor = async (setData) => {
  try {
    let { data } = await axios.get(`${base_url}/books/books-sort-by-author`);

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
