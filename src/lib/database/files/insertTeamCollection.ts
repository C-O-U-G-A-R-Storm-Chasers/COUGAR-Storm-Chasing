import { TeamCollection } from "@/_Interfaces/TeamCollections/TeamCollection";
import { getMongo } from "@/lib/mongo/getmongo";

export async function insertTeamCollection(collection: TeamCollection): Promise<TeamCollection | null> {
    const mongo = getMongo();

    return await mongo.database
        .collection<TeamCollection>("team-collections")
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