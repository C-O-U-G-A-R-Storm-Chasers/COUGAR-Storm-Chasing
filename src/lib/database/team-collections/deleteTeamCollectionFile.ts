import { FileRecord } from "@/_Interfaces/Files/FileRecord";
import { getMongo } from "@/lib/mongo/getmongo";

export async function deleteTeamCollectionFile(id: FileRecord["id"]) {
    const mongo = getMongo();

    return await mongo.database
        .collection<FileRecord>("team-collection-files")
        .findOneAndDelete({ id });
}