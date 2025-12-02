export enum AdminRoles {
    ADMIN = "Admin",
    SUPER_ADMIN = "SuperAdmin",
    DEVELOPER_ADMIN = "DeveloperAdmin",
}
export enum IAccountStatus {
    ACTIVE = "Active",
    INACTIVE = "Inactive",
    PENDING = "Pending",
    ACCEPTED = "Accepted",
    REJECTED = "Rejected",
    BLOCKED = "Blocked",
}

export interface IAdmin {
    name: string;
    username: string;
    password: string;
    phone: number;
    email: string;
    role: AdminRoles;
    status: IAccountStatus;
}

export interface IAdminResponse {
    message: string;
    success: boolean;
    result?: IAdmin;
}
export interface ILoginResponse  {
    result: string;
    message: string;
}
