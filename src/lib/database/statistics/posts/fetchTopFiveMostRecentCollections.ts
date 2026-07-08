import { Post } from "@/_Interfaces/Posts/Post";
import { getMongo } from "@/lib/mongo/getmongo";

export async function fetchTopFiveMostRecentPosts(): Promise<Post[]> {
    const mongo = getMongo();

    return await mongo.database
        .collection<Post>("posts")
        .find(
            {},
            {
                projection: {
                    _id: 0,
                },
            },
        )
        .sort({
            uploadedAt: -1,
        })
        .limit(5)
        .toArray();
}