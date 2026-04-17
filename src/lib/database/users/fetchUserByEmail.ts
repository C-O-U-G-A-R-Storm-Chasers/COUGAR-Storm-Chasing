import { User } from "@/_Interfaces/Users/User";
import { getMongo } from "@/lib/mongo/getmongo";

export async function fetchUserByEmail(email: string): Promise<User | null> {
    const mongo = getMongo();

    return await mongo.database
        .collection<User>("users")
        .findOne({ email }, { projection: { _id: 0, password: 0 } });
}