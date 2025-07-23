import express from "express";
import { addTodo, deletTodoById, getAllTodos, getTodoById, updateTodoById } from "../controllers/todoController.js";

const router = express.Router();

//get all todos
router.get("", getAllTodos);

//get todo by id
router.get("/:id", getTodoById);

//add todo
router.post("/add", addTodo);

//delete todo
router.delete("/delete/:id", deletTodoById);

router.put("/update/:id", updateTodoById);

export default router;
