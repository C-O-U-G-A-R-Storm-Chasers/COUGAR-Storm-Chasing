import { UploadedFile } from "@/_Interfaces/Files/UploadedFile";
import { getMongo } from "@/lib/mongo/getmongo";

export async function insertFile(file: UploadedFile): Promise<UploadedFile | null> {
    const mongo = getMongo();

    return await mongo.database
        .collection<UploadedFile>("files")
        .findOneAndUpdate(
            { webPath: file.webPath },
            {
                $setOnInsert: { 
                    timestamp: file.timestamp,
                    uploadedBy: file.uploadedBy
                },
                $set: { webPath: file.webPath },
            },
            {
                upsert: true,
                returnDocument: "after",
                projection: { _id: 0 }
            }
        );
}