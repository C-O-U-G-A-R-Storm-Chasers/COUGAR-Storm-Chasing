import { Payment } from "@/_Interfaces/Payments/Payment";
import { getMongo } from "@/lib/mongo/getmongo";

export async function fetchTotalDonationsUSDCents(): Promise<number> {
    const mongo = getMongo();

    const result = await mongo.database
        .collection<Payment>("payments")
        .aggregate([
            { $match: { paymentType: "donation" } },
            { $group: { _id: null, total: { $sum: "$amountUSCents" } } }
        ])
        .toArray();

    return result[0]?.total ?? 0;
}