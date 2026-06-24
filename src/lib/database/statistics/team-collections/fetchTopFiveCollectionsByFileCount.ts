import { TeamCollection } from "@/_Interfaces/TeamCollections/TeamCollection";
import { getMongo } from "@/lib/mongo/getmongo";

interface Result {
    id: TeamCollection["id"],
    title: TeamCollection["title"]
}

export async function fetchTopFiveCollectionsByFileCount(): Promise<Result[]> {
    const mongo = getMongo();

    const collections = await mongo.database
        .collection<TeamCollection>("team-collections")
        .aggregate<Result>([
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
                    title: 1,
                },
            },
        ])
        .toArray();

    return collections.map(collection => {
        return {
            id: collection.id,
            title: collection.title
        }
    });
}