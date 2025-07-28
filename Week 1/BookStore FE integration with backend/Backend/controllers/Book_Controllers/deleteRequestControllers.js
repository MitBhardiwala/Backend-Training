import { globalErrorHandler } from "../../utils/errorHandler.js";
import { Book } from "../../models/book.js";
import { API_MESSAGES } from "../../utils/constants.js";

export const deleteBook = async (req, res) => {
  try {
    const query = req.query;

    if (!Object.keys(query).length) {
      return res.status(400).json({
        success: false,
        message: API_MESSAGES.VALIDATION.NO_PARAMETER_FOUND,
      });
    }

    const deletedBook = await Book.findOneAndDelete(req.query);

    res.status(200).json({
      success: true,
      message: deletedBook
        ? API_MESSAGES.SUCCESS.BOOK_DELETED
        : API_MESSAGES.SUCCESS.BOOK_NOT_FOUND,
      data: deletedBook ? deletedBook : [],
    });
  } catch (error) {
    console.log("Error in deleting book : ", error);
    (error.errorInfo = API_MESSAGES.ERROR.BOOK_NOT_DELETED),
      globalErrorHandler(error, res);
  }
};
