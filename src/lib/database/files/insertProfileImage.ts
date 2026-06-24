import { ProfileImage } from "@/_Interfaces/Files/Images/ProfileImage";
import { getMongo } from "@/lib/mongo/getmongo";

export async function insertProfileImage(profileImage: ProfileImage): Promise<ProfileImage | null> {
    const mongo = getMongo();

    return await mongo.database
        .collection<ProfileImage>("profile-images")
        .findOneAndUpdate(
            { uid: profileImage.uid },
            {
                $setOnInsert: { 
                    uid: profileImage.uid
                },
                $set: {
                    id: profileImage.id,
                    ext: profileImage.ext,
                    uploadedAt: profileImage.uploadedAt
                },
            },
            {
                upsert: true,
                returnDocument: "after",
                projection: { _id: 0 }
            }
        );
}