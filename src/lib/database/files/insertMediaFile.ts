import { MediaFile } from "@/_Interfaces/Files/MediaFile";
import { getMongo } from "@/lib/mongo/getmongo";

export async function insertMediaFile(file: MediaFile): Promise<MediaFile | null> {
    const mongo = getMongo();

    return await mongo.database
        .collection<MediaFile>("media-files")
        .findOneAndUpdate(
            { id: file.id },
            {
                $setOnInsert: {
                    id: file.id,
                    ext: file.ext,
                    uploader: file.uploader,
                    uploadedAt: file.uploadedAt
                },
                $set: { thumb: file.thumb },
            },
            {
                upsert: true,
                returnDocument: "after",
                projection: { _id: 0 }
            }
        );
}