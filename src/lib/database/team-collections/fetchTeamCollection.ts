import { TeamCollection, TeamCollectionWithFullRecords } from "@/_Interfaces/TeamCollections/TeamCollection";
import { getMongo } from "@/lib/mongo/getmongo";

export async function fetchTeamCollection(id: TeamCollection["id"]): Promise<TeamCollectionWithFullRecords | null> {
    const mongo = getMongo();

    return await mongo.database
        .collection<TeamCollection>("team-collections")
        .aggregate<TeamCollectionWithFullRecords>([
            {
                $match: { id },
            },

            {
                $lookup: {
                    from: "team-collection-files",
                    let: { fileIds: "$files" },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $in: ["$id", "$$fileIds"],
                                },
                            },
                        },

                        {
                            $lookup: {
                                from: "thumbnails",
                                let: { thumbId: "$thumb" },
                                pipeline: [
                                    {
                                        $match: {
                                            $expr: {
                                                $eq: ["$id", "$$thumbId"],
                                            },
                                        },
                                    },

                                    {
                                        $project: {
                                            _id: 0,
                                        },
                                    },
                                ],
                                as: "thumb",
                            },
                        },

                        {
                            $addFields: {
                                thumb: { $arrayElemAt: ["$thumb", 0] },
                            },
                        },

                        {
                            $project: {
                                _id: 0,
                            },
                        },
                    ],
                    as: "files",
                },
            },

            // remove root _id
            {
                $project: {
                    _id: 0,
                },
            },
        ])
        .next();
}