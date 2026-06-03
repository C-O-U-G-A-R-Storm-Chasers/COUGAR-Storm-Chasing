import { Outlook } from "@/_Interfaces/Outlooks/Outlook";
import { getMongo } from "@/lib/mongo/getmongo";

export async function fetchLatestOutlook(outlookDay: Outlook["outlookDay"]): Promise<Outlook | null> {
    const mongo = getMongo();

    return await mongo.database
        .collection<Outlook>("outlooks")
        .findOne(
            { outlookDay },
            {
                projection: { _id: 0 },
                sort: { createdUnixTimestamp: -1 }
            }
        );
}