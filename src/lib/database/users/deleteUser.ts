import { User } from "@/_Interfaces/Users/User";
import { getMongo } from "@/lib/mongo/getmongo";

export async function deleteUser(uid: User["uid"]) {
    const mongo = getMongo();

    return await mongo.database
        .collection<User>("users")
        .findOneAndDelete({ uid });
}