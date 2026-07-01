import { ImageFile } from "@/_Interfaces/Files/MediaFile";
import { getMongo } from "@/lib/mongo/getmongo";

export async function deleteThumbnail(id: ImageFile["id"]) {
    const mongo = getMongo();

    return await mongo.database
        .collection<ImageFile>("thumbnails")
        .findOneAndDelete({ id });
}