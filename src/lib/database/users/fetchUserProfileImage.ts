import { ProfileImage } from "@/_Interfaces/Files/Images/ProfileImage";
import { getMongo } from "@/lib/mongo/getmongo";

export async function fetchUserProfileImage(id: ProfileImage["id"]): Promise<ProfileImage | null> {
    const mongo = getMongo();

    return await mongo.database
        .collection<ProfileImage>("profile-images")
        .findOne({ id }, { projection: { _id: 0 } });
}