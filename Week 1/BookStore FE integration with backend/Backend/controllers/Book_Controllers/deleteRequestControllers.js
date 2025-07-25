import { globalErrorHandler } from "../../utils/errorHandler.js";
import { Book } from "../../models/book.js"

export const deleteBookById = async (req, res) => {
  try {
    const body = req.body;

    if (!body?.id) {
      return res.status(400).json({
        success: false,
        message: "Id not found",
      });
    }

    const deletedBook = await Book.findByIdAndDelete(body.id);

    if (!deletedBook) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Book deleted successfully",
      data: deletedBook,
    });
  } catch (error) {
    console.log("Error in deleting book : ", error);
    error.errorInfo = "Error in deleting Book";
    globalErrorHandler(error, res);
  }
};
export const deleteBookByName = async (req, res) => {
  try {
    const body = req.body;

    if (!body?.name) {
      return res.status(400).json({
        success: false,
        message: "Name not found",
      });
    }

    const deletedBook = await Book.findOneAndDelete({ name: body.name });

    if (!deletedBook) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Book deleted successfully",
      data: deletedBook,
    });
  } catch (error) {
    console.log("Error in deleting book : ", error);
    error.errorInfo = "Error in deleting Book";
    globalErrorHandler(error, res);
  }
};
export const deleteBookByIdAndName = async (req, res) => {
  try {
    const body = req.body;

    if (!body?.id || !body?.name) {
      return res.status(400).json({
        success: false,
        message: "Id or name not found",
      });
    }

    const deletedBook = await Book.findOneAndDelete({
      _id: body.id,
      name: body.name,
    });

    if (!deletedBook) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Book deleted successfully",
      data: deletedBook,
    });
  } catch (error) {
    console.log("Error in deleting book : ", error);
    error.errorInfo = "Error in deleting Book";
    globalErrorHandler(error, res);
  }
};
export const deleteBookByAuthorAndDesc = async (req, res) => {
  try {
    const body = req.body;

    if (!body?.author || !body?.description) {
      return res.status(400).json({
        success: false,
        message: "Author or Description not found",
      });
    }

    const deletedBook = await Book.deleteMany({
      author: body.author,
      description: body.description,
    });

    if (deletedBook.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Book deleted successfully",
      data: deletedBook,
    });
  } catch (error) {
    console.log("Error in deleting book : ", error);
    error.errorInfo = "Error in deleting Book";
    globalErrorHandler(error, res);
  }
};
export const deleteBookByNameAndCategory = async (req, res) => {
  try {
    const body = req.body;

    if (!body?.name || !body?.category) {
      return res.status(400).json({
        success: false,
        message: "Name or Category not found",
      });
    }

    const deletedBook = await Book.deleteMany({
      name: body.name,
      category: body.category,
    });

    if (deletedBook.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Book deleted successfully",
      data: deletedBook,
    });
  } catch (error) {
    console.log("Error in deleting book : ", error);
    error.errorInfo = "Error in deleting Book";
    globalErrorHandler(error, res);
  }
};
