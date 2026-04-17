import { PermissionLevels } from "@/_Enums/PermissionLevels";
import { PasswordHash } from "../Auth/PasswordHash";

export interface User {
    uid: string,
    username: string,
    first: string,
    last: string,
    email: string,
    created_timestamp: number,
    perm_level: PermissionLevels,
    last_signin: number | null
}

export interface UserWithStringPassword extends User {
    password: string
}

export interface UserWithHashedPassword extends User {
    password: PasswordHash
}