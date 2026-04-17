"use server";

import { BasicResult } from "@/_Interfaces/BasicResult";

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export async function NewUserAction(prevState: any, data: FormData): Promise<BasicResult> {
    const first = data.get("first") as string;
    const last = data.get("last") as string;
    const username = data.get("username") as string;
    const email = data.get("email") as string;
    const pass = data.get("password") as string;
    const repeatPass = data.get("rpt-password") as string;

    return {
        success: true,
        msg: "",
        data: null
    };
}