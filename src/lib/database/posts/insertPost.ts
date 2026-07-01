import { Post } from "@/_Interfaces/Posts/Post";
import { getMongo } from "@/lib/mongo/getmongo";

export async function insertPost(post: Post): Promise<Post | null> {
    const mongo = getMongo();

    return await mongo.database
        .collection<Post>("posts")
        .findOneAndUpdate(
            { id: post.id },
            {
                $setOnInsert: { 
                    id: post.id,
                    uploader: post.uploader,
                    uploadedAt: post.uploadedAt,
                },
                $set: {
                    body: post.body,
                    files: post.files
                },
            },
            {
                upsert: true,
                returnDocument: "after",
                projection: { _id: 0 }
            }
        );
}