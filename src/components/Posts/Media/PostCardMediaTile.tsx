"use client";

import Link from "next/link";
import { MediaFilePreview } from "./PostCardMedia";
import Image from "next/image";
import Col from "@/components/Col";
import { TeamCollectionWithFullRecords } from "@/_Interfaces/TeamCollections/TeamCollection";

export default function PostCardMediaTile(
    {
        collectionID,
        preview,
        isImage,
        remainingRecordCount,
        finalWithRemaining,
    }:
    {
        collectionID: TeamCollectionWithFullRecords["id"],
        preview: MediaFilePreview,
        isImage: boolean,
        remainingRecordCount: number
        finalWithRemaining?: boolean,
    }
) {
    return (
        <Link
            href={`/dashboard/team-collections/${collectionID}`}
            className={`${finalWithRemaining && "relative"} flex flex-col max-w-full aspect-square`}
        >
            <Image
                src={isImage ? `/cdn/team_media/${preview.id}.${preview.ext}` : `/cdn/thumbnails/${preview.id}.${preview.ext}`}
                alt={`Media ${preview.id}`}
                width={2048}
                height={2048}
                className="w-full h-full object-cover"
            />

            {
                finalWithRemaining &&
                <Col className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full justify-center items-center bg-neutral-950/75">
                    <p className="text-2xl">+{remainingRecordCount}</p>
                    <p className="text-xl">attachments</p>
                </Col>
            }
        </Link>
    );
}