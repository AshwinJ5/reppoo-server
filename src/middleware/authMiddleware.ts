import { adminHelper } from "../helper";
import { Request, Response, NextFunction } from "express";
import { IAccountStatus } from "../interface";
import { verifyToken } from "../functions/generateToken";

export const adminAccess = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.headers.authorization || !req.headers.authorization?.includes("Bearer")) {
            throw { message: "Unauthenticated", statusCode: 403 };
        }
        const authorizationToken = req.headers.authorization.split(" ")[1];

        if (!authorizationToken) {
            throw { message: "Unauthenticated", statusCode: 403 };
        }

        const decoded = await verifyToken(authorizationToken);

        if (decoded.role === "SuperAdmin" || decoded.role === "DeveloperAdmin" || decoded.role === "Admin") {
            const admin = await (await adminHelper.checkAdminStatus(decoded.id, [IAccountStatus.ACTIVE])).result;

            if (!admin) {
                throw { message: "Admin not found", statusCode: 404 };
            }
            req.client = {
                id: admin._id,
                name: admin.name,
                status: admin.status,
                role: admin.role,
            };
            return next();
        } else {
            throw { message: "Unauthenticated", statusCode: 403 };
        }
    } catch (error: any) {
        return next(error);
    }
};
