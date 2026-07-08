import { Post } from "@/_Interfaces/Posts/Post";
import { getMongo } from "@/lib/mongo/getmongo";

export async function fetchTopFivePostsByFileCount(): Promise<Post[]> {
    const mongo = getMongo();

    return await mongo.database
        .collection<Post>("posts")
        .aggregate<Post>([
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
                },
            },
        ])
        .toArray();
}