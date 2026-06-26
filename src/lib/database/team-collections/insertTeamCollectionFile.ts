import { CollectionFile } from "@/_Interfaces/Files/Collections/CollectionFile";
import { getMongo } from "@/lib/mongo/getmongo";

export async function insertTeamCollectionFile(fileRecord: CollectionFile): Promise<CollectionFile | null> {
    const mongo = getMongo();

    return await mongo.database
        .collection<CollectionFile>("team-collection-files")
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