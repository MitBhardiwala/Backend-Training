import { Book } from "../../models/book.js";
import { API_MESSAGES } from "../../utils/constants.js";
import { globalErrorHandler } from "../../utils/errorHandler.js";

export const updateBook = async (req, res) => {
  try {
    const { oldName, newName, oldAuthorName, newAuthorName } = req.query;

    let oldData = {};
    let newData = {};

    if (!oldName || !newName) {
      return res.status(400).json({
        success: false,
        message: API_MESSAGES.VALIDATION.NO_PARAMETER_FOUND,
      });
    }

    if (oldName) oldData.name = oldName;
    if (newName) newData.name = newName;
    if (oldAuthorName) oldData.author = oldAuthorName;
    if (newAuthorName) newData.author = newAuthorName;

    const updatedBook = await Book.findOneAndUpdate(
      oldData,
      { $set: newData },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: updatedBook
        ? API_MESSAGES.SUCCESS.BOOK_UPDATED
        : API_MESSAGES.SUCCESS.BOOK_NOT_FOUND,
      data: updatedBook ? updatedBook : [],
    });
  } catch (error) {
    console.log("Error in updating book :", error);
    error.errorInfo = API_MESSAGES.ERROR.BOOK_NOT_UPDATED;
    globalErrorHandler(error, res);
  }
};
