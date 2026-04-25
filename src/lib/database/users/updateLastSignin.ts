import { User, UserWithHashedPassword } from "@/_Interfaces/Users/User";
import { getMongo } from "@/lib/mongo/getmongo";

export async function updateLastSignin(uid: User["uid"]): Promise<User | null> {
    const mongo = getMongo();

    return await mongo.database
        .collection<UserWithHashedPassword>("users")
        .findOneAndUpdate(
            { uid },
            {
                $set: { last_signin: Date.now() },
            },
            {
                upsert: true,
                returnDocument: "after",
                projection: { _id: 0 }
            }
        );
}