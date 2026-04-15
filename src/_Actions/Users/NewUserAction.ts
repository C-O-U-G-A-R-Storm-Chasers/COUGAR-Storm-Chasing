"use server";

import { BasicResult } from "@/_Interfaces/BasicResult";
import { deleteAdmin } from "@/lib/database/admins/deleteAdmin";
import { newAdmin } from "@/lib/database/admins/newAdmin";

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export async function NewUserAction(prevState: any, data: FormData): Promise<BasicResult> {
    /*const results = await Promise.all(pendingUsers.map(async user => {
        // Verify that password is a string
        if (typeof user.password !== "string" || typeof user.repeatedPassword !== "string") return {
            success: false,
            msg: "Password must be a string! This is probably an uncaught bug."
        } as BasicResult;

        // Verify password matches and hash
        if (user.password !== user.repeatedPassword) return {
            success: false,
            msg: "Passwords do not match!"
        } as BasicResult;

        // Normalize the user
        const normalizedUser: Admin = {
            uid: user.uid,
            first: user.first,
            last: user.last,
            username: user.username,
            email: user.email,
            password: await HashPass(user.password),
            created_timestamp: Date.now(),
            super: typeof user.super === "string" ?
                (user.super as string).trim().toLowerCase() === "true" :
                Boolean(user.super),
            prefix: user.prefix as PersonPrefixes
        };

        // Upload the user
        const uploadResult = await newAdmin(normalizedUser);

        if (!uploadResult) return {
            success: false,
            msg: `Could not upload admin '${normalizedUser.username}'!`,
        } as BasicResult;

        return {
            success: true,
            msg: "Successfully collected normalized users!",
        } as BasicResult;
    }));

    // Check if any were invalid
    const invalidResult = results.find(result => !result.success);

    // Delete other valid results (revert on error) and then return the bad result
    if (invalidResult) {
        await Promise.all(results.map(result => deleteAdmin((result.data as Admin).uid)));

        return invalidResult;
    }

    return results[0];*/

    return {
        success: true,
        msg: "",
        data: null
    };
}