import { User } from "@/_Interfaces/Users/User";
import { getMongo } from "@/lib/mongo/getmongo";

export async function fetchUser(uid: string): Promise<User | null> {
    const mongo = getMongo();

    return await mongo.database
        .collection<User>("users")
        .findOne({ uid }, { projection: { _id: 0, password: 0 } });
}