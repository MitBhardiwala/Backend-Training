import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const base_url = import.meta.env.VITE_API_URL;

const getSortedBooks = async (param) => {
  try {
    const data = await axios.get(`${base_url}/books/get-all-books`);
    return data;
  } catch (error) {
    console.log("Error in fetching data : ", error);
  }
};

async function sort(setData, param) {
  let response = await getSortedBooks(param);
  setData(response.data);
}

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

function handleSortOptions(id, setData) {
  if (id == 17) {
    // sort(setData, "bookPrice");
    sortBookByPrice(setData);
  } else if (id == 19) {
    sort(setData, "noOfPage");
  } else if (id == 21) {
    sort(setData, "releasedYear");
  } else if (id == 16) {
    sort(setData, "bookName");
  } else if (id == 20) {
    sort(setData, "bookCategory");
  } else if (id == 18) {
    sort(setData, "bookAuthor");
  }
}

export default handleSortOptions;
