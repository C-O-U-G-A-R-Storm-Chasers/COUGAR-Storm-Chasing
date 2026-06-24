"use client";
import config from "../../../../lib/cougar-config.json";
import Image from "next/image";
import Row from "@/components/Row";
import { TeamCollectionWithFullRecords } from "@/_Interfaces/TeamCollections/TeamCollection";
import Link from "next/link";

export default function CollectionMediaView({ records }: { records: TeamCollectionWithFullRecords["files"]}) {
    const imageExtensions = config.supported_image_mimes.map(mime => mime.replace("image/", ""));
    const videosExtensions = config.supported_video_mimes.map(mime => mime.replace("video/", ""));

    return (
        <Row className="w-full items-center flex-wrap">
            {
                (records.length > 0) && records.map((record, recordIndex) => {
                    const isImage = imageExtensions.includes(record.ext.toLowerCase());
                    const isVideo = videosExtensions.includes(record.ext.toLowerCase());

                    if (isImage) return (
                        <Link
                            key={recordIndex}
                            href={`/cdn/team_media/${record.id}.${record.ext}`}
                            className="
                                w-1/2
                                aspect-square
                                object-cover
                            "
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
                        <video
                            key={recordIndex}
                            playsInline
                            className="max-w-1/2 aspect-square object-cover"
                            controls
                        >
                            <source src={`/cdn/team_media/${record.id}.${record.ext}`} type={`video/${record.ext}`} />
                        </video>
                    );
                })
            }
        </Row>
    );
}