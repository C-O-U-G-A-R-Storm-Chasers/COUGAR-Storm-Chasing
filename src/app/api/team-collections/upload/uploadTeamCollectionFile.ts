"use server";

import { BasicResult } from "@/_Interfaces/BasicResult";
import { insertTeamCollectionFile } from "@/lib/database/team-collections/insertTeamCollectionFile";
import { fetchWebStats } from "@/lib/database/statistics/fetchWebStats";
import { updateWebStats } from "@/lib/database/statistics/updateWebStats";
import uploadFile from "@/lib/utils/media/uploadFile";
import { CollectionFile } from "@/_Interfaces/Files/Collections/CollectionFile";
import { insertThumbnail } from "@/lib/database/files/insertThumbnail";

export async function uploadTeamCollectionFile(file: File): Promise<BasicResult<CollectionFile | null>> {
    // Write the video file itself
    // With forceVideo, returns BasicResult with UploadVideoFileReturn
    const fileWriteResult = await uploadFile(file, "/team_media", { forceVideo: true });

    console.log({ fileWriteResult });
    
    if (!fileWriteResult.success || !fileWriteResult.data?.collectionFile?.id || !fileWriteResult.data?.collectionFile?.ext) return {
        success: fileWriteResult.success,
        msg: fileWriteResult.msg
    };

    // Update web webStats
    const webStats = await fetchWebStats();
    
    if (webStats) await updateWebStats({
        ...webStats,
        filesUploaded: webStats.filesUploaded + 1
    });

    // Write to database
    const writeToDatabaseResult = await insertTeamCollectionFile(fileWriteResult.data.collectionFile);

    console.log({ writeToDatabaseResult });

    if (!writeToDatabaseResult) return {
        success: false,
        msg: "A technical error occurred. Error Code: FileDB-3 [Unable to upload collection file record]"
    };

    const writeThumbnailToDatabaseResult = await insertThumbnail(fileWriteResult.data.thumb);

    console.log({ writeThumbnailToDatabaseResult });

    if (!writeThumbnailToDatabaseResult) return {
        success: false,
        msg: "A technical error occurred. Error Code: FileDB-4 [Unable to upload collection file thumbnail record]"
    };

    return {
        success: true,
        data: writeToDatabaseResult
    };
}