import { ProfileImage } from "@/_Interfaces/Files/ProfileImage";
import { getMongo } from "@/lib/mongo/getmongo";

export async function insertProfileImage(profileImage: ProfileImage) {
    const mongo = getMongo();

    return await mongo.database
        .collection<ProfileImage>("profile-images")
        .insertOne(profileImage);
}