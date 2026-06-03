import { Outlook } from "@/_Interfaces/Outlooks/Outlook";
import { getMongo } from "@/lib/mongo/getmongo";

export async function fetchLatestValidOutlook(outlookDay: Outlook["outlookDay"]): Promise<Outlook | null> {
    const mongo = getMongo();

    return await mongo.database
        .collection<Outlook>("outlooks")
        .aggregate<Outlook>([
            {
                $match: {
                    outlookDay,
                    validUntil: { $gt: new Date().toISOString() }
                }
            },
            {
                // Newest doc
                $sort: { createdUnixTimestamp: -1 }
            },
            {
                $limit: 1
            },
            {
                $project: {
                    _id: 0
                }
            }
        ])
        .next();
}