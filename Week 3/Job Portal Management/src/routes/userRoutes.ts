import express from "express";
import { fetchUser, updateUser } from "../controllers/userControllers.ts";

const router = express.Router();

//get Usser
router.get("/:id", fetchUser);
router.put("/:id", updateUser);

export default router;
