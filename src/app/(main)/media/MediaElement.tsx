"use client";

import { UploadedFile } from "@/_Interfaces/Files/UploadedFile";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function MediaElement({ media, i }: { media: UploadedFile, i: number }) {
    const [failed, setFailed] = useState<boolean>(false);

    if (failed) return null;

    return (
        <Link key={`media-${i}`} href={media.webPath}>
            <Image
                alt={`media-${i}`}
                src={media.webPath}
                width={256}
                height={256}
                onError={() => setFailed(true)}
                className="
                
                "
            />
        </Link>
    );
}