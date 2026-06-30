"use client";

import { ChangeEvent, useEffect, useRef, useState } from "react";
import Col from "@/components/Col";
import { PaperClipIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import config from "../../../../lib/cougar-config.json";

export default function ProfileImageUploadForm({ defaultValue, setChanged }: { defaultValue: string | null, setChanged?: (changed: boolean) => void }) {
    const filesInput = useRef<HTMLInputElement>(null);
    const [selectedFile, setSelectedFile] = useState<File>();

    useEffect(() => {
        if (setChanged && selectedFile) {
            setChanged(true);

            if (process.env.NODE_ENV === "development") console.log("Profile image input changed!")
        }
        
    }, [selectedFile, setChanged]);

    const handleSelectedMedia = async (e: ChangeEvent<HTMLInputElement>) => setSelectedFile(e.target.files?.[0]);

    const handleClick = () => filesInput.current?.click();

    return (
        <Col
            className="
                items-center
                w-full
                
                gap-2
            "
        >
            <input
                ref={filesInput}
                type="file"
                name="profile-image"
                accept={config.supported_image_mimes.join(",")}
                className="hidden"
                onChange={handleSelectedMedia}
            />

            <Col className="items-center w-full">
                <Col
                    className="
                        items-center
                        justify-center
                        w-50
                        aspect-square

                        border-3
                        border-dashed
                        border-primary-1/50

                        text-primary-1/50

                        hover:border-primary-1
                        hover:text-primary-1

                        cursor-pointer

                        rounded-4xl
                    "
                    onClick={handleClick}
                    title="Select Profile Image"
                >
                    {
                        defaultValue && !selectedFile ?
                        <Image
                            src={defaultValue}
                            alt="Current profile image"
                            width={2048}
                            height={2048}
                            className="relative w-full h-full rounded-4xl"
                            title="Select Profile Image"
                        />
                        :
                        selectedFile ?
                        <Image
                            src={URL.createObjectURL(selectedFile)}
                            alt="Selected File"
                            width={2048}
                            height={2048}
                            className="relative w-full h-full rounded-4xl"
                            title="Select Profile Image"
                        />
                        :
                        <>
                            <PaperClipIcon className="w-8 h-8" />
                            <p className="text-md">Select Profile Image</p>
                        </>
                    }
                </Col>
            </Col>

        </Col>
    );
}