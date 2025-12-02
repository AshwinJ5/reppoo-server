import jwt, { SignOptions } from "jsonwebtoken";

export interface IAdminPayload extends jwt.JwtPayload {
    id: string;
    name: string;
    role: string;
}

export const generateToken = (payload: IAdminPayload): string => {
    const secret = process.env.JWT_SECRET;

    if (!secret) {
        throw new Error("JWT_SECRET is missing");
    }

    const options: SignOptions = {
        expiresIn: (process.env.JWT_EXPIRES_IN || "7d") as any,
    };

    return jwt.sign(payload, secret, options);
};
