"use server";

import { BasicResult } from "@/_Interfaces/BasicResult";
import { SelectedFile } from "@/_Interfaces/Files/SelectedFile";
import { UploadedFile } from "@/_Interfaces/Files/UploadedFile";
import { User } from "@/_Interfaces/Users/User";
import { insertFile } from "@/lib/database/files/insertFile";
import { cookies } from "next/headers";
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import config from "../../../lib/cougar-config.json";

export async function FileUploadAction(selectedFile: SelectedFile): Promise<BasicResult<UploadedFile>> {
    if (!selectedFile) return {
        success: false,
        msg: "A technical error occurred. Error Code: File-1"
    };

    const cookiesStore = cookies();
    const userRaw = (await cookiesStore).get("user")?.value;
    let user: User | null = null;

    if (userRaw) user = JSON.parse(userRaw) as User | null;

    if (!user) return {
        success: false,
        msg: "A technical error occurred. Error Code: File-2"
    };

    const file = selectedFile.file;
    const desiredName = selectedFile.desiredName;
    const desiredPath = selectedFile.desiredPath;

    // Ensure dir exists
    const dir = join("/uploads", desiredPath);

    await mkdir(dir, { recursive: true });

    // Convert to buffer & save
    const ext = file.name.split(".").pop();

    if (!ext) return {
        success: false,
        msg: "A technical error occurred. Error Code: File-3"
    };
    
    const fileName = `${!desiredName ? crypto.randomUUID() : desiredName}.${ext}`;
    const filePath = join(dir, fileName);
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const hostname = process.env.NODE_ENV === "development" ? config["dev-hostname"] : config["prod-hostname"];
    const webPath = `${hostname}/media/${fileName}`.replace(/\\/g, "/");

    if (process.env.NODE_ENV === "development") console.log("\n\n", "Uploaded File Web Path:", "\n", webPath, "\n\n");

    await writeFile(filePath, buffer);

    const uploadedFile: UploadedFile = {
        webPath,
        timestamp: selectedFile.timestamp,
        uploadedBy: user.uid,
        type: file.type.split("/")[0]
    };

    // Write to database
    const writeToDatabaseResult = await insertFile(uploadedFile);

    if (!writeToDatabaseResult) return {
        success: false,
        msg: "A technical error occurred. Error Code: File-4"
    };

    return {
        success: true,
        data: writeToDatabaseResult
    }
}