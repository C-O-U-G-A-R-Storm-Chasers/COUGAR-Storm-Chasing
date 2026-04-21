"use client";

import { ChangeEvent, useActionState, useEffect, useRef, useState } from "react";
import { SigninAction } from "@/_Actions/Users/SigninAction";
import Col from "@/components/Col";
import FormSubmitButton from "@/components/Buttons/FormSubmitButton";
import ErrorMessage from "@/components/Messages/ErrorMessage";
import InfoHeader from "@/components/Text/Headers/InfoHeader";
import FormUploadButton from "@/components/Buttons/FormUploadButton";
import { BasicResult } from "@/_Interfaces/BasicResult";
import { SelectedFile } from "@/_Interfaces/Files/SelectedFile";
import { FileUploadAction } from "@/_Actions/File/Upload/UploadImageAction";

export default function MediaUploadForm() {
    const [serverState, action] = useActionState(SigninAction, {
        success: false
    });
    const [error, setError] = useState<string | null>(null);
    const filesInput = useRef<HTMLInputElement>(null);
    const [uploadedMedia, setUploadedMedia] = useState<Array<string>>();

    useEffect(() => {
        if (!serverState.success && serverState.msg) {
            setError(serverState.msg);
        }
    }, [serverState]);

    const handleSelectedMedia = async (e: ChangeEvent<HTMLInputElement>) => {
        const media = e.target.files;

        if (!media) return;

        const uploadTimestamp = Date.now();

        const selectedMedia = await Promise.all(Array.from(media).entries().map(async ([i, media]) => {
            const file: SelectedFile = {
                file: media,
                desiredName: `${uploadTimestamp}-${i}`,
                desiredPath: "/admin/media",
                timestamp: uploadTimestamp
            };

            const result: BasicResult = await FileUploadAction(file);

            if (!result.success) {
                setError(result.msg!);

                return;
            }

            const baseURL = typeof window !== "undefined" ? window.location.origin : "";
            const mediaURL = baseURL + "/" + result.data;

            return mediaURL;
        }));

        setUploadedMedia(selectedMedia.filter(media => media !== undefined));
    };

    const handleClick = () => filesInput.current?.click();

    return (
        <form
            action={action}
            className="
                flex
                flex-col
                items-center
                w-1/3
                p-2
                
                bg-sky-700

                border-1
                border-sky-500

                rounded-md
                
                gap-2
            "
        >
            <InfoHeader textContent="Upload Media" />

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

                <Col>
                    {
                        (uploadedMedia && uploadedMedia.length > 0) &&
                        uploadedMedia.map((media, i) => <p key={i}>{media}</p>)
                    }
                </Col>

                <Col>
                    <FormSubmitButton>Upload</FormSubmitButton>
                </Col>

            </Col>
        </form>
    );
}