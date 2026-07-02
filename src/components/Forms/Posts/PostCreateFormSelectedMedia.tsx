"use client";

import Col from "@/components/Col";
import config from "../../../lib/cougar-config.json";
import Image from "next/image";

export default function PostCreateFormSelectedMedia({ file, filesCount, selectMedia }: { file: File, filesCount: number, selectMedia: () => void }) {
    const isImage = config.supported_image_mimes.includes(file.type.toLowerCase());

    const mediaURL = URL.createObjectURL(file);

    console.log("IsImage:", isImage, "Media URL:", mediaURL);

    if (isImage) return (
        <Col
            title="Change selected media"
            className="relative w-full aspect-video justify-center items-center cursor-pointer bg-neutral-950 rounded-md"
            onClick={selectMedia}
        >
            <Image
                src={mediaURL}
                alt="Selected File #1"
                className="object-cover rounded-md"
                fill
            />

            {
                filesCount > 1 &&
                <Col
                    className="
                        absolute
                        top-1/2
                        left-1/2
                        -translate-x-1/2
                        -translate-y-1/2
                        justify-center
                        items-center
                        w-full
                        h-full
                        
                        hover:bg-neutral-950/50
                        bg-neutral-950/75
                        
                        cursor-pointer
                        rounded-md
                    "
                >
                    <p className="text-2xl">+ {filesCount - 1}</p>
                    <p className="text-lg">attachments</p>
                </Col>
            }
        </Col>
    );

    return (
        <Col
            title="Change selected media"
            className="relative w-full aspect-video justify-center items-center cursor-pointer bg-neutral-950 rounded-md"
            onClick={selectMedia}
        >
            <video className="object-cover rounded-md">
                <source src={mediaURL} type={file.type} />
            </video>

            {
                filesCount > 1 &&
                <Col
                    className="
                        absolute
                        top-1/2
                        left-1/2
                        -translate-x-1/2
                        -translate-y-1/2
                        justify-center
                        items-center
                        w-full
                        h-full
                        
                        hover:bg-neutral-950/50
                        bg-neutral-950/75
                        
                        cursor-pointer
                        rounded-md
                    "
                >
                    <p className="text-2xl">+ {filesCount - 1}</p>
                    <p className="text-lg">attachments</p>
                </Col>
            }
        </Col>
    );
}