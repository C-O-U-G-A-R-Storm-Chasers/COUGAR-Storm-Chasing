"use server";

import { PermissionLevels } from "@/_Enums/PermissionLevels";
import { signinValidation } from "@/lib/auth/SigninValidation/signinValidation";
import { NextRequest, NextResponse } from "next/server";
import { insertUser } from "@/lib/database/users/insertUser";
import { fetchUserByID } from "@/lib/database/users/fetchUserByID";
import { UserWithHashedPassword } from "@/_Interfaces/Users/User";
import { cookies } from "next/headers";
import { fetchUserByHandle } from "@/lib/database/users/fetchUserByHandle";

export async function POST(request: NextRequest) {
    const { success, msg, data: user } = await signinValidation(PermissionLevels.MEM);
        
    if (!success || !user) return NextResponse.json({
        success: false,
        msg: `The user is not signed in or doesn't have sufficient permissions: ${msg}`
    });

    const data = await request.formData();
    const first = data.get("first") as string;
    const last = data.get("last") as string;
    const username = data.get("username") as string;
    const handle = data.get("handle") as string;

    // Fetch user with password
    const oldUserWithPassword = await fetchUserByID(user.uid, true) as UserWithHashedPassword | null;

    if (!oldUserWithPassword) return NextResponse.json({
        success: false,
        msg: "Could not fetch account from database! Please try again, or contact an administrator.",
    });

    // Verify that handle isn't in use
    const handleInUse = await fetchUserByHandle(handle, false);

    if (handleInUse) return NextResponse.json({
        success: false,
        msg: `The handle ${handle} is already in use! Please try a different handle.`,
    });

    // Construct new user
    const newUser: UserWithHashedPassword = {
        ...user,
        first,
        last,
        username,
        handle: `@${handle.replaceAll("@", "")}`, // Enforce only one @
        password: oldUserWithPassword.password,
    };

    const insertUserResult = await insertUser(newUser);

    if (!insertUserResult) return NextResponse.json({
        success: false,
        msg: "Could not insert updated user! Please try again, or contact an administrator.",
    });

    // Update the user cookie with the new data
    const isDev = process.env.NODE_ENV === "development";
    (await cookies()).set("user", JSON.stringify(insertUserResult), {
        httpOnly: false,
        secure: !isDev,
        sameSite: isDev ? "lax" : "strict",
        maxAge: 60 * 60 * 24 * 0.5, // 12 hours
        path: "/",
    });

    return NextResponse.json({
        success: true,
        msg: "Profile successfully updated! Please wait...",
        data: newUser as UserWithHashedPassword
    });
}