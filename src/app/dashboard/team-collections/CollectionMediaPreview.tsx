"use client";
import config from "../../../lib/cougar-config.json";
import Col from "@/components/Col";
import Image from "next/image";
import Row from "@/components/Row";
import { TeamCollectionWithFullRecords } from "@/_Interfaces/TeamCollections/TeamCollection";

export default function CollectionMediaPreview({ fileRecords }: { fileRecords: TeamCollectionWithFullRecords["files"]}) {
    const imageExtensions = config.supported_image_mimes.map(mime => mime.replace("image/", ""));
    const videosExtensions = config.supported_video_mimes.map(mime => mime.replace("video/", ""));

    // Only select the first up-to-five records for previewing
    const records = fileRecords.slice(0, 5);
    const remainingRecordCount = fileRecords.length - records.length;

    return (
        <Row className="flex-wrap">
            {
                (records.length > 0) && records.map((record, recordIndex) => {
                    const isImage = imageExtensions.includes(record.ext.toLowerCase());
                    const isVideo = videosExtensions.includes(record.ext.toLowerCase());

                    console.log("isImage:", isImage, "isVideo:", isVideo);

                    if (isImage) return (
                        <Image
                            key={recordIndex}
                            src={`/cdn/team_media/${record.id}.${record.ext}`}
                            alt={`Media ${record.id}`}
                            width={2048}
                            height={2048}
                            className="w-1/3 aspect-square object-cover"
                        />
                    );

                    if (isVideo) return (
                        <video
                            key={recordIndex}
                            playsInline
                            className="w-1/3 aspect-square object-cover"
                            controls
                        >
                            <source src={`/cdn/team_media/${record.id}.${record.ext}`} type={`video/${record.ext}`} />
                        </video>
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