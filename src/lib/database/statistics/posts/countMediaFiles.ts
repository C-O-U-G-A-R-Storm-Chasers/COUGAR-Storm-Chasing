import { getMongo } from "@/lib/mongo/getmongo";

export async function countMediaFiles(): Promise<number> {
    const mongo = getMongo();

    return await mongo.database
        .collection("media-files").countDocuments();
}