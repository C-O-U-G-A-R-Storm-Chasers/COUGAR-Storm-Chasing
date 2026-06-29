"use server";

import { BasicResult } from "@/_Interfaces/BasicResult";
import { FileRecord } from "@/_Interfaces/Files/FileRecord";
import { SupportedImageExtension } from "@/_Types/SupportedImageExtension";
import { SupportedVideoExtension } from "@/_Types/SupportedVideoExtension";
import { signinValidation } from "@/lib/auth/SigninValidation/signinValidation";
import { safeUUID } from "@/lib/crypto/crypto";
import { UUID } from "node:crypto";
import { writeFile, mkdir } from "node:fs/promises";
import { join } from "node:path";
import config from "../../cougar-config.json";
import { autoThumbnail } from "./autoThumbnail";
import { CollectionFile } from "@/_Interfaces/Files/Collections/CollectionFile";
import { Thumbnail } from "@/_Interfaces/Files/Thumbnails/Thumbnail";
import getRootPath from "../getRootPath";

interface UploadVideoFileReturn {
    collectionFile: CollectionFile,
    thumb: Thumbnail
}

export default async function uploadFile(
    file: File,
    location: string,
    opts: {
        bypassSigninValidation: boolean, // For things like file upload via registration
    }
): Promise<BasicResult<FileRecord | null>>;

export default async function uploadFile(
    file: File,
    location: string,
    opts: {
        bypassSigninValidation: boolean, // For things like file upload via registration
        forceVideo?: true
    }
): Promise<BasicResult<UploadVideoFileReturn | null>>;

export default async function uploadFile(
    file: File,
    location: string,
    opts: {
        bypassSigninValidation: boolean, // For things like file upload via registration
        forceVideo?: boolean
    }
): Promise<BasicResult<FileRecord | UploadVideoFileReturn | null>> {
    const { success, msg, data: user } = await signinValidation();
    
    if (!success || !user) return {
        success: false,
        msg: `A technical error occurred. Error Code: File-0 [The user is not signed in]: ${msg}`
    };

    if (!file) return {
        success: false,
        msg: "A technical error occurred. Error Code: File-1 [No file was passed to uploader action]"
    };

    // Ensure dir exists
    const rootPath = getRootPath();
    const dir = join(rootPath, location);

    await mkdir(dir, { recursive: true });

    // Convert to buffer & write it
    const ext = file.name.split(".").pop() as SupportedImageExtension | SupportedVideoExtension | null;

    if (!ext) return {
        success: false,
        msg: "A technical error occurred. Error Code: File-2 [File extension could not be parsed]"
    };
    
    const fileNameNoExt = safeUUID() as UUID;
    const fileNameWithExt = fileNameNoExt + "." + ext;
    const filePath = join(dir, fileNameWithExt);
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    await writeFile(filePath, buffer);

    const currentTimestamp = Date.now();

    const record: FileRecord = {
        id: fileNameNoExt,
        uploader: user.uid,
        uploadedAt: currentTimestamp,
        ext
    };

    // Overload: If the file is a video, create a thumbnail for it
    const videoExtensions = config.supported_video_mimes.map(mime => mime.replace("video/", ""));
    const isVideo = videoExtensions.includes(record.ext.toLowerCase());

    if (isVideo || opts?.forceVideo) {
        const thumbnailDir = join(rootPath, "/thumbnails");
        const thumbnailExt = "png";
        const thumbnailNameNoExt = fileNameNoExt; // Ensure thumbnail shares parent's ID for easier matching and diag
        const thumbnailNameWithExt = thumbnailNameNoExt + "." + thumbnailExt;

        await autoThumbnail(dir, fileNameWithExt, thumbnailDir, thumbnailNameWithExt);

        const thumb: Thumbnail = {
            id: thumbnailNameNoExt,
            uploader: user.uid,
            uploadedAt: currentTimestamp,
            ext: thumbnailExt as SupportedImageExtension
        };

        const collectionFile: CollectionFile = {
            ...record,
            ext: ext as SupportedVideoExtension,
            thumb: thumb.id
        };

        return {
            success: true,
            msg: "Successfully uploaded video",
            data: { collectionFile, thumb }
        };
    }

    return {
        success: true,
        msg: "Successfully uploaded file",
        data: record
    };
}