"use server";

import { BasicResult } from "@/_Interfaces/BasicResult";
import { User } from "@/_Interfaces/Users/User";
import { ProfileImage } from "@/_Interfaces/Files/ProfileImage";
import { insertProfileImage } from "@/lib/database/files/insertProfileImage";
import { SupportedImageExtension } from "@/_Types/SupportedImageExtension";
import getRootPath from "@/lib/utils/getRootPath";
import { join } from "node:path";
import { mkdir, writeFile } from "node:fs/promises";
import { safeUUID } from "@/lib/crypto/crypto";
import { UUID } from "node:crypto";
import deleteFile from "@/lib/utils/files/deleteFile";

export async function uploadProfileImage(uid: User["uid"], file: File): Promise<BasicResult<ProfileImage | null>> {
    // Ensure dir exists
    const rootPath = getRootPath();
    const fullUploadDir = join(rootPath, "/profile_images");

    await mkdir(fullUploadDir, { recursive: true });

    const timestamp = Date.now();

    const ext = file.name.split(".").pop() as SupportedImageExtension | null;
    const fileNameNoExt = safeUUID() as UUID;
    const fileNameWithExt = fileNameNoExt + "." + ext;
    const filePath = join(fullUploadDir, fileNameWithExt);
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    if (!ext) return {
        success: false,
        msg: "A technical error occurred: The file extension could not be parsed!",
        data: null
    };

    await writeFile(filePath, buffer);
    
    const image: ProfileImage = {
        id: fileNameNoExt,
        uid,
        uploadedAt: timestamp,
        ext,
    };

    // Create profile image DB record
    const insertMediaFileResult = await insertProfileImage(image);

    if (!insertMediaFileResult.acknowledged || !insertMediaFileResult.insertedId) {
        await deleteFile("/profile_images", `${image.id}.${image.ext}`);

        return {
            success: false,
            msg: `Unable to insert profile image ${fileNameNoExt}: Aborting`
        };
    }

    return {
        success: true,
        data: image
    };
}