import express from "express";
import User from "../models/User.js";
import { API_MESSAGES } from "../utils/constants.js";
import {
  addUser,
  deleteUser,
  fecthUserPostDetails,
  fetchAllUsers,
  fetchUserAgedGreaterThan20,
  fetchUsersByEmail,
  getListOfUserFirstName,
  updateUser,
} from "../controllers/userControllers.js";

const router = express.Router();

router.get("/getAllUsers", fetchAllUsers);

router.post("/addUser", addUser);

router.get("/getUsersfirstName", getListOfUserFirstName);

router.get("/getUsersAgedGreaterThan20",fetchUserAgedGreaterThan20)

router.get("/getUserByEmail", fetchUsersByEmail);

router.get("/getUserPostDetails",fecthUserPostDetails)

router.put("/", updateUser);

router.delete("/", deleteUser);





export default router;
