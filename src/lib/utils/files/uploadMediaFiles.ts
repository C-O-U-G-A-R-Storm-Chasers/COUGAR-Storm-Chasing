"use server";

import { join } from "node:path";
import getRootPath from "../getRootPath";
import { mkdir, writeFile } from "node:fs/promises";
import { SupportedImageExtension } from "@/_Types/SupportedImageExtension";
import { SupportedVideoExtension } from "@/_Types/SupportedVideoExtension";
import { safeUUID } from "@/lib/crypto/crypto";
import { UUID } from "node:crypto";
import config from "../../cougar-config.json";
import { autoThumbnail } from "./autoThumbnail";
import { ImageFile, MediaFile } from "@/_Interfaces/Files/MediaFile";
import { User } from "@/_Interfaces/Users/User";
import { BasicResult } from "@/_Interfaces/BasicResult";
import { insertThumbnail } from "@/lib/database/files/insertThumbnail";
import { insertMediaFile } from "@/lib/database/files/insertMediaFile";
import deleteFile from "./deleteFile";
import { deleteMediaFile } from "@/lib/database/files/deleteMediaFile";
import { deleteThumbnail } from "@/lib/database/files/deleteThumbnail";

export async function uploadMediaFiles(uploaderID: User["uid"], files: File[], location: string): Promise<BasicResult<MediaFile[] | null>> {
    // Ensure dir exists
    const rootPath = getRootPath();
    const fullUploadDir = join(rootPath, location);

    await mkdir(fullUploadDir, { recursive: true });

    const timestamp = Date.now();

    // Process the media files
    const response: BasicResult = { success: true, data: null };
    const media: MediaFile[] = [];
    await Promise.all(files.map(async file => {
        const ext = file.name.split(".").pop() as SupportedImageExtension | SupportedVideoExtension | null;
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
        
        const mediaFile: MediaFile = {
            id: fileNameNoExt,
            uploader: uploaderID,
            uploadedAt: timestamp,
            ext,
        };

        // Upload thumbnail if file is a video
        const videoExtensions = config.supported_video_mimes.map(mime => mime.replace("video/", ""));
        const isVideo = videoExtensions.includes(ext.toLowerCase());

        if (isVideo) {
            const thumbnailFullUploadDir = join(rootPath, "/thumbnails");
            const thumbnailExt = "png";
            const thumbnailNameNoExt = fileNameNoExt; // Ensure thumbnail shares parent's ID for easier matching and diag
            const thumbnailNameWithExt = thumbnailNameNoExt + "." + thumbnailExt;

            await autoThumbnail(fullUploadDir, fileNameWithExt, thumbnailFullUploadDir, thumbnailNameWithExt);

            const thumbnail: ImageFile = {
                id: thumbnailNameNoExt,
                uploader: uploaderID,
                uploadedAt: timestamp,
                ext: thumbnailExt,
            };

            mediaFile.thumb = thumbnail.id;

            // Create thumbnail DB record
            const insertThumbnailResult = await insertThumbnail(thumbnail);

            if (!insertThumbnailResult.acknowledged || !insertThumbnailResult.insertedId) {
                response.success = false;
                response.msg = `Unable to insert thumbnail ${thumbnailNameNoExt}: Aborting`
            }
        }

        // Create media DB record
        const insertMediaFileResult = await insertMediaFile(mediaFile);

        if (!insertMediaFileResult) {
            response.success = false;
            response.msg = `Unable to insert media file ${fileNameNoExt}: Aborting`
        }

        media.push(mediaFile);
    }));

    if (!response.success) {
        await Promise.all(media.map(async mediaFile => {
            // Delete media file
            await deleteFile("/user_media", `${mediaFile.id}.${mediaFile.ext}`);

            // Delete media file record
            await deleteMediaFile(mediaFile.id);

            // Delete thumbnail file
            await deleteFile("/user_media", `${mediaFile.id}.png`); // ID is the same as media file

            // Delete thumbnail file record
            await deleteThumbnail(mediaFile.id);
        }));

        return response;
    }

    return {
        success: true,
        data: media
    };
}