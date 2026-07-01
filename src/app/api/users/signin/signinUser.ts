"use server";

import { BasicResult } from "@/_Interfaces/BasicResult";
import { UserWithHashedPassword } from "@/_Interfaces/Users/User";
import { verifyPass } from "@/lib/auth/verifyPass";
import { fetchWebStats } from "@/lib/database/statistics/fetchWebStats";
import { updateWebStats } from "@/lib/database/statistics/updateWebStats";
import { fetchUserByEmail } from "@/lib/database/users/fetchUserByEmail";
import { fetchUserByUsername } from "@/lib/database/users/fetchUserByUsername";
import { updateLastSignin } from "@/lib/database/users/updateLastSignin";
import { cookies } from "next/headers";

export default async function signinUser(login: string, password: string): Promise<BasicResult> {
    // Check that the account exists
    let userExists = await fetchUserByUsername(login, true);

    if (!userExists) {
        userExists = await fetchUserByEmail(login, true);

        if (!userExists) return {
            success: false,
            msg: "A user with the email or username provided does not exist. Please try again, or contact support if you believe this is an error."
        };
    }

    // Verify password
    const passwordIsValid = await verifyPass(password, (userExists as UserWithHashedPassword).password);

    if (!passwordIsValid) return {
        success: false,
        msg: "Incorrect password. Please try again, or contact support if you believe this is an error."
    };

    const user = {
        ...userExists,
        password: null
    };

    // Set user cookie
    const isDev = process.env.NODE_ENV === "development";
    (await cookies()).set("user", JSON.stringify(user), {
        httpOnly: false,
        secure: !isDev,
        sameSite: isDev ? "lax" : "strict",
        maxAge: 60 * 60 * 24 * 0.5, // 12 hours
        path: "/",
    });

    await updateLastSignin(user.uid);
    
    // Update web webStats
    const webStats = await fetchWebStats();
    
    if (webStats) await updateWebStats({
        ...webStats,
        signinCount: webStats.signinCount + 1
    });

    return {
        success: true,
        msg: "You've successfully signed in! Please wait..."
    };
}