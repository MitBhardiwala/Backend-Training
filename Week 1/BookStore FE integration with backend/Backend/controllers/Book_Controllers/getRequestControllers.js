import e from "express";
import { Book } from "../../models/book.js";
import { API_MESSAGES } from "../../utils/constants.js";
import { globalErrorHandler } from "../../utils/errorHandler.js";

export const getBooks = async (req, res) => {
  try {
    const { sortBy = "name", order = 1, searchTerm, gt, lt, ne, eq, _id, name, author } = req.query;

    let query = {};
    if (_id) query._id = _id;
    if (name) query.name = name;
    if (author) query.author = author;

    if (searchTerm) {
      const filterOptions = {};
      if (gt) filterOptions.$gt = Number(gt);
      if (lt) filterOptions.$lt = Number(lt);
      if (ne) filterOptions.$ne = Number(ne);
      if (eq) filterOptions.$eq = Number(eq);

      if (Object.keys(filterOptions).length > 0) {
        query[searchTerm] = filterOptions;
      }
    }

    const Books = await Book.find(query).sort({ [sortBy]: Number(order) });
    res.status(200).json({
      success: true,
      message: Books.length ? API_MESSAGES.SUCCESS.BOOKS_FETCHED: API_MESSAGES.SUCCESS.BOOK_NOT_FOUND,
      data: Books.length ? Books : [],
    });
  } catch (error) {
    console.log("Error in fetching all books data: ", error);
    error.errorInfo = API_MESSAGES.ERROR.BOOKS_NOT_FETCHED;
    globalErrorHandler(error, res);
  }
};

