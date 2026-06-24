import { TeamMediaCollection } from "@/_Interfaces/Files/Media/TeamMediaCollection";
import { getMongo } from "@/lib/mongo/getmongo";

export async function insertTeamMediaCollection(collection: TeamMediaCollection): Promise<TeamMediaCollection | null> {
    const mongo = getMongo();

    return await mongo.database
        .collection<TeamMediaCollection>("team-media-collections")
        .findOneAndUpdate(
            { id: collection.id },
            {
                $setOnInsert: { 
                    id: collection.id
                },
                $set: {
                    uploader: collection.uploader,
                    uploadedAt: collection.uploadedAt,
                    captureDate: collection.captureDate,
                    title: collection.title,
                    description: collection.description,
                    files: collection.files
                },
            },
            {
                upsert: true,
                returnDocument: "after",
                projection: { _id: 0 }
            }
        );
}