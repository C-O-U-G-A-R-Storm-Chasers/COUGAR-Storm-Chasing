"use server";

import { BasicResult } from "@/_Interfaces/BasicResult";
import { FileRecord } from "@/_Interfaces/Files/FileRecord";
import { redirect } from "next/navigation";
import { TeamMediaFileUploadAction } from "./TeamMediaFileUploadAction";
import { deleteTeamMediaFile } from "@/lib/database/files/deleteTeamMediaFile";
import deleteFile from "@/lib/utils/media/deleteFile";
import { TeamMediaCollection } from "@/_Interfaces/Files/Media/TeamMediaCollection";
import { safeUUID } from "@/lib/crypto/crypto";
import { UUID } from "crypto";
import { signinValidation } from "@/lib/auth/SigninValidation/signinValidation";
import { PermissionLevels } from "@/_Enums/PermissionLevels";
import { insertTeamMediaCollection } from "@/lib/database/files/insertTeamMediaCollection";

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export async function TeamMediaCollectionUploadAction(prevState: any, data: FormData): Promise<BasicResult<TeamMediaCollection | null> | void> {
    let failureDetected = false;
    let failureMsg = "";

    const { success, msg, data: user } = await signinValidation(PermissionLevels.ADMIN);
        
    if (!success || !user) return {
        success: false,
        msg: `The user is not signed in or doesn't have sufficient permissions to upload team collections!: ${msg}`
    };

    const title = data.get("title") as string;
    const description = data.get("description") as string;
    const captureDate = data.get("capture-date") as string;
    const media = data.getAll("team-media") as File[] | null;

    // Abort if no media was uploaded (shouldn't happen)
    if (!media) return {
        success: false,
        msg: "There must be media included in the collection!"
    };

    // Initialize to collect uploaded fileRecord IDs
    const collectedFileRecords: FileRecord[] = [];

    // Attempt to upload all files
    const files = Array.from(media);

    await Promise.all(files.map(async file => {
        if (failureDetected) return;

        const { success, msg, data: fileRecord } = await TeamMediaFileUploadAction(file);

        if (fileRecord) collectedFileRecords.push(fileRecord);

        if (!success) {
            failureDetected = true;
            failureMsg = "There was an error uploading one or more of the files."

            console.error(`[Team Media File Upload Error] ${msg}`)
        }
    }));

    // Upload the record
    const collection: TeamMediaCollection = {
        id: safeUUID() as UUID,
        uploader: user.uid,
        uploadedAt: Date.now(),
        captureDate: captureDate as TeamMediaCollection["captureDate"],
        title,
        description,
        files: collectedFileRecords.map(record => record.id)
    };

    if (!failureDetected) {
        const collectionInsertResult = await insertTeamMediaCollection(collection);

        if (!collectionInsertResult) {
            failureDetected = true;
            failureMsg = "There was an error inserting the collection into the database. Please try again or contact an administrator.";
        }
    }

    // Delete all files & records if any failures occur
    if (failureDetected) {
        await Promise.all(collectedFileRecords.map(async record => {
            await deleteTeamMediaFile(record.id);
            await deleteFile("/team_media", record.id + "." + record.ext);
        }));

        return {
            success: false,
            msg: failureMsg
        };
    }

    if (!failureDetected) redirect("/dashboard/media/view");
}