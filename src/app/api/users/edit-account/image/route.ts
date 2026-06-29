"use server";

import { PermissionLevels } from "@/_Enums/PermissionLevels";
import { signinValidation } from "@/lib/auth/SigninValidation/signinValidation";
import { NextRequest, NextResponse } from "next/server";
import { UserWithHashedPassword } from "@/_Interfaces/Users/User";
import { fetchUserByID } from "@/lib/database/users/fetchUserByID";
import { insertUser } from "@/lib/database/users/insertUser";
import { cookies } from "next/headers";
import { processProfileImage } from "./processProfileImage";

export async function POST(request: NextRequest) {
    const { success, msg, data: user } = await signinValidation(PermissionLevels.MEM);
        
    if (!success || !user) return NextResponse.json({
        success: false,
        msg: `The user is not signed in or doesn't have sufficient permissions: ${msg}`
    });

    const data = await request.formData();
    const profileImage = data.get("profile-image") as File | null;

    if (!profileImage) return NextResponse.json({
        success: false,
        msg: "Profile image field is empty, cannot update!"
    });

    // Upload profile image
    const profileImageResult = await processProfileImage(user.uid, profileImage);

    if (!profileImageResult.success || !profileImageResult.data) return NextResponse.json({
        success: false,
        msg: profileImageResult.msg
    });

    // Fetch user with password
    const oldUserWithPassword = await fetchUserByID(user.uid, true) as UserWithHashedPassword | null;

    if (!oldUserWithPassword) return NextResponse.json({
        success: false,
        msg: "Could not fetch account from database! Please try again, or contact an administrator.",
    });

    // Construct new user
    const newUser: UserWithHashedPassword = {
        ...user,
        password: oldUserWithPassword.password,
        profileImage: profileImageResult.data.id
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
        msg: "Profile immage successfully updated! Please wait...",
        data: newUser as UserWithHashedPassword
    });
}