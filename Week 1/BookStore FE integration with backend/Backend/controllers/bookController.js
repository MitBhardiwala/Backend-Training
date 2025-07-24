import { Book } from "../models/book.js";

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

export const fetchBookById = async (req, res) => {
  try {
    const body = req.body;

    if (!body?.id) {
      res.status(400).json({
        success: false,
        message: "Id not found",
      });
    }

    const bookData = await Book.findById(body.id);

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

    const bookData = await Book.find({ name: body.name });

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

    const bookData = await Book.find({ name: body.name, author: body.author });

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

    if (!body?.author || !body?.desc) {
      return res.status(400).json({
        success: false,
        message: "Author or Description not found",
      });
    }

    const deletedBook = await Book.deleteMany({
      author: body.author,
      description: body.desc,
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

export const updateBookName = async (req,res) => {
  try {
    const body = req.body;
    if (!body?.newName || !body?.oldName || !body.oldName.trim() || !body.newName.trim()) {
      return res.status(400).json({
        success: false,
        message: "New Name or Old name not found",
      });
    }


    const updatedBook = await Book.findOneAndUpdate({ name: body.oldName },
        {$set:{name:body.newName}},
        {new:true}
    );


    if(!updatedBook){
        return res.status(404).json({
            success:false,
            message:"No Book Found"
        })
    }

    res.status(200).json({
        success:true,
        message:"Book data updated successfully",
        data:updatedBook
    })


  } catch (error) {
    console.log("Error in updating book data :", error);
    error.errorInfo="Error in updating book";
    globalErrorHandler(error, res);
  }
};
export const updateBookNameAndAuthor = async (req,res) => {
  try {
    const body = req.body;

    console.log(body)
    if (!body?.newBookName || !body?.oldBookName || !body?.oldAuthorName || !body?.newAuthorName) {
      return res.status(400).json({
        success: false,
        message: "Book Name or Author not found",
      });
    }
    if (!body.newBookName.trim() || !body.oldBookName.trim() || !body.oldAuthorName.trim() || !body.newAuthorName.trim()) {
      return res.status(400).json({
        success: false,
        message: "Book name or author cannot be empty",
      });
    }


    const updatedBook = await Book.findOneAndUpdate({ name: body.oldBookName ,author:body.oldAuthorName},
        {$set:{name:body.newBookName,author:body.newAuthorName}},
        {new:true}
    );


    if(!updatedBook){
        return res.status(404).json({
            success:false,
            message:"No Book Found"
        })
    }

    res.status(200).json({
        success:true,
        message:"Book data updated successfully",
        data:updatedBook
    })


  } catch (error) {
    console.log("Error in updating book data :", error);
    error.errorInfo="Error in updating book";
    globalErrorHandler(error, res);
  }
};



const errorHandler = (err, res) => {
  err.statusCode = err.statusCode || 500;
  (err.message = err.message || "Internal server occured"),
    (err.errorInfo = err.errorInfo || "Something went wrong");
  return res.status(err.statusCode).json({
    success: false,
    message: err.message,
    error: err.errorInfo,
  });
};

const globalErrorHandler = (err, res) => {
  if (err.code === 11000) {
    const value = err.message.match(/(["'])(\\?.)*?\1/)[0];
    const message = `field value:${value} aleady exist. please use another`;
    err.message = message;
    err.statusCode = 400;

    errorHandler(err, res);
    console.log("Duplicate data error");
  } else if (err.name === "ValidationError") {
    const errors = Object.values(err.errors).map((el) => el.message);
    const message = `Invalid input data. ${errors.join(". ")}`;
    err.message = message;
    err.statusCode = 400;
    errorHandler(err, res);
    console.log("Validation error");
  } else if (err.name === "CastError") {
    const message = `Invalid ${err.path}: ${err.value}.`;
    err.message = message;
    err.statusCode = 400;
    errorHandler(err, res);
    console.log("Casting error");
  } else {
    errorHandler(err, res);
  }
};
