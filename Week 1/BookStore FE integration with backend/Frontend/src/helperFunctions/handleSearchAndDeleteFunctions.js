import axios from "axios";
import { fetchAllData } from "./showFunctions";

const searchBookById = async (setData, form) => {
  try {
    const { data } = await axios.get("http://localhost:3000/books", {
      params: { id: form.bookId },
    });

    if (data.length == 0) {
      console.log("No Data Found");
      return;
    }

    setData(data);
  } catch (error) {
    console.log("Error : ", error);
  }
};

const searchBookByName = async (setData, form) => {
  try {
    const { data } = await axios.get(`http://localhost:3000/books`, {
      params: { bookName: form.bookName },
    });

    if (!data.length) {
      console.log("No data found");
      return;
    }
    setData(data);
  } catch (err) {
    console.log("Error:", err);
  }
};

const searchByNameandAuthor = async (setData, form) => {
  try {
    const { data } = await axios.get(`http://localhost:3000/books`, {
      params: { bookName: form.bookName, bookAuthor: form.author },
    });

    if (!data.length) {
      console.log("No data found");
      return;
    }
    setData(data);
  } catch (err) {
    console.log("Error:", err);
  }
};

const deleteByid = async (form,setData) => {
  try {
   await axios.delete(
      `http://localhost:3000/books/${form.bookId}`
    );
    
    fetchAllData(setData)
    
  } catch (error) {
    console.log("Error : ", error);
  }
};

const deleteByBookName = async (form,setData) => {
  try {
    const { data } = await axios.get(`http://localhost:3000/books`, {
      params: { bookName: form.bookName },
    });

    if (!data.length) {
      console.log("No data found");
      return;
    }
    const bookId = data[0].id;
    await axios.delete(`http://localhost:3000/books/${bookId}`);
    fetchAllData(setData);
    return;
  } catch (error) {
    console.log("Error : ", error);
  }
};

const deleteByBookDescAndAuthor = async (form,setData) => {
  try {
    const { data } = await axios.get(`http://localhost:3000/books`, {
      params: { bookAuthor: form.author, bookDesc: form.desc },
    });

    if (!data.length) {
      console.log("No data found");
      return;
    }

    const bookId = data[0].id;
    await axios.delete(`http://localhost:3000/books/${bookId}`);
    fetchAllData(setData)
    return;
  } catch (error) {
    console.log("Error : ", error);
  }
};

const deleteByBookNameAndCategory = async (form,setData) => {
  try {
    const { data } = await axios.get(`http://localhost:3000/books`, {
      params: { bookName: form.bookName, bookCategory: form.category },
    });

    if (!data.length) {
      console.log("No data found");
      return;
    }

    const bookId = data[0].id;
    await axios.delete(`http://localhost:3000/books/${bookId}`);
    fetchAllData(setData)
    return;
  } catch (error) {
    console.log("Error : ", error);
  }
};
const updateByName = async (form, setData) => {
  const oldBookName = form.oldBookName;
  const newBookName = form.newBookName;

  try {
    const { data } = await axios.get(`http://localhost:3000/books`, {
      params: { bookName: oldBookName },
    });

    if (!data.length) {
      console.log("No book found");
      return;
    }

    const bookId = data[0].id;
    let newBook = { ...data[0], bookName: newBookName };
    console.log(newBook);
    await axios.put(`http://localhost:3000/books/${bookId}`, newBook);
    fetchAllData(setData);
    return;
  } catch (error) {
    console.log("Error : ", error);
  }
};

const updateByNameAndAuthor = async (form,setData ) => {
  const oldBookName = form.oldBookName;
  const newBookName = form.newBookName;
  const oldAuthorName = form.oldAuthorName;
  const newAuthorName = form.newAuthorName;

  try {
    const { data } = await axios.get(`http://localhost:3000/books`, {
      params: { bookName: oldBookName, bookAuthor: oldAuthorName },
    });

    if (!data.length) {
      console.log("No book found");
      return;
    }

    const bookId = data[0].id;
    let newBook = {
      ...data[0],
      bookName: newBookName,
      bookAuthor: newAuthorName,
    };
    console.log(newBook);
    await axios.put(`http://localhost:3000/books/${bookId}`, newBook);
    fetchAllData(setData);

    return;
  } catch (error) {
    console.log("Error : ", error);
  }
};
const handleCreate = async (form) => {
  try {
    const { data } = await axios.get(
      `http://localhost:3000/books/${form.bookId}`
    );
    if (data) {
      console.log("Book with same id already exists");
      return;
    }
  } catch (error) {
    console.log("Error : ", error);
  }

  form = {
    ...form,
    id: form.bookId,
    bookDesc: form.desc,
    bookAuthor: form.author,
    bookCategory: form.category,
  };
  await axios.post("http://localhost:3000/books", form);
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
    await deleteByid(form,setData);
  } else if (filterId == 4) {
    await deleteByBookName(form,setData);
  } else if (filterId == 5) {
    await deleteByBookDescAndAuthor(form,setData);
  } else if (filterId == 6) {
    await deleteByBookNameAndCategory(form,setData);
  } else if (filterId == 1) {
    await updateByName(form, setData);
  } else if (filterId == 2) {
    await updateByNameAndAuthor(form, setData);
  } else if (filterId == 22) {
    await handleCreate(form,setData);
  }
  return false;
};

export default handleSearchAndDeleteFunctions;
