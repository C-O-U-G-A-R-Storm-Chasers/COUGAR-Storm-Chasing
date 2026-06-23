"use client";

import { ChangeEvent, useEffect, useRef, useState } from "react";
import Col from "@/components/Col";
import { PaperClipIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Row from "@/components/Row";

export enum AllowedMediaUploadTypes {
    SINGLE_IMAGE = 1,
    MULTIPLE_IMAGES = 2,
    SINGLE_VIDEO = 3,
    MULTIPLE_VIDEOS = 4,
    SINGLE_ANY = 5,
    MULTIPLE_ANY = 6
}

export default function MediaUploadForm(
    {
        allowedTypes,
        selectedFileList,
        customLabel,
        customInputName,

    }:
    {
        allowedTypes: AllowedMediaUploadTypes,
        selectedFileList: (files: FileList) => void,
        customLabel?: string,
        customInputName?: string,
    }
) {
    const filesInput = useRef<HTMLInputElement>(null);
    const [selectedFiles, setSelectedFiles] = useState<FileList>();

    useEffect(() => {
        if (selectedFiles && selectedFiles.length > 0) selectedFileList(selectedFiles);
    }, [selectedFileList, selectedFiles]);

    const handleSelectedMedia = async (e: ChangeEvent<HTMLInputElement>) => {
        const media = e.target.files;

        if (!media) return;

        setSelectedFiles(media);
    };

    const handleClick = () => filesInput.current?.click();

    const label = customLabel ?
        customLabel :
    allowedTypes === AllowedMediaUploadTypes.SINGLE_IMAGE ?
        "Upload Image" :
    allowedTypes === AllowedMediaUploadTypes.MULTIPLE_IMAGES ?
        "Upload Images" :
    allowedTypes === AllowedMediaUploadTypes.SINGLE_VIDEO ?
        "Upload Video" :
    allowedTypes === AllowedMediaUploadTypes.MULTIPLE_VIDEOS ?
        "Upload Videos" :
        "Upload Media";

    return (
        <Col
            className="
                items-center
                w-full
                
                gap-2
            "
        >
            <Col className="items-center w-full">
                <input
                    ref={filesInput}
                    type="file"
                    name={customInputName ?? "files"}
                    accept="image/*,video/*"
                    className="hidden"
                    onChange={handleSelectedMedia}
                    multiple={allowedTypes === AllowedMediaUploadTypes.MULTIPLE_IMAGES || allowedTypes === AllowedMediaUploadTypes.MULTIPLE_VIDEOS || allowedTypes === AllowedMediaUploadTypes.MULTIPLE_ANY}
                />

                <Col
                    className="
                        items-center
                        justify-center
                        w-50
                        h-50

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
                    title={label}
                >
                    {
                        (selectedFiles && selectedFiles.length > 0) ?
                        <>
                            <Image
                                src={URL.createObjectURL(Array.from(selectedFiles)[0])}
                                alt="Selected File"
                                width={2048}
                                height={2048}
                                className="relative w-full h-full rounded-4xl"
                                onClick={handleClick}
                                title={label}
                            />
                            {
                                selectedFiles.length > 1 &&
                                <Row className="absolute items-center justify-center text-primary-1">
                                    <p className="text-2xl">+{selectedFiles.length - 1} attachments</p>
                                </Row>
                            }
                        </>
                        :
                        <>
                            <PaperClipIcon className="w-8 h-8" />
                            <p className="text-md">{label}</p>
                        </>
                    }
                </Col>
            </Col>

        </Col>
    );
}