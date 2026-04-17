import { User, UserWithHashedPassword } from "@/_Interfaces/Users/User";
import { getMongo } from "@/lib/mongo/getmongo";

export async function fetchUserByUsername(username: string, returnWithPassword?: boolean): Promise<User | UserWithHashedPassword | null> {
    const mongo = getMongo();

    if (returnWithPassword) return await mongo.database
        .collection<User>("users")
        .findOne({ username }, { projection: { _id: 0 } });

    return await mongo.database
        .collection<User>("users")
        .findOne({ username }, { projection: { _id: 0, password: 0 } });
}