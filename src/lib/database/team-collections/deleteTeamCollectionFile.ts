import { CollectionFile } from "@/_Interfaces/Files/Collections/CollectionFile";
import { getMongo } from "@/lib/mongo/getmongo";

export async function deleteTeamCollectionFile(id: CollectionFile["id"]) {
    const mongo = getMongo();

    return await mongo.database
        .collection<CollectionFile>("team-collection-files")
        .findOneAndDelete({ id });
}