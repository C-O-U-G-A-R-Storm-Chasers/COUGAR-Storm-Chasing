"use client";

import Link from "next/link";
import { MediaFilePreview } from "./PostCardMedia";
import Image from "next/image";
import Col from "@/components/Col";
import { VideoCameraIcon } from "@heroicons/react/24/outline";
import { Post } from "@/_Interfaces/Posts/Post";

export default function PostCardMediaTile(
    {
        postID,
        preview,
        isImage,
        remainingRecordCount,
        finalTile,
    }:
    {
        postID: Post["id"],
        preview: MediaFilePreview,
        isImage: boolean,
        remainingRecordCount: number
        finalTile?: boolean,
    }
) {
    return (
        <Link
            href={`/dashboard/posts/${postID}`}
            className={`${(finalTile || !isImage) && "relative"} flex flex-col max-w-full aspect-square`}
        >
            <Image
                src={isImage ? `/cdn/team_media/${preview.id}.${preview.ext}` : `/cdn/thumbnails/${preview.id}.${preview.ext}`}
                alt={`Media ${preview.id}`}
                width={2048}
                height={2048}
                className="w-full h-full object-cover"
            />

            {
                !isImage &&
                <Col
                    className="
                        absolute
                        justify-center
                        items-center
                        left-1/2
                        top-1/2
                        -translate-x-1/2
                        -translate-y-1/2
                        w-full
                        h-full

                        text-primary-1

                        bg-neutral-950/75
                    "
                >
                    <VideoCameraIcon className="w-2/6 sm:w-1/6 md:w-2/6 lg:w-1/6 p-1 border-1 border-primary-1 rounded-lg" />
                </Col>
            }

            {
                finalTile &&
                <Col className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full justify-center items-center bg-neutral-950/75">
                    <p className="text-2xl">+{remainingRecordCount}</p>
                    <p className="text-xl">attachments</p>
                </Col>
            }
        </Link>
    );
}