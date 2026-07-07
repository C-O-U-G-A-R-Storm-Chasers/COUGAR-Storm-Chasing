import { getMongo } from "@/lib/mongo/getmongo";

export async function countDonations(): Promise<number> {
    const mongo = getMongo();

    return await mongo.database
        .collection("payments").countDocuments({ paymentType: "donation" });
}