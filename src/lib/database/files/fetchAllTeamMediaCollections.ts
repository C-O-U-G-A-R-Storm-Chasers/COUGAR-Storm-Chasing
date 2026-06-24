import { TeamMediaCollection, TeamMediaCollectionWithFullRecords } from "@/_Interfaces/Files/Media/TeamMediaCollection";
import { getMongo } from "@/lib/mongo/getmongo";

export async function fetchAllTeamMediaCollections(): Promise<TeamMediaCollectionWithFullRecords[]> {
    const mongo = getMongo();

    return await mongo.database
        .collection<TeamMediaCollection>("team-media-collections")
        .aggregate<TeamMediaCollectionWithFullRecords>([
            {
                $lookup: {
                    from: "team-media-files",
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