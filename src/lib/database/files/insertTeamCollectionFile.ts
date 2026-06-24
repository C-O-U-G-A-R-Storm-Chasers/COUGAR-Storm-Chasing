import { FileRecord } from "@/_Interfaces/Files/FileRecord";
import { getMongo } from "@/lib/mongo/getmongo";

export async function insertTeamCollectionFile(fileRecord: FileRecord): Promise<FileRecord | null> {
    const mongo = getMongo();

    return await mongo.database
        .collection<FileRecord>("team-collection-files")
        .findOneAndUpdate(
            { id: fileRecord.id },
            {
                $setOnInsert: { 
                    uploader: fileRecord.uploader
                },
                $set: {
                    id: fileRecord.id,
                    ext: fileRecord.ext,
                    uploadedAt: fileRecord.uploadedAt
                },
            },
            {
                upsert: true,
                returnDocument: "after",
                projection: { _id: 0 }
            }
        );
}