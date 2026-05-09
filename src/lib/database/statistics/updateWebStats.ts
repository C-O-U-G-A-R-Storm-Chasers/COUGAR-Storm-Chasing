import { WebStats } from "@/_Interfaces/Statistics/WebStats";
import { getMongo } from "@/lib/mongo/getmongo";

export async function updateWebStats(newStats: WebStats): Promise<void> {
    const mongo = getMongo();

    await mongo.database
        .collection<WebStats>("web-stats")
        .insertOne({
            ...newStats,
            id: newStats.id + 1
        });
}