import { Post } from "@/_Interfaces/Posts/Post";
import { User } from "@/_Interfaces/Users/User";
import { getMongo } from "@/lib/mongo/getmongo";

export async function fetchAllPostsFromUser(uid: User["uid"]): Promise<Post[]> {
    const mongo = getMongo();

    return await mongo.database
        .collection<Post>("posts")
        .aggregate<Post>([
            {
                $match: {
                    uploader: uid,
                },
            },
            {
                $lookup: {
                    from: "media-files",
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