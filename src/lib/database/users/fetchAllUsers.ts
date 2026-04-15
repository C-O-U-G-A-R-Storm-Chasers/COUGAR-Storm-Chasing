import { User } from "@/_Interfaces/Users/User";
import { getMongo } from "@/lib/mongo/getmongo";

export async function fetchAllUsers(): Promise<Array<User> | null> {
    const mongo = getMongo();

    return await mongo.database
        .collection<User>("users")
        .find({}, { projection: { _id: 0, password: 0 } })
        .toArray();
}