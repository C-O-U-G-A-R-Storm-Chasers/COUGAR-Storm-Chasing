import { getMongo } from "@/lib/mongo/getmongo";

export async function countPosts(): Promise<number> {
    const mongo = getMongo();

    return await mongo.database
        .collection("posts").countDocuments();
}