import { Payment } from "@/_Interfaces/Payments/Payment";
import { getMongo } from "@/lib/mongo/getmongo";

export async function insertPayment(payment: Payment): Promise<Payment | null> {
    const mongo = getMongo();

    return await mongo.database
        .collection<Payment>("payments")
        .findOneAndUpdate(
            { internalID: payment.internalID },
            {
                $setOnInsert: { 
                    internalID: payment.internalID,
                    stripeSessionID: payment.stripeSessionID,
                    userID: payment.userID,
                    timestamp: payment.timestamp,

                },
                $set: {
                    updateTimestamp: Date.now(),
                    paymentType: payment.paymentType,
                    amountUSCents: payment.amountUSCents,
                },
            },
            {
                upsert: true,
                returnDocument: "after",
                projection: { _id: 0 }
            }
        );
}