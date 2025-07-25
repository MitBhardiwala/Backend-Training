import { Book } from "../../models/book.js"
import { globalErrorHandler } from "../../utils/errorHandler.js";

export const fetchAllBooksData = async (req, res) => {
  try {
    const allBooksData = await Book.find();
    res.status(200).json({
      success: true,
      message: "Data fetched successfully",
      total_books: allBooksData.length,
      data: allBooksData,
    });
  } catch (error) {
    console.log("Error in fetching alls books data : ", error);
    error.errorInfo = "Error in fetching books data";
    globalErrorHandler(error, res);
  }
};



export const fetchBooksHavingMoreThan100Pages = async (req, res) => {
  try {
    const bookData = await Book.find({ no_of_page: { $gte: 100 } });

    if (bookData.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No book found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Book details fetched successfully",
      total_books: bookData.length,
      data: bookData,
    });
  } catch (error) {
    console.log("Error in fetching Book data : ", error);
    error.errorInfo = "Error in fetching Book Data";
    globalErrorHandler(error, res);
  }
};

export const fetchAllBooksHavingPagesBetween25And90 = async (req, res) => {
  try {
    const bookData = await Book.find({ no_of_page: { $gte: 25, $lte: 90 } });

    if (bookData.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No book found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Book details fetched successfully",
      total_books: bookData.length,
      data: bookData,
    });
  } catch (error) {
    console.log("Error in fetching Book data : ", error);
    error.errorInfo = "Error in fetching Book Data";
    globalErrorHandler(error, res);
  }
};

export const fetchAllBooksHavingPagesBetween25And90Not80 = async (req, res) => {
  try {
    const bookData = await Book.find({
      no_of_page: { $gte: 25, $lte: 90, $ne: 80 },
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
      total_books: bookData.length,
      data: bookData,
    });
  } catch (error) {
    console.log("Error in fetching Book data : ", error);
    error.errorInfo = "Error in fetching Book Data";
    globalErrorHandler(error, res);
  }
};

export const fetchBooksHavingZeroPages = async (req, res) => {
  try {
    const bookData = await Book.find({
      no_of_page: { $eq: 0 },
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
      total_books: bookData.length,
      data: bookData,
    });
  } catch (error) {
    console.log("Error in fetching Book data : ", error);
    error.errorInfo = "Error in fetching Book Data";
    globalErrorHandler(error, res);
  }
};

export const fetchAllBooksBetweenYear2001And2015 = async (req, res) => {
  try {
    const bookData = await Book.find({
      release_year: { $gte: 2001, $lte: 2015 },
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
      total_books: bookData.length,
      data: bookData,
    });
  } catch (error) {
    console.log("Error in fetching Book data : ", error);
    error.errorInfo = "Error in fetching Book Data";
    globalErrorHandler(error, res);
  }
};
export const fetchBooksSortedByName = async (req, res) => {
  try {
    const bookData = await Book.find().sort({ name: 1 });

    if (bookData.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No book found",
      });
    }

    bookData.sort((book1, book2) => book1.name.localeCompare(book2.name));

    res.status(200).json({
      success: true,
      message: "Book details fetched successfully",
      total_books: bookData.length,
      data: bookData,
    });
  } catch (error) {
    console.log("Error in fetching Book data : ", error);
    error.errorInfo = "Error in fetching Book Data";
    globalErrorHandler(error, res);
  }
};
export const fetchBooksSortedByPrice = async (req, res) => {
  try {
    const bookData = await Book.find().sort({ price: 1 });

    if (bookData.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No book found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Book details fetched successfully",
      total_books: bookData.length,
      data: bookData,
    });
  } catch (error) {
    console.log("Error in fetching Book data : ", error);
    error.errorInfo = "Error in fetching Book Data";
    globalErrorHandler(error, res);
  }
};
export const fetchBooksSortedByAuthor = async (req, res) => {
  try {
    const bookData = await Book.find().sort({ author: 1 });

    if (bookData.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No book found",
      });
    }
    bookData.sort((book1, book2) => book1.author.localeCompare(book2.author));

    res.status(200).json({
      success: true,
      message: "Book details fetched successfully",
      total_books: bookData.length,
      data: bookData,
    });
  } catch (error) {
    console.log("Error in fetching Book data : ", error);
    error.errorInfo = "Error in fetching Book Data";
    globalErrorHandler(error, res);
  }
};

export const fetchBooksSortedByPage = async (req, res) => {
  try {
    const bookData = await Book.find().sort({ no_of_page: 1 });

    if (bookData.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No book found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Book details fetched successfully",
      total_books: bookData.length,
      data: bookData,
    });
  } catch (error) {
    console.log("Error in fetching Book data : ", error);
    error.errorInfo = "Error in fetching Book Data";
    globalErrorHandler(error, res);
  }
};

export const fetchBooksSortedByCategory = async (req, res) => {
  try {
    const bookData = await Book.find().sort({ category: 1 });

    if (bookData.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No book found",
      });
    }
    bookData.sort((book1, book2) =>
      book1.category.localeCompare(book2.category)
    );
    res.status(200).json({
      success: true,
      message: "Book details fetched successfully",
      total_books: bookData.length,
      data: bookData,
    });
  } catch (error) {
    console.log("Error in fetching Book data : ", error);
    error.errorInfo = "Error in fetching Book Data";
    globalErrorHandler(error, res);
  }
};
export const fetchBooksSortedByReleaseYear = async (req, res) => {
  try {
    const bookData = await Book.find().sort({ release_year: 1 });

    if (bookData.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No book found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Book details fetched successfully",
      total_books: bookData.length,
      data: bookData,
    });
  } catch (error) {
    console.log("Error in fetching Book data : ", error);
    error.errorInfo = "Error in fetching Book Data";
    globalErrorHandler(error, res);
  }
};