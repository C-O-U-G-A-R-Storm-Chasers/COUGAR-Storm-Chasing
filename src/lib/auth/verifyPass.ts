import { PasswordHash } from "@/_Interfaces/Auth/PasswordHash";
import { pbkdf2Sync } from "node:crypto";

export async function verifyPass(givenPass: string, hashedPass: PasswordHash): Promise<boolean> {
    const hash = pbkdf2Sync(givenPass, hashedPass.salt, hashedPass.iterations, hashedPass.keylen, hashedPass.digest).toString("hex");

    return hash === hashedPass.hash;
}