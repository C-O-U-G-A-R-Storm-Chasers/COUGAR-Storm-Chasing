import { WebStats } from "@/_Interfaces/Statistics/WebStats";
import { getMongo } from "@/lib/mongo/getmongo";

export async function fetchWebStats(): Promise<WebStats | null> {
    const mongo = getMongo();

    return await mongo.database
        .collection<WebStats>("web-stats")
        .findOne({}, {
            projection: { _id: 0 },
            sort: { _id: -1 }
        });
}