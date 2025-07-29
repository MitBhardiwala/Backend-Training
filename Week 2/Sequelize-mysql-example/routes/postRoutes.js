import express from "express";
import { addPost, fetchPostwithMostLikes, fetchTotalLikesOnPosts, fetchTotalNumberOfPosts } from "../controllers/postControllers.js";


const router = express.Router();

router.post("/addPost",addPost);
router.get("/getTotalPosts",fetchTotalNumberOfPosts);
router.get("/getPostwithMostLikes",fetchPostwithMostLikes);
router.get("/getTotalLikesOnPosts",fetchTotalLikesOnPosts);




export default router;