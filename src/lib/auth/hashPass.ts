import { PasswordHash } from "@/_Interfaces/Auth/PasswordHash";
import { pbkdf2Sync, randomBytes } from "node:crypto";

export async function hashPass(pass: string): Promise<PasswordHash> {
    const salt = randomBytes(16).toString("hex");
    const iterations = 100_000;
    const keylen = 64;
    const digest = "sha512";

    const hash = pbkdf2Sync(pass, salt, iterations, keylen, digest).toString("hex");

    return {
        salt,
        hash,
        iterations,
        keylen,
        digest
    };
}