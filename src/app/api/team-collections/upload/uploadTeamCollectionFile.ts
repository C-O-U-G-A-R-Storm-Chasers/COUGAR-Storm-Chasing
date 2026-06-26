"use server";

import { BasicResult } from "@/_Interfaces/BasicResult";
import { insertTeamCollectionFile } from "@/lib/database/team-collections/insertTeamCollectionFile";
import uploadFile from "@/lib/utils/media/uploadFile";
import { CollectionFile } from "@/_Interfaces/Files/Collections/CollectionFile";
import { insertThumbnail } from "@/lib/database/files/insertThumbnail";

export async function uploadTeamCollectionFile(file: File): Promise<BasicResult<CollectionFile | null>> {
    // Write the video file itself
    // With forceVideo, returns BasicResult with UploadVideoFileReturn
    const fileWriteResult = await uploadFile(file, "/team_media", { forceVideo: true });

    if (process.env.NODE_ENV === "development") console.log({ collectionFile: fileWriteResult.data?.collectionFile });
    
    if (
        !fileWriteResult.success ||
        !fileWriteResult.data?.collectionFile?.id ||
        !fileWriteResult.data?.collectionFile?.ext
    ) return {
        success: fileWriteResult.success,
        msg: fileWriteResult.msg
    };

    if (!fileWriteResult.data?.collectionFile?.thumb) return {
        success: fileWriteResult.success,
        msg: "Collection file was returned without a thumbnail object. This is an error! Please contact an administrator."
    };

    if (process.env.NODE_ENV === "development") console.log({ collectionFileThumbBeforeUpload: fileWriteResult.data?.collectionFile?.thumb });

    // Write to database
    const writeCollectionFileToDatabaseResult = await insertTeamCollectionFile(fileWriteResult.data.collectionFile);

    if (process.env.NODE_ENV === "development") console.log({ writeCollectionFileToDatabaseResult });

    if (!writeCollectionFileToDatabaseResult) return {
        success: false,
        msg: "A technical error occurred. Error Code: FileDB-3 [Unable to upload collection file record]"
    };

    const writeThumbnailToDatabaseResult = await insertThumbnail(fileWriteResult.data.thumb);

    if (!writeThumbnailToDatabaseResult) return {
        success: false,
        msg: "A technical error occurred. Error Code: FileDB-4 [Unable to upload collection file thumbnail record]"
    };

    return {
        success: true,
        data: writeCollectionFileToDatabaseResult
    };
}