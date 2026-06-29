"use server";

import { unlink } from "node:fs/promises";
import { join } from "node:path";
import getRootPath from "../getRootPath";

export default async function deleteFile(location: string, fileNameWithExt: string): Promise<void> {
    // Ensure dir exists
    const rootPath = getRootPath();
    const dir = join(rootPath, location);
    const filePath = join(dir, fileNameWithExt);

    unlink(filePath);
}