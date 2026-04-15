import { User, UserWithHashedPassword } from "@/_Interfaces/Users/User";
import { getMongo } from "@/lib/mongo/getmongo";

export async function insertUser(User: UserWithHashedPassword): Promise<User | null> {
    const mongo = getMongo();

    const { password, created_timestamp, ...updateData } = User;

    return await mongo.database
        .collection<UserWithHashedPassword>("users")
        .findOneAndUpdate(
            { uid: updateData.uid },
            {
                $setOnInsert: { password, created_timestamp },
                $set: { ...updateData as User },
            },
            {
                upsert: true,
                returnDocument: "after",
                projection: { _id: 0 }
            }
        );
}