"use server";

import { PermissionLevels } from "@/_Enums/PermissionLevels";
import { FileRecord } from "@/_Interfaces/Files/FileRecord";
import { signinValidation } from "@/lib/auth/SigninValidation/signinValidation";
import { safeUUID } from "@/lib/crypto/crypto";
import deleteFile from "@/lib/utils/media/deleteFile";
import { UUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { uploadTeamCollectionFile } from "./uploadTeamCollectionFile";
import { TeamCollection } from "@/_Interfaces/TeamCollections/TeamCollection";
import { insertTeamCollection } from "@/lib/database/files/insertTeamCollection";
import { deleteTeamCollectionFile } from "@/lib/database/files/deleteTeamCollectionFile";

export async function POST(request: NextRequest) {
    let failureDetected = false;
    let failureMsg = "";

    const { success, msg, data: user } = await signinValidation(PermissionLevels.ADMIN);
        
    if (!success || !user) return NextResponse.json({
        success: false,
        msg: `The user is not signed in or doesn't have sufficient permissions to upload team collections!: ${msg}`
    });

    const data = await request.formData();
    const title = data.get("title") as string;
    const description = data.get("description") as string;
    const captureDate = data.get("capture-date") as string;
    const media = data.getAll("team-media") as File[] | null;

    // Abort if no media was uploaded (shouldn't happen)
    if (!media) return NextResponse.json({
        success: false,
        msg: "There must be media included in the collection!"
    });

    // Initialize to collect uploaded fileRecord IDs
    const collectedFileRecords: FileRecord[] = [];

    // Attempt to upload all files
    const files = Array.from(media);

    await Promise.all(files.map(async file => {
        if (failureDetected) return;

        const { success, msg, data: fileRecord } = await uploadTeamCollectionFile(file);

        if (fileRecord) collectedFileRecords.push(fileRecord);

        if (!success) {
            failureDetected = true;
            failureMsg = "There was an error uploading one or more of the files."

            console.error(`[Team Media File Upload Error] ${msg}`)
        }
    }));

    // Upload the record
    const collection: TeamCollection = {
        id: safeUUID() as UUID,
        uploader: user.uid,
        uploadedAt: Date.now(),
        captureDate: captureDate as TeamCollection["captureDate"],
        title,
        description,
        files: collectedFileRecords.map(record => record.id)
    };

    if (!failureDetected) {
        const collectionInsertResult = await insertTeamCollection(collection);

        if (!collectionInsertResult) {
            failureDetected = true;
            failureMsg = "There was an error inserting the collection into the database. Please try again or contact an administrator.";
        }
    }

    // Delete all files & records if any failures occur
    if (failureDetected) {
        await Promise.all(collectedFileRecords.map(async record => {
            await deleteTeamCollectionFile(record.id);
            await deleteFile("/team_media", record.id + "." + record.ext);
        }));

        return NextResponse.json({
            success: false,
            msg: failureMsg
        });
    }

    if (!failureDetected) return NextResponse.json({
        success: true,
        msg: "Collection successfully submitted! Please wait...",
        data: collection.id
    });
}