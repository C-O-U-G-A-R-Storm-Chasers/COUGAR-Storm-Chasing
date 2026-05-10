import { Outlook } from "@/_Interfaces/Outlooks/Outlook";
import { getMongo } from "@/lib/mongo/getmongo";

export async function insertOutlook(outlook: Outlook) {
    const mongo = getMongo();

    return await mongo.database
        .collection<Outlook>("outlooks")
        .insertOne(outlook);
}