import { PlannedChase } from "@/_Interfaces/Chases/PlannedChase";
import { getMongo } from "@/lib/mongo/getmongo";

export async function fetchLatestPlannedChase(): Promise<PlannedChase | null> {
    const mongo = getMongo();

    return await mongo.database
        .collection<PlannedChase>("planned-chases")
        .findOne({}, {
            projection: { _id: 0 },
            sort: { _id: -1 }
        });
}