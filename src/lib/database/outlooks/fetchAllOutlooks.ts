import { Outlook } from "@/_Interfaces/Outlooks/Outlook";
import { getMongo } from "@/lib/mongo/getmongo";

export async function fetchAllOutlooks(): Promise<Outlook[] | null> {
    const mongo = getMongo();

    return await mongo.database
        .collection<Outlook>("outlooks")
        .find({}, { projection: { _id: 0 } })
        .toArray();
}