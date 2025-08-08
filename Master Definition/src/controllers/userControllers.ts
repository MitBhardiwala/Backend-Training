import type { Request, Response } from "express";
import { generateToken, toDataUri, type ApiResponse } from "../lib/utils.ts";
import API_MESSAGES from "../lib/constants.ts";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { userLoginSchema, userRegistrationSchema } from "../lib/validateSchema.ts";
import { joiGlobalErrorHandler } from "../lib/joiErrorHandler.ts";
import prisma from "../lib/db.ts";




export const loginUser = async (req: Request, res: Response) => {
    try {

        const { error } = userLoginSchema.validate({ ...req.body });

        if (error) {
            return joiGlobalErrorHandler(error, res);
        }



        //check if user exists

        const existingUser = await prisma.user.findUnique({ where: { email: req.body.email } });
        console.log(existingUser)

        if (!existingUser) {
            return res.status(400).json({
                success: false,
                error: API_MESSAGES.AUTH.INVALID_CREDENTAILS
            })
        }

        //check if password is valid or not

        const isPasswordValid = await bcrypt.compare(req.body.password, existingUser.password);

        if (!isPasswordValid) {
            return res.status(400).json({
                success: false,

                error: API_MESSAGES.AUTH.INVALID_CREDENTAILS,
            });
        }

        const { createdAt, updatedAt, ...user } = existingUser;

        const token = generateToken(user);
        res.status(200).json({
            success: true,
            message: API_MESSAGES.USER.LOGIN_SUCCESS,
            token,
        });


    } catch (error) {
        res.status(500).json({
            success: false,
            error: API_MESSAGES.USER.LOGIN_ERROR
        })
    }
}