import { TeamCollection, TeamCollectionWithFullRecords } from "@/_Interfaces/TeamCollections/TeamCollection";
import { User } from "@/_Interfaces/Users/User";
import { getMongo } from "@/lib/mongo/getmongo";

export async function fetchAllTeamCollectionsFromTeamMember(uid: User["uid"]): Promise<TeamCollectionWithFullRecords[]> {
    const mongo = getMongo();

    return await mongo.database
        .collection<TeamCollection>("team-collections")
        .aggregate<TeamCollectionWithFullRecords>([
            {
                $match: {
                    uploader: uid,
                },
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

            {
                $project: {
                    _id: 0,
                },
            },
        ])
        .toArray();
}