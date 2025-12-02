import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";


interface DecodedToken extends JwtPayload {
    id: string;
    role: string;
}
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

export const verifyToken = async (
    token: string,
): Promise<DecodedToken> => {
    try {
        const secret = process.env.JWT_SECRET

        if (!secret) {
            throw new Error("JWT_SECRET  not configured");
        }

        const decoded = jwt.verify(token, secret) as DecodedToken;
        return decoded;
    } catch (error: any) {
        throw {
            message: "Invalid or expired token",
            statusCode: 401,
        };
    }
};