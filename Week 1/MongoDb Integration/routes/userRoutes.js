import express from "express";
import { addUser, deleteUser, fetchAllUsers, fetchUserData, updateUser } from "../controllers/userControllers.js";
import { emailValidationMiddleware } from "../middlewares/emailValidationMiddleware.js";

const router = express.Router();

//routes defined or crud operations
router.get("/get-all-users",fetchAllUsers)
router.get("/get-user",emailValidationMiddleware,fetchUserData)
router.post("/add",addUser);
router.put("/update-user",emailValidationMiddleware,updateUser)
router.delete("/delete-user",emailValidationMiddleware,deleteUser)


export default router;