"use server";

import { unlink } from "node:fs/promises";
import { join } from "node:path";

export default async function deleteFile(location: string, fileNameWithExt: string): Promise<void> {
    // Ensure dir exists
    const dir = join(location);
    const filePath = join(dir, fileNameWithExt);

    unlink(filePath);
}