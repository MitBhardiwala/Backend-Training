import { Book } from "../../models/book.js"
import { globalErrorHandler } from "../../utils/errorHandler.js";


export const fetchBookById = async (req, res) => {
  try {
    const body = req.body;

    console.log(body);

    if (!body?.id || !body.id.trim()) {
      return res.status(400).json({
        success: false,
        message: "Id not found",
      });
    }

    const bookData = await Book.findById(body.id.trim());

    if (!bookData) {
      return res.status(404).json({
        success: false,
        message: "No book found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Book details fetched successfully",
      data: bookData,
    });
  } catch (error) {
    console.log("Error in fetching Book data : ", error);
    error.errorInfo = "Error in fetching Book Data";
    globalErrorHandler(error, res);
  }
};

export const fetchBookByName = async (req, res) => {
  try {
    const body = req.body;

    if (!body?.name) {
      return res.status(400).json({
        success: false,
        message: "Name not found",
      });
    }

    const bookData = await Book.find({
      name: { $regex: body.name, $options: "i" },
    });

    if (bookData.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No book found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Book details fetched successfully",
      data: bookData,
    });
  } catch (error) {
    console.log("Error in fetching Book data : ", error);
    error.errorInfo = "Error in fetching Book Data";
    globalErrorHandler(error, res);
  }
};

export const fetchBookByNameAndAuthor = async (req, res) => {
  try {
    const body = req.body;

    if (!body?.name || !body?.author) {
      return res.status(400).json({
        success: false,
        message: "Name or Author not found",
      });
    }
    //searches for casse insensitive data also
    const bookData = await Book.find({
      name: { $regex: body.name, $options: "i" },
      author: { $regex: body.author, $options: "i" },
    });

    if (bookData.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No book found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Book details fetched successfully",
      data: bookData,
    });
  } catch (error) {
    console.log("Error in fetching Book data : ", error);
    error.errorInfo = "Error in fetching Book Data";
    globalErrorHandler(error, res);
  }
};

export const addBookController = async (req, res) => {
  try {
    const bookData = req.body;

    const newBook = new Book(bookData);
    await newBook.save();

    res.status(201).json({
      success: true,
      message: "Book has been added successfully",
      data: newBook,
    });
  } catch (error) {
    console.log("Error in adding book : ", error);
    error.errorInfo = "Error in adding book";
    globalErrorHandler(error, res);
  }
};