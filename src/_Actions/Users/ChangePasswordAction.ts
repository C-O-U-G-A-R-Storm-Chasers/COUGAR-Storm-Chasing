"use server";

import { BasicResult } from "@/_Interfaces/BasicResult";

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export async function ChangePasswordAction(prevState: any, data: FormData): Promise<BasicResult> {
    /*const uid = data.get("uid") as string;
    const newPassword = data.get("newPassword") as string;
    const password = data.get("oldPassword") as string;

    // Attempt to change the user's password (includes verification)
    const { success, msg, data: changeUserPasswordData } = await changeUserPassword(uid, password, newPassword);

    if (!success) return { success, msg };

    const { user, userType } = changeUserPasswordData;
    const newUser = user as Admin | Teacher | Student;
    const newUserType = userType as UserTypes;

    // Check if the user is super admin
    const userIsSuperAdmin = newUserType === UserTypes.ADMIN && (newUser as Admin).super;

    // Set cookies to sign in
    delete user.password;
    const userData: UserCookie = {
        data: user,
        type: userIsSuperAdmin ? UserTypes.SUPER_ADMIN : newUserType
    };

    const isDev = process.env.NODE_ENV === "development";

    (await cookies()).set("user", JSON.stringify(userData), {
        httpOnly: false,
        secure: !isDev,
        sameSite: isDev ? "lax" : "strict",
        maxAge: 60 * 60 * 24 * 0.5, // 12 hours
        path: "/",
    });

    const setSigninStatus = await setLastSignin(newUser.uid, newUserType, true);
    
    if (!setSigninStatus) return {
        success: false,
        msg: "Something went wrong signing you in. If the problem persists, please contact an administrator."
    };*/

    return {
        success: true,
        msg: "You have successfully changed your password! Please wait a moment...",
        data: null
    };
}