import express from "express";
import { fetchWorkers } from "../controllers/departmentCotrollers.js";

const router = express.Router();

router.get('/getWorkers',fetchWorkers)

export default router;