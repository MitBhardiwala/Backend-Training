import axios from "axios";
import { fetchAllData } from "./showFunctions";
import toast from "react-hot-toast";

const base_url = import.meta.env.VITE_API_URL;

const searchBookById = async (setData, form) => {
  try {
    const { data } = await axios.post(`${base_url}/books/get-book-by-id`, {
      id: form.id,
    });

    toast.success(data.message);
    setData([{ ...data.data }]);
  } catch (error) {
    console.log("Error : ", error);
    toast.error(error.response.data.message);
  }
};

const searchBookByName = async (setData, form) => {
  try {
    const { data } = await axios.post(`${base_url}/books/get-book-by-name`, {
      name: form.name,
    });

    toast.success(data.message);
    setData(data.data);
  } catch (error) {
    console.log("Error : ", error);
    toast.error(error.response.data.message);
  }
};

const searchByNameandAuthor = async (setData, form) => {
  try {
    const { data } = await axios.post(
      `${base_url}/books/get-book-by-name-and-author`,
      {
        name: form.name,
        author: form.author,
      }
    );

    toast.success(data.message);
    setData(data.data);
  } catch (error) {
    console.log("Error : ", error);
    toast.error(error.response.data.message);
  }
};

const deleteByid = async (form, setData) => {
  try {
    const { data } = await axios.delete(`${base_url}/books/delete-by-id`, {
      data: form,
    });

    toast.success(data.message);
    fetchAllData(setData);
  } catch (error) {
    console.log("Error : ", error);
    toast.error(error.response.data.message);
  }
};

const deleteByBookName = async (form, setData) => {
  try {
    const { data } = await axios.delete(`${base_url}/books/delete-by-name`, {
      data: form,
    });

    toast.success(data.message);
    fetchAllData(setData);
  } catch (error) {
    console.log("Error : ", error);
    toast.error(error.response.data.message);
  }
};

const deleteByBookDescAndAuthor = async (form, setData) => {
  try {
    const { data } = await axios.delete(
      `${base_url}/books/delete-by-author-and-desc`,
      {
        data: form,
      }
    );

    toast.success(data.message);
    fetchAllData(setData);
  } catch (error) {
    console.log("Error : ", error);
    toast.error(error.response.data.message);
  }
};

const deleteByBookNameAndCategory = async (form, setData) => {
  try {
    const { data } = await axios.delete(
      `${base_url}/books/delete-by-name-and-category`,
      {
        data: form,
      }
    );

    toast.success(data.message);
    fetchAllData(setData);
  } catch (error) {
    console.log("Error : ", error);
    toast.error(error.response.data.message);
  }
};
const updateByName = async (form, setData) => {
  try {
    const { data } = await axios.put(
      `${base_url}/books/update-book-by-name`,
      form
    );

    toast.success(data.message);
    fetchAllData(setData);
  } catch (error) {
    console.log("Error : ", error);
    toast.error(error.response.data.message);
  }
};

const updateByNameAndAuthor = async (form, setData) => {
  try {
    const { data } = await axios.put(
      `${base_url}/books/update-book-by-name-and-author`,
      form
    );

    toast.success(data.message);
    fetchAllData(setData);
  } catch (error) {
    console.log("Error : ", error);
    toast.error(error.response.data.message);
  }
};
const handleCreate = async (form, setData) => {
  try {
    const { data } = await axios.post(
      `${base_url}/books/add-book`,
      form
    );

    toast.success(data.message);
    fetchAllData(setData);
  } catch (error) {
    console.log("Error : ", error);
    toast.error(error.response.data.message);
  }
};

const handleSearchAndDeleteFunctions = async (filterId, setData, form) => {
  for (let key in form) {
    form[key] = form[key].trim();
  }

  if (filterId == 8) {
    await searchBookById(setData, form);
  } else if (filterId == 9) {
    await searchBookByName(setData, form);
  } else if (filterId == 10) {
    await searchByNameandAuthor(setData, form);
  } else if (filterId == 3) {
    await deleteByid(form, setData);
  } else if (filterId == 4) {
    await deleteByBookName(form, setData);
  } else if (filterId == 5) {
    await deleteByBookDescAndAuthor(form, setData);
  } else if (filterId == 6) {
    await deleteByBookNameAndCategory(form, setData);
  } else if (filterId == 1) {
    await updateByName(form, setData);
  } else if (filterId == 2) {
    await updateByNameAndAuthor(form, setData);
  } else if (filterId == 22) {
    await handleCreate(form, setData);
  }
  return false;
};

export default handleSearchAndDeleteFunctions;
