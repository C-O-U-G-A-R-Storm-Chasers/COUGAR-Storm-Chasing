"use client";
import config from "../../../lib/cougar-config.json";
import Col from "@/components/Col";
import Image from "next/image";
import Row from "@/components/Row";
import { TeamCollectionWithFullRecords } from "@/_Interfaces/TeamCollections/TeamCollection";
import Link from "next/link";
import { VideoCameraIcon } from "@heroicons/react/24/outline";

export default function CollectionMediaPreview({ fileRecords }: { fileRecords: TeamCollectionWithFullRecords["files"]}) {
    const imageExtensions = config.supported_image_mimes.map(mime => mime.replace("image/", ""));
    const videoExtensions = config.supported_video_mimes.map(mime => mime.replace("video/", ""));

    // Only select the first up-to-five records for previewing
    const records = fileRecords.slice(0, 5);
    const remainingRecordCount = fileRecords.length - records.length;

    return (
        <Row className="flex-wrap">
            {
                (records.length > 0) && records.map((record, recordIndex) => {
                    const isImage = imageExtensions.includes(record.ext.toLowerCase());
                    const isVideo = videoExtensions.includes(record.ext.toLowerCase());

                    if (isImage) return (
                        <Link
                            key={recordIndex}
                            href={`/cdn/team_media/${record.id}.${record.ext}`}
                            className="w-1/3 aspect-square object-cover"
                        >
                            <Image
                                src={`/cdn/team_media/${record.id}.${record.ext}`}
                                alt={`Media ${record.id}`}
                                width={2048}
                                height={2048}
                                className="w-full h-full object-cover"
                            />
                        </Link>
                    );

                    if (isVideo) return (
                        <Link
                            key={recordIndex}
                            href={`/cdn/team_media/${record.id}.${record.ext}`}
                            className="relative w-1/3 aspect-square object-cover"
                        >
                            <Image
                                src={`/cdn/thumbnails/${record.thumb.id}.${record.thumb.ext}`}
                                alt={`Media ${record.id}`}
                                width={2048}
                                height={2048}
                                className="w-full h-full object-cover"
                            />

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

                                    bg-neutral-950/85
                                "
                            >
                                <VideoCameraIcon className="w-10 p-1 border-1 border-primary-1 rounded-lg" />
                                <p className="text-xs text-center">Click to view video</p>
                            </Col>
                        </Link>
                    );
                })
            }
            {
                (remainingRecordCount > 0) &&
                <Col className="items-center justify-center w-1/3 aspect-square bg-black">
                    <p className="text-2xl">+{remainingRecordCount}</p>
                    <p className="text-xl">attachments</p>
                </Col>
            }
        </Row>
    );
}