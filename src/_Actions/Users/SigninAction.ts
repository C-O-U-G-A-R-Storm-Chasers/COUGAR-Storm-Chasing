"use server";

import { BasicResult } from "@/_Interfaces/BasicResult";
import { fetchAdminByUsername } from "@/lib/database/admins/fetchAdminByUsername";
import { fetchStudentByUsername } from "@/lib/database/students/fetchStudentByUsername";
import { fetchTeacherByUsername } from "@/lib/database/teachers/fetchTeacherByUsername";
import { fetchLastSignin } from "@/lib/database/statistics/fetchLastSignin";
import { setLastSignin } from "@/lib/database/statistics/setLastSignin";
import { cookies } from "next/headers";

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export async function SigninAction(prevState: any, data: FormData): Promise<BasicResult & { requiresPasswordReset?: boolean }> {
    /*const username = data.get("username") as string;
    const password = data.get("password") as string;
    const type = data.get("type") as UserTypes;

    // Verify the user exists
    let user: Admin | Teacher | Student | null = null;
    if (type === UserTypes.ADMIN) {
        user = await fetchAdminByUsername(username);
    } else if (type === UserTypes.TEACHER) {
        user = await fetchTeacherByUsername(username);
    } else if (type === UserTypes.STUDENT) {
        user = await fetchStudentByUsername(username);
    }
    
    if (!user) return {
        success: false,
        msg: `User with username '${username}' doesn't exist! Please try again.`
    };

    if (!user.password) return {
        success: false,
        msg: "There was an error signing you in, please contact an administrator if the problem persists."
    };

    if (typeof user.password === "string") return {
        success: false,
        msg: "There was an error signing you in: Password must be hashed first! [This is probably an uncaught bug!]"
    };

    // Verify password matches
    if (!await VerifyPass(password, user.password)) return {
        success: false,
        msg: `The entered password is incorrect! Please try again.`
    };

    // Check if the user is super admin
    const userIsSuperAdmin = type === UserTypes.ADMIN && (user as Admin).super;

    // Create userType
    const userType = userIsSuperAdmin ? UserTypes.SUPER_ADMIN : type;

    // Set cookies to sign in
    delete user.password;
    const userData: UserCookie = {
        data: user,
        type: userType
    };

    const isDev = process.env.NODE_ENV === "development";

    (await cookies()).set("user", JSON.stringify(userData), {
        httpOnly: false,
        secure: !isDev,
        sameSite: isDev ? "lax" : "strict",
        maxAge: 60 * 60 * 24 * 0.5, // 12 hours
        path: "/",
    });

    // Check if the user has signed in before
    // Not for students
    if (process.env.NODE_ENV !== "development" && userType !== UserTypes.STUDENT) {
        const lastSignIn = await fetchLastSignin(user.uid, userType);

        if (!lastSignIn || lastSignIn.password_changed === false) return {
            success: true,
            data: userData,
            requiresPasswordReset: true
        };
    }

    // Set signin status
    const setSigninStatus = await setLastSignin(user.uid, type);

    if (!setSigninStatus) return {
        success: false,
        msg: "Something went wrong signing you in. If the problem persists, please contact an administrator."
    };*/

    return {
        success: true,
        data: null
    };
}