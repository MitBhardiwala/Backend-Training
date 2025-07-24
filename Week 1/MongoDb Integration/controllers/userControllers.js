import User from "../models/User.js";

export const addUser = async (req, res) => {
  try {
    const userData = req.body;

    if (
      !userData.name ||
      !userData.email ||
      !userData.password ||
      !userData.name.trim() ||
      !userData.email.trim() ||
      !userData.password.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "Name, Email and password should be present",
      });
    }

    if (!userData.email.match(/^\S+@\S+\.\S+$/)) {
      return res.status(400).json({
        success: false,
        message: "Email format is incorrect.",
      });
    }

    const newUser = new User(userData);
    await newUser.save();
    res.status(201).json({
      success: true,
      message: "USer added successfully",
      data: newUser,
    });
  } catch (error) {
    console.log("Error in creating user :", error);

    res.status(500).json({
      success: false,
      message: "Error in adding user",
      error,
    });
  }
};

export const fetchUserData = async (req, res) => {
  try {
    const body = req.body;

    const lowerCaseEmail = body.email.toLowerCase();

    const existingUser = await User.find({ email: lowerCaseEmail });

    if (existingUser.length === 0) {
      return res.status(404).json({
        success: false,
        message: `User with email : ${lowerCaseEmail} not found`,
      });
    }

    res.status(200).json({
      success: true,
      message: "User Data has been fetched successfully",
      data: existingUser,
    });
  } catch (error) {
    console.log("Error in fetching user data : ", error);

    res.status(500).json({
      success: false,
      message: "Error in fetching user data ",
    });
  }
};

export const fetchAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    if (users.length === 0) {
      return res.status(404).json({
        success: true,
        message: "No users found !",
      });
    }

    res.status(200).json({
      success: true,
      message: "All users data fetched successfully !",
      data: users,
    });
  } catch (error) {
    console.log("Error in fetching all users :", error);
    res.status(500).json({
      success: false,
      message: "Error in fetching users",
      error,
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const body = req.body;

    const newData = body.newData;
    const email = body.email;

    const existingUser = await User.find({ email: email });

    if (existingUser.length === 0) {
      return res.status(404).json({
        success: false,
        message: `User with email : ${email} not found`,
      });
    }

    const newUser = await User.findOneAndUpdate({ email: email }, newData, {
      new: true,
    });
    res.status(200).json({
      success: true,
      message: "User has been updated successfully.",
      data: newUser,
    });
  } catch (error) {
    console.log("Error in updating user : ", error);
    res.status(500).json({
      success: false,
      message: "Error in updating user",
      error,
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const body = req.body;

    const email = body.email;

    const existingUser = await User.find({ email: email });

    if (existingUser.length === 0) {
      return res.status(404).json({
        success: false,
        message: `User with email : ${email} not found`,
      });
    }

    const deletedUser = await User.findOneAndDelete({ email: email });

    res.status(200).json({
      success: true,
      message: "User has been deleted successfully",
      data: deletedUser,
    });
  } catch (error) {
    console.log("Error in deleting user : ", error);
    res.status(500).json({
      success: false,
      message: "Error in deleting user",
      error,
    });
  }
};
