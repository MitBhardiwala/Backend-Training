import express from "express";
import { getBooks } from "../controllers/Book_Controllers/getRequestControllers.js";
import { addBookController } from "../controllers/Book_Controllers/postRequestControllers.js";
import { deleteBook } from "../controllers/Book_Controllers/deleteRequestControllers.js";
import { updateBook } from "../controllers/Book_Controllers/updateRequestControllers.js";

const router = express.Router();

//post requests
router.post("/add-book", addBookController);

//get requests
router.get("/", getBooks);

//delete request
router.delete("/", deleteBook);

//update request
router.put("/", updateBook);

export default router;
