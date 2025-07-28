import { Book } from "../../models/book.js"
import { API_MESSAGES } from "../../utils/constants.js";
import { globalErrorHandler } from "../../utils/errorHandler.js";


export const addBookController = async (req, res) => {
  try {
    const bookData = req.body;

    const newBook = new Book(bookData);
    await newBook.save();

    res.status(201).json({
      success: true,
      message: API_MESSAGES.SUCCESS.BOOK_ADDED,
      data: newBook,
    });
  } catch (error) {
    console.log("Error in adding book : ", error);
    error.errorInfo = API_MESSAGES.ERROR.BOOK_NOT_ADDED
    globalErrorHandler(error, res);
  }
};