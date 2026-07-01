"use server";

import signinUser from "@/lib/auth/signinUser";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const data = await request.formData();
    const login = data.get("login") as string;
    const password = data.get("password") as string;
    
    return NextResponse.json(await signinUser(login, password));
}