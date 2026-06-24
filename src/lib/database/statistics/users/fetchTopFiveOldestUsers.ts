import { User } from "@/_Interfaces/Users/User";
import { getMongo } from "@/lib/mongo/getmongo";

interface Result {
    uid: User["uid"],
    username: User["username"]
}

export async function fetchTopFiveOldestUsers(): Promise<Result[]> {
    const mongo = getMongo();

    const users = await mongo.database
        .collection<User>("users")
        .find(
            {},
            {
                projection: {
                    _id: 0,
                    uid: 1,
                    username: 1,
                },
            },
        )
        .sort({
            created_timestamp: 1,
        })
        .limit(5)
        .toArray();

    return users.map(user => {
        return {
            uid: user.uid,
            username: user.username
        }
    });
}