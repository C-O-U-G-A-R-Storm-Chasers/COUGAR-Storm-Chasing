import { Thumbnail } from "@/_Interfaces/Files/Thumbnails/Thumbnail";
import { getMongo } from "@/lib/mongo/getmongo";

export async function insertThumbnail(thumbnail: Thumbnail) {
    const mongo = getMongo();

    return await mongo.database
        .collection<Thumbnail>("thumbnails")
        .insertOne(thumbnail);
}