import { TeamCollection, TeamCollectionWithFullRecords } from "@/_Interfaces/TeamCollections/TeamCollection";
import { getMongo } from "@/lib/mongo/getmongo";

export async function fetchAllTeamCollections(): Promise<TeamCollectionWithFullRecords[]> {
    const mongo = getMongo();

    return await mongo.database
        .collection<TeamCollection>("team-collections")
        .aggregate<TeamCollectionWithFullRecords>([
            {
                $lookup: {
                    from: "team-collection-files",
                    localField: "files",
                    foreignField: "id",
                    as: "files",
                },
            },
            {
                $project: {
                    _id: 0,
                    "files._id": 0,
                }
            },
        ])
        .toArray();
}