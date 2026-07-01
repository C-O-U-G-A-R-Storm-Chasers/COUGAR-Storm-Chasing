import { Post } from "@/_Interfaces/Posts/Post";
import { getMongo } from "@/lib/mongo/getmongo";

interface Result {
    id: Post["id"],
    body: Post["body"]
}

export async function fetchTopFivePostsByFileCount(): Promise<Result[]> {
    const mongo = getMongo();

    const collections = await mongo.database
        .collection<Post>("posts")
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
            body: collection.body
        }
    });
}