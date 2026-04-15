"use server";

import { BasicResult } from "@/_Interfaces/BasicResult";
import { cookies } from "next/headers";

export async function SignoutAction(): Promise<BasicResult> {
    (await cookies()).delete("user");

    return {
        success: true
    };
}