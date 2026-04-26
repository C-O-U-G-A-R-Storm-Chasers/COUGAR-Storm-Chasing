import { PlannedChase } from "@/_Interfaces/Chasers/PlannedChase";
import { getMongo } from "@/lib/mongo/getmongo";

export async function insertPlannedChase(planned_chase: PlannedChase): Promise<PlannedChase | null> {
    const mongo = getMongo();

    const { id, created_timestamp, ...updatedData } = planned_chase;

    return await mongo.database
        .collection<PlannedChase>("planned_chases")
        .findOneAndUpdate(
            { id },
            {
                $setOnInsert: { id, created_timestamp },
                $set: { ...updatedData as PlannedChase },
            },
            {
                upsert: true,
                returnDocument: "after",
                projection: { _id: 0 }
            }
        );
}