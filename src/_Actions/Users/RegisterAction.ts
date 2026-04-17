"use server";

import { PermissionLevels } from "@/_Enums/PermissionLevels";
import { BasicResult } from "@/_Interfaces/BasicResult";
import { UserWithHashedPassword } from "@/_Interfaces/Users/User";
import { hashPass } from "@/lib/auth/hashPass";
import { safeUUID } from "@/lib/crypto/crypto";
import { fetchUserByEmail } from "@/lib/database/users/fetchUserByEmail";
import { fetchUserByUsername } from "@/lib/database/users/fetchUserByUsername";
import { insertUser } from "@/lib/database/users/insertUser";
import { UUID } from "crypto";

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export async function NewUserAction(prevState: any, data: FormData): Promise<BasicResult> {
    const first = data.get("first") as string;
    const last = data.get("last") as string;
    const username = data.get("username") as string;
    const email = data.get("email") as string;
    const pass = data.get("password") as string;
    const repeatPass = data.get("rpt-password") as string;

    // Verify username doesn't already have an account
    const usernameResult = await fetchUserByUsername(username);

    if (usernameResult) return {
        success: false,
        msg: "That username is already in use. Please try a different one.",
        data: null
    };

    // Verify that the email doesn't already exist
    const emailResult = await fetchUserByEmail(email);

    if (emailResult) return {
        success: false,
        msg: "That email address is already in use. Please try a different one.",
        data: null
    };

    // Verify password matches pattern
    const pattern: RegExp = /^(?=.{9,})(?=.*[A-Z])(?=(?:.*[!*&^%#@]){2,})(?!.*([!*&^%#@]).*\1.*\1)[A-Za-z\d!*&^%#@]+$/;
    const isValidPassword: boolean = pattern.test(pass);

    if (!isValidPassword) return {
        success: false,
        msg: "The given password is not valid. Please check the requirements.",
        data: null
    };

    // Verify passwords match
    if (pass !== repeatPass) return {
        success: false,
        msg: "The given passwords do not match. Please try again.",
        data: null
    };

    // Hash password
    const hashedPass = await hashPass(pass);

    // Insert user
    const user: UserWithHashedPassword = {
        uid: safeUUID() as UUID,
        first,
        last,
        username,
        email,
        created_timestamp: Date.now(),
        perm_level: PermissionLevels.MEM,
        password: hashedPass
    };

    const insertResult = await insertUser(user);

    if (!insertResult?.uid) return {
        success: false,
        msg: "A technical error occurred, and your account couldn't be created. Please try again, or contact support.",
        data: null
    };

    return {
        success: true,
        msg: "",
        data: null
    };
}