"use server";

import { BasicResult } from "@/_Interfaces/BasicResult";
import { insertTeamCollectionFile } from "@/lib/database/team-collections/insertTeamCollectionFile";
import { fetchWebStats } from "@/lib/database/statistics/fetchWebStats";
import { updateWebStats } from "@/lib/database/statistics/updateWebStats";
import uploadFile from "@/lib/utils/media/uploadFile";
import { CollectionFile } from "@/_Interfaces/Files/Collections/CollectionFile";
import { insertThmbnail } from "@/lib/database/files/insertThumbnail";

export async function uploadTeamCollectionFile(file: File): Promise<BasicResult<CollectionFile | null>> {
    const fileWriteResult = await uploadFile(file, "/team_media", { forceVideo: true });
    
    if (!fileWriteResult.success || !fileWriteResult.data?.id || !fileWriteResult.data?.ext) return {
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
    const writeToDatabaseResult = await insertTeamCollectionFile(fileWriteResult.data);

    if (!writeToDatabaseResult) return {
        success: false,
        msg: "A technical error occurred. Error Code: FileDB-3 [Unable to upload collection file record]"
    };

    const writeThumbnailToDatabaseResult = await insertThmbnail(writeToDatabaseResult.thumb);

    if (!writeThumbnailToDatabaseResult) return {
        success: false,
        msg: "A technical error occurred. Error Code: FileDB-4 [Unable to upload collection file thumbnail record]"
    };

    return {
        success: true,
        data: writeToDatabaseResult
    };
}