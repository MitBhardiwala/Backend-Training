import type { NextFunction, Request, Response } from "express";
import API_MESSAGES from "../lib/constants.ts";
import jwt, { type JwtPayload } from "jsonwebtoken";

import prisma from "../lib/db.ts";


const JWT_SECRET_KEY: any = process.env.JWT_SECRET;

export const authenticateToken = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const authHeader = req.headers["authorization"];
        const token = authHeader?.split(" ")[1];

        if (!token) {
            return res.status(500).json({
                success: false,
                message: API_MESSAGES.AUTH.INVALID_TOKEN,
            });
        }

        const userPayload = jwt.verify(token, JWT_SECRET_KEY) as JwtPayload;

        const userDetails = await prisma.user.findUnique({
            where: { id: userPayload.userId },
        });

        req.user = userDetails;

        next();
    } catch (error) {
        res.status(500).json({
            success: false,
            message: API_MESSAGES.AUTH.INVALID_TOKEN,
        });
    }
};
