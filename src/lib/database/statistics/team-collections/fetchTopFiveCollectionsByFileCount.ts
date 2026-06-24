import { TeamCollection } from "@/_Interfaces/TeamCollections/TeamCollection";
import { getMongo } from "@/lib/mongo/getmongo";
import { UUID } from "crypto";

export async function fetchTopFiveCollectionsByFileCount(): Promise<TeamCollection["id"][]> {
    const mongo = getMongo();

    const collections = await mongo.database
        .collection<TeamCollection>("team-collections")
        .aggregate<{ id: UUID }>([
            {
                $addFields: {
                    fileCount: { $size: "$files" },
                },
            },
            {
                $sort: {
                    fileCount: -1,
                },
            },
            {
                $limit: 5,
            },
            {
                $project: {
                    _id: 0,
                    id: 1,
                },
            },
        ])
        .toArray();

    return collections.map(collection => collection.id);
}