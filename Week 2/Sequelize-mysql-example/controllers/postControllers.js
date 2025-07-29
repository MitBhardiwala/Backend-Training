import { API_MESSAGES } from "../utils/constants.js";
import { Post, User } from "../models/index.js";
import { Sequelize } from "sequelize";
import sequelize from "../config/database.js";
export const addPost = async (req, res) => {
  try {
    const newPost = await Post.create(req.body);

    res.status(201).json({
      success: true,
      message: API_MESSAGES.SUCCESS.POST_ADDED,
      data: newPost,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: API_MESSAGES.ERROR.POST_NOT_ADDED,
      error,
    });
  }
};

export const fetchTotalNumberOfPosts = async (req, res) => {
  try {
    const totalPosts = await Post.count();

    res.status(200).json({
      success: true,
      message: API_MESSAGES.SUCCESS.DATA_FETCHED,
      getTotalNumberOfPosts: totalPosts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: API_MESSAGES.ERROR.DATA_NOT_FETCHED,
      error,
    });
  }
};

export const fetchPostwithMostLikes = async (req, res) => {
  try {
    const postData = await Post.findAll({
      order: [["totalLikes", "DESC"]],
      limit: 1,
    });

    res.status(200).json({
      success: true,
      message: API_MESSAGES.SUCCESS.DATA_FETCHED,
      getTotalNumberOfPosts: postData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: API_MESSAGES.ERROR.DATA_NOT_FETCHED,
      error,
    });
  }
};


export const fetchTotalLikesOnPosts = async (req, res) => {
  try {
    const postData = await Post.findAll({
      attributes: [
        "userId",
        [sequelize.fn("SUM", sequelize.col("totalLikes")), "Total Likes"],
      ],
      group: ["userId"],
    });

    res.status(200).json({
      success: true,
      message: API_MESSAGES.SUCCESS.DATA_FETCHED,
      getTotalNumberOfPosts: postData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: API_MESSAGES.ERROR.DATA_NOT_FETCHED,
      error,
    });
  }
};
