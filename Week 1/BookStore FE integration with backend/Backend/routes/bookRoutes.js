import express from "express";
import {
  addBookController,
  fetchAllBooksData,
  fetchBookById,
  fetchBookByName,
  fetchBookByNameAndAuthor,
  fetchBooksHavingMoreThan100Pages,
  fetchAllBooksHavingPagesBetween25And90,
  fetchAllBooksHavingPagesBetween25And90Not80,
  fetchBooksHavingZeroPages,
  fetchAllBooksBetweenYear2001And2015,
  fetchBooksSortedByName,
  fetchBooksSortedByPrice,
  fetchBooksSortedByAuthor,
  fetchBooksSortedByPage,
  fetchBooksSortedByCategory,
  fetchBooksSortedByReleaseYear,
  deleteBookById,
  deleteBookByIdAndName,
  deleteBookByAuthorAndDesc,
  deleteBookByNameAndCategory,
  updateBookName,
  updateBookNameAndAuthor
} from "../controllers/bookController.js";

const router = express.Router();

//post requests
router.post("/add-book", addBookController);
router.post("/get-book-by-id", fetchBookById);
router.post("/get-book-by-name", fetchBookByName);
router.post("/get-book-by-name-and-author", fetchBookByNameAndAuthor);

//get requests
router.get("/get-all-books", fetchAllBooksData);
router.get("/get-books-gt-100-pages", fetchBooksHavingMoreThan100Pages);
router.get("/get-books-equal-to-0-pages", fetchBooksHavingZeroPages);
router.get("/books-pages-bt-25-90", fetchAllBooksHavingPagesBetween25And90);
router.get(
  "/books-pages-bt-25-90-not-80",
  fetchAllBooksHavingPagesBetween25And90Not80
);
router.get(
  "/get-books-release-year-bt-2001-and-2015",
  fetchAllBooksBetweenYear2001And2015
);
router.get("/books-sort-by-name", fetchBooksSortedByName);
router.get("/books-sort-by-price", fetchBooksSortedByPrice);
router.get("/books-sort-by-author", fetchBooksSortedByAuthor);
router.get("/books-sort-by-page", fetchBooksSortedByPage);
router.get("/books-sort-by-category", fetchBooksSortedByCategory);
router.get("/books-sort-by-release-year", fetchBooksSortedByReleaseYear);

//delete request
router.delete("/delete-by-id",deleteBookById)
router.delete("/delete-by-id-and-name",deleteBookByIdAndName)
router.delete("/delete-by-author-and-desc",deleteBookByAuthorAndDesc)
router.delete("/delete-by-name-and-category",deleteBookByNameAndCategory)

//update request
router.put("/update-book-by-name",updateBookName)
router.put("/update-book-by-name-and-author",updateBookNameAndAuthor)

export default router;
