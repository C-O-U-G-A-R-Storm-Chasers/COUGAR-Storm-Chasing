import { getMongo } from "@/lib/mongo/getmongo";

export async function countUsers(): Promise<number> {
    const mongo = getMongo();

    return await mongo.database
        .collection("users").countDocuments();
}