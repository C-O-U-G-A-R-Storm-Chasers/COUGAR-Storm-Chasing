import { Post } from "@/_Interfaces/Posts/Post";
import { getMongo } from "@/lib/mongo/getmongo";

export async function fetchPost(id: Post["id"]): Promise<Post | null> {
    const mongo = getMongo();

    return await mongo.database
        .collection<Post>("posts")
        .aggregate<Post>([
            {
                $match: { id },
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

            // remove root _id
            {
                $project: {
                    _id: 0,
                },
            },
        ])
        .next();
}