import { MediaFile } from "@/_Interfaces/Files/MediaFile";
import { getMongo } from "@/lib/mongo/getmongo";

export async function deleteMediaFile(id: MediaFile["id"]) {
    const mongo = getMongo();

    return await mongo.database
        .collection<MediaFile>("media-files")
        .findOneAndDelete({ id });
}