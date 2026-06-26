import { CollectionFile } from "@/_Interfaces/Files/Collections/CollectionFile";
import { getMongo } from "@/lib/mongo/getmongo";

export async function insertTeamCollectionFile(collectionFile: CollectionFile): Promise<CollectionFile | null> {
    const mongo = getMongo();

    return await mongo.database
        .collection<CollectionFile>("team-collection-files")
        .findOneAndUpdate(
            { id: collectionFile.id },
            {
                $setOnInsert: { 
                    uploader: collectionFile.uploader
                },
                $set: {
                    id: collectionFile.id,
                    ext: collectionFile.ext,
                    uploadedAt: collectionFile.uploadedAt,
                    thumb: collectionFile.thumb
                },
            },
            {
                upsert: true,
                returnDocument: "after",
                projection: { _id: 0 }
            }
        );
}