import { Admin } from "../model/index";
import { AdminRoles, IAccountStatus, IAdmin, IAdminResponse, ILoginResponse } from "../interface";
import { generateToken } from "../functions";

export const addAdmin = async (newAdmin: IAdmin): Promise<IAdminResponse> => {
    try {
        if (!newAdmin.name || !newAdmin.username || !newAdmin.email) {
            throw { message: "Missing fields", statusCode: 400 };
        }

        const exists = await Admin.findOne({
            $or: [
                { username: newAdmin.username.toLowerCase() },
                { email: newAdmin.email.toLowerCase() },
                { phone: newAdmin.phone },
            ],
        });

        if (exists) throw { message: "Admin already exists", statusCode: 400 };

        const admin = new Admin({
            name: newAdmin.name,
            username: newAdmin.username.toLowerCase(),
            email: newAdmin.email.toLowerCase(),
            role: AdminRoles.ADMIN,
            status: IAccountStatus.ACTIVE,
            password: newAdmin.password,
        });
        const editedAdmin = await admin.save();

        console.log(admin);

        return {
            message: `${editedAdmin.username} created successfully`,
            success: true,
            result: editedAdmin,
        };
    } catch (error: any) {
        console.log(error);
        throw {
            message: error.message || "Admin creation failed",
            statusCode: error.statusCode || 500,
            success: false,
        };
    }
};

export const adminLogin = (username: string, email: string, phone: string, password: string) => {
    return new Promise<ILoginResponse>(async (resolve, reject) => {
        try {
            if ((!username && !email) || !password)
                throw {
                    message: `Provide ${email ? "Email" : "Username"} and password`,
                    statusCode: 400,
                };

            const admin = await Admin.findOne(
                {
                    $or: [{ username }, { email }],
                },
                {
                    name: 1,
                    role: 1,
                    password: 1,
                    status: 1,
                }
            );

            if (!admin)
                throw {
                    message: `Invalid ${email ? "Email" : phone ? "Phone" : "Username"} or Password`,
                    statusCode: 401,
                };

            if (admin.status === "Blocked")
                throw {
                    message: `Account blocked! contact Customer Care`,
                    statusCode: 401,
                };
            if (admin && (await admin.matchPasswords(password))) {
                if (admin.status === IAccountStatus.INACTIVE) admin.status = IAccountStatus.ACTIVE;

                const accessToken = await generateToken({
                    id: admin._id.toString(),
                    name: admin.name,
                    role: admin.role,
                });

                resolve({
                    message: "Login Success",
                    result: accessToken,
                });
            } else {
                throw {
                    message: `Invalid ${email ? "Email" : phone ? "Phone" : "Username"} or Password`,
                    statusCode: 401,
                };
            }
        } catch (error: any) {
            reject({
                message: error.message || error.msg || "Admin login failed",
                statusCode: error.statusCode || 500,
                code: error.code || error.name,
            });
        }
    });
};
