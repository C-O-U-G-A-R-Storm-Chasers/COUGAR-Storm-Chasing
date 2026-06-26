import { Thumbnail } from "@/_Interfaces/Files/Thumbnails/Thumbnail";
import { getMongo } from "@/lib/mongo/getmongo";

export async function insertThmbnail(thumbnail: Thumbnail) {
    const mongo = getMongo();

    return await mongo.database
        .collection<Thumbnail>("profile-images")
        .insertOne(thumbnail);
}