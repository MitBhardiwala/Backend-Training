import API_MESSAGES from "../lib/constants.js";
import prisma from "../lib/db.js";
import { joiGlobalErrorHandler } from "../lib/joiErrorHandler.js";
import { categorySchema } from "../lib/validations.js";

export const createCategory = async (req, res) => {
  try {
    const { error } = categorySchema.validate(req.body);
    if (error) {
      return joiGlobalErrorHandler(error, res);
    }
    
    const categoryData = req.body;

    const category = await prisma.category.create({
      data: categoryData,
    });

    res.status(201).json({
      success: true,
      message: API_MESSAGES.DATA.ADD_SUCCESS,
      category,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: API_MESSAGES.DATA.ADD_ERROR,
      error,
    });
  }
};
