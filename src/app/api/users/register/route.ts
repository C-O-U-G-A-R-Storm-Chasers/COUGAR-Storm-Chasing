"use server";

import { NextRequest, NextResponse } from "next/server";
import { insertUser } from "@/lib/database/users/insertUser";
import { UserWithHashedPassword } from "@/_Interfaces/Users/User";
import { fetchUserByUsername } from "@/lib/database/users/fetchUserByUsername";
import { fetchUserByEmail } from "@/lib/database/users/fetchUserByEmail";
import { hashPass } from "@/lib/auth/hashPass";
import { safeUUID } from "@/lib/crypto/crypto";
import { UUID } from "crypto";
import { ProfileImageUploadAction } from "@/_Actions/File/Upload/ProfileImageUploadAction";
import { PermissionLevels } from "@/_Enums/PermissionLevels";

export async function POST(request: NextRequest) {
    const data = await request.formData();
    const first = data.get("first") as string;
    const last = data.get("last") as string;
    const username = data.get("username") as string;
    const email = data.get("email") as string;
    const pass = data.get("password") as string;
    const repeatPass = data.get("rpt-password") as string;
    const profileImage = data.get("profile-image") as File | null;

    // Verify username doesn't already have an account
    const usernameResult = await fetchUserByUsername(username);

    if (usernameResult) return NextResponse.json({
        success: false,
        msg: "That username is already in use. Please try a different one.",
        data: null
    });

    // Verify that the email doesn't already exist
    const emailResult = await fetchUserByEmail(email);

    if (emailResult) return NextResponse.json({
        success: false,
        msg: "That email address is already in use. Please try a different one.",
        data: null
    });

    // Verify password matches pattern
    const pattern: RegExp = /^(?=.{9,})(?=.*[A-Z])(?=(?:.*[!*&^%#@]){2,})(?!.*([!*&^%#@]).*\1.*\1)[A-Za-z\d!*&^%#@]+$/;
    const isValidPassword: boolean = pattern.test(pass);

    if (!isValidPassword) return NextResponse.json({
        success: false,
        msg: "The given password is not valid. Please check the requirements.",
        data: null
    });

    // Verify passwords match
    if (pass !== repeatPass) return NextResponse.json({
        success: false,
        msg: "The given passwords do not match. Please try again.",
        data: null
    });

    // Hash password
    const hashedPass = await hashPass(pass);

    const uid = safeUUID() as UUID;

    // Upload profile image
    const profileImageResult = profileImage ? await ProfileImageUploadAction(uid, profileImage) : null;

    // Insert user
    const user: UserWithHashedPassword = {
        uid,
        first,
        last,
        username,
        email,
        profileImage: profileImageResult?.data?.id ?? null,
        created_timestamp: Date.now(),
        perm_level: PermissionLevels.MEM,
        last_signin: null,
        password: hashedPass
    };

    const insertResult = await insertUser(user);

    if (!insertResult?.uid) return NextResponse.json({
        success: false,
        msg: "A technical error occurred, and your account couldn't be created. Please try again, or contact support.",
        data: null
    });

    NextResponse.json({
        success: true,
        msg: "Account successfully created! Please wait..."
    });
}