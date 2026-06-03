import { PlannedChase } from "@/_Interfaces/Chases/PlannedChase";
import { getMongo } from "@/lib/mongo/getmongo";

export async function fetchPlannedChase(id: PlannedChase["id"]): Promise<PlannedChase | null> {
    const mongo = getMongo();

    return await mongo.database
        .collection<PlannedChase>("planned-chases")
        .findOne({ id }, { projection: { _id: 0 } });
}