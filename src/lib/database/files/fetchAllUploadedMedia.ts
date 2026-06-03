import { UploadedFile } from "@/_Interfaces/Files/UploadedFile";
import { getMongo } from "@/lib/mongo/getmongo";

export async function fetchAllUploadedMedia(): Promise<UploadedFile[] | null> {
    const mongo = getMongo();

    return await mongo.database
        .collection<UploadedFile>("files")
        .find(
            {
                webPath: { $regex: /\.(png|jpg|jpeg|gif|webp|mp4|webm|mov)$/i }
            },
            { projection: { _id: 0 } }
        )
        .toArray();
}