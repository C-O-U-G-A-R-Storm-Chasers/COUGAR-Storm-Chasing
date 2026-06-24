import { FileRecord } from "@/_Interfaces/Files/FileRecord";
import { getMongo } from "@/lib/mongo/getmongo";

export async function deleteTeamMediaFile(id: FileRecord["id"]) {
    const mongo = getMongo();

    return await mongo.database
        .collection<FileRecord>("team-media-files")
        .findOneAndDelete({ id });
}