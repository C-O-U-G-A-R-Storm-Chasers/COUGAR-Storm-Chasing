"use server";

import { BasicResult } from "@/_Interfaces/BasicResult";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function SignoutAction(): Promise<BasicResult> {
    (await cookies()).delete("user");

    redirect("/account/signin");

    return {
        success: true
    };
}