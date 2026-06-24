import { getMongo } from "@/lib/mongo/getmongo";

export async function countTeamCollections(): Promise<number> {
    const mongo = getMongo();

    return await mongo.database
        .collection("team-collections").countDocuments();
}