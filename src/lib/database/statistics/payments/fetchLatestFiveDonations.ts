import { Payment } from "@/_Interfaces/Payments/Payment";
import { User } from "@/_Interfaces/Users/User";
import { getMongo } from "@/lib/mongo/getmongo";

interface PaymentWithUser extends Payment {
    user: User | null
}

export async function fetchLatestFiveDonations(): Promise<PaymentWithUser[]> {
    const mongo = getMongo();

    return await mongo.database
        .collection<Payment>("payments")
        .aggregate<PaymentWithUser>([
            {
                $match: {
                    paymentType: "donation",
                },
            },
            {
                $sort: {
                    timestamp: -1,
                },
            },
            {
                $limit: 5,
            },
            {
                $lookup: {
                    from: "users",
                    let: { userId: "$userID" },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $eq: ["$id", "$$userId"],
                                },
                            },
                        },
                        {
                            $project: {
                                _id: 0,
                            },
                        },
                    ],
                    as: "user",
                },
            },
            {
                $unwind: {
                    path: "$user",
                    preserveNullAndEmptyArrays: true,
                },
            },
            {
                $project: {
                    _id: 0,
                    id: 1,
                    user: 1,
                },
            },
        ])
        .toArray();
}