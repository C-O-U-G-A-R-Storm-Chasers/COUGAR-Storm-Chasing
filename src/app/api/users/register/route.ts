"use server";

import { NextRequest, NextResponse } from "next/server";
import { insertUser } from "@/lib/database/users/insertUser";
import { UserWithHashedPassword } from "@/_Interfaces/Users/User";
import { fetchUserByUsername } from "@/lib/database/users/fetchUserByUsername";
import { fetchUserByEmail } from "@/lib/database/users/fetchUserByEmail";
import { hashPass } from "@/lib/auth/hashPass";
import { safeUUID } from "@/lib/crypto/crypto";
import { UUID } from "crypto";
import { PermissionLevels } from "@/_Enums/PermissionLevels";
import { processProfileImage } from "../processProfileImage";
import { RegistrationResponses } from "@/_Enums/Registration/RegistrationResponses";

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
        data: RegistrationResponses.USERNAME_IN_USE
    });

    // Verify that the email doesn't already exist
    const emailResult = await fetchUserByEmail(email);

    if (emailResult) return NextResponse.json({
        success: false,
        data: RegistrationResponses.EMAIL_IN_USE
    });

    // Verify password matches pattern
    /**
     * - At least 9 characters long
     * - At least 1 uppercase letter
     * - At least 2 special characters 
     * - No special character may appear twice
     * - Only letters, digits, and  special characters (! * & ^ % # @) are allowed
     */
    const pattern: RegExp = /^(?=.{9,})(?=.*[A-Z])(?=(?:.*[!*&^%#@]){2,})(?!.*([!*&^%#@]).*\1.*\1)[A-Za-z\d!*&^%#@]+$/;
    const isValidPassword: boolean = pattern.test(pass);

    if (!isValidPassword) return NextResponse.json({
        success: false,
        data: RegistrationResponses.INVALID_PASS
    });

    // Verify passwords match
    if (pass !== repeatPass) return NextResponse.json({
        success: false,
        data: RegistrationResponses.PASS_MISMATCH
    });

    // Hash password
    const hashedPass = await hashPass(pass);

    const uid = safeUUID() as UUID;

    // Upload profile image
    const profileImageResult = profileImage ? await processProfileImage(uid, profileImage) : null;

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
        data: RegistrationResponses.TECHNICAL_ERROR
    });

    return NextResponse.json({
        success: true,
        data: RegistrationResponses.OK
    });
}