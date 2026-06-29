"use server";

import { BasicResult } from "@/_Interfaces/BasicResult";
import { User } from "@/_Interfaces/Users/User";
import { fetchWebStats } from "@/lib/database/statistics/fetchWebStats";
import { updateWebStats } from "@/lib/database/statistics/updateWebStats";
import { ProfileImage } from "@/_Interfaces/Files/Images/ProfileImage";
import { insertProfileImage } from "@/lib/database/files/insertProfileImage";
import { SupportedImageExtension } from "@/_Types/SupportedImageExtension";
import uploadFile from "@/lib/utils/files/uploadFile";

export async function processProfileImage(uid: User["uid"], selectedFile: File): Promise<BasicResult<ProfileImage>> {
    const fileWriteResult = await uploadFile(selectedFile, "/profile_images", { userRegistrationMode: true, uid });

    if (!fileWriteResult.success || !fileWriteResult.data?.id || !fileWriteResult.data?.ext) return {
        success: fileWriteResult.success,
        msg: fileWriteResult.msg
    };

    // Configure the ProfileImage object
    const profileImage: ProfileImage = {
        id: fileWriteResult.data.id,
        uid,
        ext: fileWriteResult.data.ext as SupportedImageExtension,
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

    if (!writeToDatabaseResult.acknowledged || !writeToDatabaseResult.insertedId) return {
        success: false,
        msg: "A technical error occurred. Error Code: FileDB-3 [Unable to upload profile image record]"
    };

    return {
        success: true,
        data: profileImage
    };
}