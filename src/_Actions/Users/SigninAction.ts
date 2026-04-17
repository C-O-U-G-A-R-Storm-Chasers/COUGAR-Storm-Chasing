"use server";

import { BasicResult } from "@/_Interfaces/BasicResult";
import { UserWithHashedPassword } from "@/_Interfaces/Users/User";
import { verifyPass } from "@/lib/auth/verifyPass";
import { fetchUserByEmail } from "@/lib/database/users/fetchUserByEmail";
import { fetchUserByUsername } from "@/lib/database/users/fetchUserByUsername";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export async function SigninAction(prevState: any, data: FormData): Promise<BasicResult> {
    const login = data.get("login") as string;
    const pass = data.get("password") as string;
    
    // Check that the account exists
    let userExists = await fetchUserByUsername(login, true);

    if (!userExists) {
        userExists = await fetchUserByEmail(login, true);

        if (!userExists) return {
            success: false,
            msg: "A user with the email or username provided does not exist. Please try again, or contact support if you believe this is an error.",
            data: null
        };
    }

    // Verify password
    const passwordIsValid = await verifyPass(pass, (userExists as UserWithHashedPassword).password);

    if (!passwordIsValid) return {
        success: false,
        msg: "Incorrect password. Please try again, or contact support if you believe this is an error.",
        data: null
    };

    // Set user cookie
    const isDev = process.env.NODE_ENV === "development";
    (await cookies()).set("user", JSON.stringify(userExists), {
        httpOnly: false,
        secure: !isDev,
        sameSite: isDev ? "lax" : "strict",
        maxAge: 60 * 60 * 24 * 0.5, // 12 hours
        path: "/",
    });
    
    redirect("/");
}