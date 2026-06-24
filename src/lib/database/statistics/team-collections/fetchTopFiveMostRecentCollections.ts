import { TeamCollection } from "@/_Interfaces/TeamCollections/TeamCollection";
import { getMongo } from "@/lib/mongo/getmongo";

export async function fetchTopFiveMostRecentCollections(): Promise<TeamCollection["id"][]> {
    const mongo = getMongo();

    const collections = await mongo.database
        .collection<TeamCollection>("team-collections")
        .find(
            {},
            {
                projection: {
                    _id: 0,
                    id: 1,
                },
            },
        )
        .sort({
            uploadedAt: -1,
        })
        .limit(5)
        .toArray();

    return collections.map(collection => collection.id);
}