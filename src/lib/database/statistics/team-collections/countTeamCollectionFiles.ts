import { getMongo } from "@/lib/mongo/getmongo";

export async function countTeamCollectionFiles(): Promise<number> {
    const mongo = getMongo();

    return await mongo.database
        .collection("team-collection-files").countDocuments();
}