"use server";

import { BasicResult } from "@/_Interfaces/BasicResult";
import { FileRecord } from "@/_Interfaces/Files/FileRecord";
import { insertTeamCollectionFile } from "@/lib/database/files/insertTeamCollectionFile";
import { fetchWebStats } from "@/lib/database/statistics/fetchWebStats";
import { updateWebStats } from "@/lib/database/statistics/updateWebStats";
import uploadFile from "@/lib/utils/media/uploadFile";

export async function uploadTeamCollectionFile(file: File): Promise<BasicResult<FileRecord | null>> {
    const fileWriteResult = await uploadFile(file, "/team_media");
    
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
        msg: "A technical error occurred. Error Code: FileDB-3 [Unable to upload profile image record]"
    };

    return {
        success: true,
        data: writeToDatabaseResult
    };
}