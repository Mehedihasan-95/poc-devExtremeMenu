import { Base } from "./Base";
import { Role } from "./Role";

export class User extends Base {
    UserName: string;
    eMail!: string;
    CellNo!: string;
    role?: Role | null;
    roleId: number = 1;
    IsStuff?: boolean;
    Password!: string;
    ConfPassword: string;
}

export interface LoginUser {
    Email: string;
    Password: string;
}

export class UserInfo extends Base {
    user: User | null;
    userId: number | null = null;
    regNo: string;
    shipNo: number;
    shipName: string;
    shipAddress: string;
    shipAgent: string;
    shipAgentLicense: string;
    mlo: string;
    licenseFilePath: string;
    attachmentFilePath: string;
    permissionLetterFilePath: string;
    contactPersonName: string;
    contactPersonCell: string;
    contactPersonEmail: string;
    contactPersonDesignation: string;
}

export class ResetCode extends Base{
    code: string;
    userEmail: string;
    newPassword: string;
}

