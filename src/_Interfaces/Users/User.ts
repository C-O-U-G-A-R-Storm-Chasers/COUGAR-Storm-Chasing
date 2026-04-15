import { PasswordHash } from "../Auth/PasswordHash";

export interface User {
    uid: string,
    username: string,
    first: string,
    last: string,
    email: string,
    created_timestamp: number
}

export interface UserWithStringPassword extends User {
    password: string
}

export interface UserWithHashedPassword extends User {
    password: PasswordHash
}