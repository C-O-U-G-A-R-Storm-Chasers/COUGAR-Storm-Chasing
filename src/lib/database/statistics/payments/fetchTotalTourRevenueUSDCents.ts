import { Payment } from "@/_Interfaces/Payments/Payment";
import { getMongo } from "@/lib/mongo/getmongo";

export async function fetchTotalTourRevenueUSDCents(): Promise<number> {
    const mongo = getMongo();

    const result = await mongo.database
        .collection<Payment>("payments")
        .aggregate([
            { $match: { paymentType: "tour" } },
            { $group: { _id: null, total: { $sum: "$amountUSCents" } } }
        ])
        .toArray();

    return result[0]?.total ?? 0;
}