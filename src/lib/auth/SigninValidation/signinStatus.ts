"use server";

import { SigninStatus } from "@/_Enums/Auth/SigninStatus";
import { User } from "@/_Interfaces/Users/User";
import { cookies } from "next/headers";

export async function signinStatus(): Promise<{ status: SigninStatus, user: User | null }> {
    const cookiesStore = cookies();
    const userRaw = (await cookiesStore).get("user")?.value;
    let user: User | null = null;

    if (userRaw) user = JSON.parse(userRaw) as User | null;

    if (!user || !user.uid || !user.perm_level) return { status: SigninStatus.SIGNED_OUT, user };

    return { status: SigninStatus.SIGNED_IN, user };
}