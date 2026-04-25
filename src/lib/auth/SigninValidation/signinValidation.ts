"use server";

import { signinStatus } from "./signinStatus";
import { SigninStatus } from "@/_Enums/Auth/SigninStatus";
import { PermissionLevels } from "@/_Enums/PermissionLevels";
import { SigninValidationResult } from "@/_Interfaces/Users/SigninValidationResult";

export async function signinValidation(requiredPermissionLevel: PermissionLevels = PermissionLevels.MEM): Promise<SigninValidationResult> {
    const { status, user } = await signinStatus();

    if (status === SigninStatus.SIGNED_OUT) return {
        success: false,
        msg: "You must be signed in to access this page or feature.",
        data: user
    };

    if (status === SigninStatus.SIGNED_IN && user) {
        if (user.perm_level < requiredPermissionLevel) return {
            success: false,
            msg: "You do not have access to this page or feature.",
            data: user
        };
    }

    return {
        success: true,
        msg: "You have the required permissions to access this page or feature.",
        data: user
    };
}