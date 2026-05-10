"use client";

import { ChangeEvent, useEffect, useRef, useState } from "react";
import Col from "@/components/Col";
import FormSubmitButton from "@/components/Buttons/FormSubmitButton";
import ErrorMessage from "@/components/Messages/ErrorMessage";
import InfoHeader from "@/components/Text/Headers/InfoHeader";
import FormUploadButton from "@/components/Buttons/FormUploadButton";
import { BasicResult } from "@/_Interfaces/BasicResult";
import { SelectedFile } from "@/_Interfaces/Files/SelectedFile";
import { FileUploadAction } from "@/_Actions/File/Upload/FileUploadAction";
import { UploadedFile } from "@/_Interfaces/Files/UploadedFile";
import { FileUploadPaths } from "@/_Enums/Files/FileUploadPaths";
import VideoPreview from "./VideoPreview";
import ImagePreview from "./ImagePreview";

export default function MediaUploadForm({ title, desiredPath, setParentUploadedMedia  }: { title?: string, desiredPath?: FileUploadPaths, setParentUploadedMedia?: (media: UploadedFile[] | undefined) => void }) {
    const [error, setError] = useState<string | null>(null);
    const filesInput = useRef<HTMLInputElement>(null);
    const [uploadedMedia, setUploadedMedia] = useState<UploadedFile[]>();

    useEffect(() => {
        if (setParentUploadedMedia) setParentUploadedMedia(uploadedMedia);
    }, [uploadedMedia, setParentUploadedMedia]);

    const handleSelectedMedia = async (e: ChangeEvent<HTMLInputElement>) => {
        const media = e.target.files;

        if (!media) return;

        const uploadTimestamp = Date.now();

        const selectedMedia = await Promise.all(Array.from(media).entries().map(async ([i, media]) => {
            const file: SelectedFile = {
                file: media,
                desiredName: `${uploadTimestamp}-${i}`,
                desiredPath: desiredPath ?? FileUploadPaths.MEDIA,
                timestamp: uploadTimestamp
            };

            const result: BasicResult<UploadedFile> = await FileUploadAction(file);

            if (!result.success) {
                setError(result.msg!);

                return;
            }
            
            const uploadedFile: UploadedFile = result.data!;

            return uploadedFile;
        }));

        setUploadedMedia(selectedMedia.filter(media => media !== undefined));
    };

    const handleClick = () => filesInput.current?.click();

    return (
        <Col
            className="
                items-center
                w-2/3
                p-2
                
                bg-sky-700

                border-1
                border-sky-500

                rounded-md
                
                gap-2
            "
        >
            <InfoHeader textContent={title ?? "Upload Media"} />

            <Col className="w-full gap-2">

                {error && <ErrorMessage description={error} />}

                <Col>
                    <input
                        ref={filesInput}
                        type="file"
                        name="files"
                        id="files"
                        accept="image/*,video/*"
                        multiple
                        className="hidden"
                        onChange={handleSelectedMedia}
                    />
                    <FormUploadButton onClick={handleClick}>Select Files</FormUploadButton>
                </Col>

                {
                    (uploadedMedia && uploadedMedia.length > 0) &&
                    uploadedMedia.map((media, i) => {
                        if (media.type === "image") return <ImagePreview key={`video-${i}`} webPath={media.webPath} />;

                        if (media.type === "video") return <VideoPreview key={`video-${i}`} webPath={media.webPath} />;
                    })
                }

                <Col>
                    {!setParentUploadedMedia && <FormSubmitButton>Upload</FormSubmitButton>}
                </Col>

            </Col>
        </Col>
    );
}