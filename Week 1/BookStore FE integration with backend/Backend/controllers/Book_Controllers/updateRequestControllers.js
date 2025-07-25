import { Book } from "../../models/book.js"
import { globalErrorHandler } from "../../utils/errorHandler.js";


export const updateBookName = async (req, res) => {
  try {

    const body = req.body;
    if (
      !body?.newName ||
      !body?.oldName ||
      !body.oldName.trim() ||
      !body.newName.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "New Name or Old name not found",
      });
    }

    const updatedBook = await Book.findOneAndUpdate(
      { name: body.oldName },
      { $set: { name: body.newName } },
      { new: true }
    );

    if (!updatedBook) {
      return res.status(404).json({
        success: false,
        message: "No Book Found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Book data updated successfully",
      data: updatedBook,
    });
  } catch (error) {
    console.log("Error in updating book data :", error);
    error.errorInfo = "Error in updating book";
    globalErrorHandler(error, res);
  }
};
export const updateBookNameAndAuthor = async (req, res) => {
  try {
    const body = req.body;

    if (
      !body?.newName ||
      !body?.oldName ||
      !body?.oldAuthorName ||
      !body?.newAuthorName
    ) {
      return res.status(400).json({
        success: false,
        message: "Book Name or Author not found",
      });
    }
    if (
      !body.newName.trim() ||
      !body.oldName.trim() ||
      !body.oldAuthorName.trim() ||
      !body.newAuthorName.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "Book name or author cannot be empty",
      });
    }

    const updatedBook = await Book.findOneAndUpdate(
      { name: body.oldName, author: body.oldAuthorName },
      { $set: { name: body.newName, author: body.newAuthorName } },
      { new: true }
    );

    if (!updatedBook) {
      return res.status(404).json({
        success: false,
        message: "No Book Found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Book data updated successfully",
      data: updatedBook,
    });
  } catch (error) {
    console.log("Error in updating book data :", error);
    error.errorInfo = "Error in updating book";
    globalErrorHandler(error, res);
  }
};