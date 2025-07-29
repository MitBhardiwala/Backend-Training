import { Op } from "sequelize";
import { User, Post } from "../models/index.js";
import { API_MESSAGES } from "../utils/constants.js";

export const fetchAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();

    //console.log(users.every(user => user instanceof User)); // true
    // console.log('All users:', JSON.stringify(users, null, 2));

    res.status(200).json({
      success: true,
      message: API_MESSAGES.SUCCESS.DATA_FETCHED,
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: API_MESSAGES.ERROR.DATA_NOT_FETCHED,
      error,
    });
  }
};

export const addUser = async (req, res) => {
  try {
    const user = req.body;

    const newUser = await User.create(user);
    res.status(201).json({
      success: true,
      message: API_MESSAGES.SUCCESS.USER_ADDED,
      data: newUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: API_MESSAGES.ERROR.USER_NOT_ADDED,
      error,
    });
  }
};

export const getListOfUserFirstName = async (req, res) => {
  try {
    const users = await User.findAll({ attributes: ["firstName"] });

    res.status(200).json({
      success: true,
      message: API_MESSAGES.SUCCESS.DATA_FETCHED,
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: API_MESSAGES.ERROR.DATA_NOT_FETCHED,
      error,
    });
  }
};

export const fetchUsersByEmail = async (req, res) => {
  try {
    const { email } = req.query;
    const users = await User.findAll({
      where: { email: email },
    });

    res.status(200).json({
      success: true,
      message: API_MESSAGES.SUCCESS.DATA_FETCHED,
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: API_MESSAGES.ERROR.DATA_NOT_FETCHED,
      error,
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { oldName, newName } = req.body;
    await User.update(
      { firstName: newName },
      { where: { firstName: oldName } }
    );

    res.status(200).json({
      success: true,
      message: API_MESSAGES.SUCCESS.USER_UPDATED,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: API_MESSAGES.ERROR.USER_NOT_UPDATED,
      error,
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { firstName } = req.body;
    await User.destroy({
      where: {
        firstName: firstName,
      },
    });

    res.status(200).json({
      success: true,
      message: API_MESSAGES.SUCCESS.USER_DELETED,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: API_MESSAGES.ERROR.USER_NOT_DELETED,
      error,
    });
  }
};

export const fetchUserAgedGreaterThan20 = async (req, res) => {
  try {
    console.log("hello");

    const users = await User.findAll({
      where: { age: { [Op.gt]: 20 } },
    });

    res.status(200).json({
      success: true,
      message: API_MESSAGES.SUCCESS.DATA_FETCHED,
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: API_MESSAGES.ERROR.DATA_NOT_FETCHED,
      error,
    });
  }
};

export const fecthUserPostDetails = async (req, res) => {
  try {
    const postsData = await User.findAll({
      include: [{ model: Post ,attributes:['id','description','totalLikes']}],
      attributes:['id','firstName','email']
    });

  

    res.status(200).json({
      success: true,
      message: API_MESSAGES.SUCCESS.DATA_FETCHED,
      data: postsData,
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
