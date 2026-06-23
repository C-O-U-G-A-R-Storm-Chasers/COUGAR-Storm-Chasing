"use server";

import { BasicResult } from "@/_Interfaces/BasicResult";
import { User } from "@/_Interfaces/Users/User";
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import config from "../../../lib/cougar-config.json";
import { fetchWebStats } from "@/lib/database/statistics/fetchWebStats";
import { updateWebStats } from "@/lib/database/statistics/updateWebStats";
import { safeUUID } from "@/lib/crypto/crypto";
import { ProfileImage } from "@/_Interfaces/Files/ProfileImage";
import { UUID } from "node:crypto";
import { SupportedImageExtension } from "@/_Interfaces/Files/Images/SupportedImageExtension";
import { insertProfileImage } from "@/lib/database/files/insertProfileImage";

export async function ProfileImageUploadAction(uid: User["uid"], selectedFile: File): Promise<BasicResult<ProfileImage>> {
    if (!selectedFile) return {
        success: false,
        msg: "A technical error occurred. Error Code: File-1 [No file was passed to uploader action]"
    };

    // Ensure dir exists
    const dir = join("/profile_images");

    await mkdir(dir, { recursive: true });

    // Convert to buffer & write it
    const ext = selectedFile.name.split(".").pop() as SupportedImageExtension | null;

    if (!ext) return {
        success: false,
        msg: "A technical error occurred. Error Code: File-2 [File extension could not be parsed]"
    };
    
    const fileName = safeUUID() as UUID;
    const fileNameWithExt = fileName + "." + ext;
    const filePath = join(dir, fileNameWithExt);
    const arrayBuffer = await selectedFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const hostname = process.env.NODE_ENV === "development" ? config["dev-hostname"] : config["prod-hostname"];
    const webPath = `${hostname}/media/${fileNameWithExt}`.replace(/\\/g, "/");

    if (process.env.NODE_ENV === "development") console.log("\n\n", "Uploaded File Web Path:", "\n", webPath, "\n\n");

    await writeFile(filePath, buffer);

    // Configure the ProfileImage object
    const profileImage: ProfileImage = {
        id: fileName,
        uid,
        ext,
        uploadedAt: Date.now()
    };

    // Update web webStats
    const webStats = await fetchWebStats();
    
    if (webStats) await updateWebStats({
        ...webStats,
        filesUploaded: webStats.filesUploaded + 1
    });

    // Write to database
    const writeToDatabaseResult = await insertProfileImage(profileImage);

    if (!writeToDatabaseResult) return {
        success: false,
        msg: "A technical error occurred. Error Code: File-3 [Unable to upload profile image record]"
    };

    return {
        success: true,
        data: writeToDatabaseResult
    }
}