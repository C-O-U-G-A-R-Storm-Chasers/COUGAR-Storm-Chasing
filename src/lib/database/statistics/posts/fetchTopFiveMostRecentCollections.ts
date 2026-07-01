import { Post } from "@/_Interfaces/Posts/Post";
import { getMongo } from "@/lib/mongo/getmongo";

interface Result {
    id: Post["id"],
    body: Post["body"]
}

export async function fetchTopFiveMostRecentPosts(): Promise<Result[]> {
    const mongo = getMongo();

    const collections = await mongo.database
        .collection<Post>("posts")
        .find(
            {},
            {
                projection: {
                    _id: 0,
                    id: 1,
                    title: 1,
                },
            },
        )
        .sort({
            uploadedAt: -1,
        })
        .limit(5)
        .toArray();

    return collections.map(collection => {
        return {
            id: collection.id,
            body: collection.body
        }
    });
}