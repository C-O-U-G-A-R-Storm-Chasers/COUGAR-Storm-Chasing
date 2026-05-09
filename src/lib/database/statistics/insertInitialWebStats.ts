import { WebStats } from "@/_Interfaces/Statistics/WebStats";
import { getMongo } from "@/lib/mongo/getmongo";

export async function insertInitialWebStats(): Promise<void> {
    const mongo = getMongo();

    await mongo.database
        .collection<WebStats>("web-stats")
        .insertOne({
            id: 1,
            signinCount: 0,
            webVisits: 1,
            filesUploaded: 0,
        });
}