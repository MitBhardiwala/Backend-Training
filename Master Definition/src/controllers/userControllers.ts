import type { Request, Response } from "express";
import { toDataUri, type ApiResponse } from "../lib/utils.ts";
import API_MESSAGES from "../lib/constants.ts";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { userLoginSchema, userRegistrationSchema } from "../lib/validateSchema.ts";
import { joiGlobalErrorHandler } from "../lib/joiErrorHandler.ts";
import prisma from "../lib/db.ts";
import dotenv from "dotenv";

dotenv.config();



const SECRET_KEY: any = process.env.JWT_SECRET;

export const registerUser = async (
    req: Request,
    res: Response<ApiResponse>
) => {
    try {

        const image = req.file;
        const user = { ...req.body, image };
        user.role_id = parseInt(user.role_id)
        user.image = toDataUri(user.image.path)


        const { error } = userRegistrationSchema.validate({...user});
        if (error) {
            return joiGlobalErrorHandler(error, res);
        }

        //check if user exists or not

        const existingUser = await prisma.user.findUnique({ where: { email: user.email } });

        if (existingUser) {
            return res.status(409).json({
                success: false,
                error: API_MESSAGES.USER.ALREADY_EXISTS
            })
        }

        //check if roleId exist 

        const existingRole = await prisma.role.findUnique({ where: { id: user.role_id } });

        if (!existingRole) {
            return res.status(409).json({
                success: false,
                error: API_MESSAGES.USER.ROLE_NOT_FOUND
            })
        }


        const password = user.password;
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;



        const newUser = await prisma.user.create({
            data: user
        })

        const token = jwt.sign({ userId: newUser.id }, SECRET_KEY, {
            expiresIn: "4h",
        });




        res.status(201).json({
            success: true,
            message: API_MESSAGES.USER.REGISTER_SUCCESS,
            data: newUser,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: API_MESSAGES.USER.LOGIN_ERROR,
        });
    }
};

export const loginUser = async (req: Request, res: Response) => {
    try {

        console.log(req.body)

        const { error } = userLoginSchema.validate({ ...req.body });

        if (error) {
            return joiGlobalErrorHandler(error, res);
        }

        //check if user exists

        const existingUser = await prisma.user.findUnique({ where: { email: req.body.email } });

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

        const token = jwt.sign({ userId: existingUser.id }, SECRET_KEY, {
            expiresIn: "4h",
        });

        res.status(200).json({
            success: true,
            message: API_MESSAGES.USER.LOGIN_SUCCESS,
            token,
        });


    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            error: API_MESSAGES.USER.LOGIN_ERROR
        })
    }
}

