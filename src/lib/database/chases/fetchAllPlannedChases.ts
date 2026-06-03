import { PlannedChase } from "@/_Interfaces/Chases/PlannedChase";
import { getMongo } from "@/lib/mongo/getmongo";

export async function fetchAllPlannedChases(): Promise<PlannedChase[] | null> {
    const mongo = getMongo();

    return await mongo.database
        .collection<PlannedChase>("planned-chases")
        .find({}, { projection: { _id: 0 } })
        .toArray();
}