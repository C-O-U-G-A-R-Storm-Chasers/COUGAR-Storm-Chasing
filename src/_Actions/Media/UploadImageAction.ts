"use server";

import { BasicResult } from "@/_Interfaces/BasicResult";
import { PendingUploadFile } from "@/_Interfaces/Media/PendingUploadFile";
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

export async function UploadImageAction(pendingFiles: Array<PendingUploadFile>): Promise<BasicResult> {
    if (!pendingFiles || pendingFiles.length === 0) return {
        success: false,
        msg: "No files were passed to the server action."
    };

    // Ensure dir exists
    const dir = join("/uploaded_files", "images");
    await mkdir(dir, { recursive: true });

    // Loop over each
    const processedFileURLs: Array<string> = [];
    for (const pendingFile of pendingFiles) {
        try {
            const file = pendingFile.file;
            const desiredName = pendingFile.desiredName;

            // Parse file name
            const ext = file.name.split(".").pop() ?? "png";
            const fileName = `${!desiredName ? crypto.randomUUID() : desiredName}.${ext}`;
            const filePath = join(dir, fileName);

            // Convert to buffer
            const arrayBuffer = await file.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);

            // Save file
            await writeFile(filePath, buffer);

            // Process and return data
            processedFileURLs.push(`media/images/${fileName}`);
        } catch (error: any) { /* eslint-disable-line @typescript-eslint/no-explicit-any */
            return {
                success: false,
                msg: "Error uploading files: " + error
            }
        }
    }

    return {
        success: true,
        data: processedFileURLs
    }
}