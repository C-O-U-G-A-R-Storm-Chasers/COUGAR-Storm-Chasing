import { UserWithHashedPassword } from "@/_Interfaces/Users/User";
import { getMongo } from "@/lib/mongo/getmongo";

export async function fetchUserWithHashedPass(uid: string): Promise<UserWithHashedPassword | null> {
    const mongo = getMongo();

    return await mongo.database
        .collection<UserWithHashedPassword>("users")
        .findOne({ uid }, { projection: { _id: 0 } });
}