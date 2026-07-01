"use client";

import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import Col from "@/components/Col";
import { PaperClipIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Row from "@/components/Row";
import config from "../../../lib/cougar-config.json";
import InputTextarea from "@/components/Inputs/InputTextarea";
import ErrorMessage from "@/components/Messages/ErrorMessage";
import FormSubmitButton from "@/components/Buttons/FormSubmitButton";
import FormResetButton from "@/components/Buttons/FormResetButton";
import { BasicResult } from "@/_Interfaces/BasicResult";
import SuccessMessage from "@/components/Messages/SuccessMessage";
import { useRouter } from "next/navigation";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function PostCreateForm() {
    const filesInput = useRef<HTMLInputElement>(null);
    const [selectedFiles, setSelectedFiles] = useState<FileList>();
    const [uploading, setUploading] = useState<{ submitted: boolean, pending: boolean }>({ submitted: false, pending: false });
    const [result, setResult] = useState<BasicResult | null>(null);
    const router = useRouter();

    useEffect(() => {
        // Form submitted & finished processing
        if (uploading.submitted && !uploading.pending) {
            if (result?.success && result.data) {
                router.push(`/dashboard/posts/${result.data}`);
                router.refresh();
            }
        }
    }, [result, uploading, router]);

    const handleSelectedMedia = async (e: ChangeEvent<HTMLInputElement>) => {
        const media = e.target.files;

        if (!media) return;

        setSelectedFiles(media);
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        setUploading({ submitted: true, pending: true });
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        try {
            const response = await fetch("/api/posts/create", {
                method: "POST",
                body: formData
            });

            setResult(await response.json());
        } finally {
            setUploading({ submitted: true, pending: false });
        }
    };

    const handleClick = () => filesInput.current?.click();

    const acceptedMimes = [...config.supported_image_mimes, config.supported_video_mimes].join(",");

    return (
        <form
            onSubmit={handleSubmit}
            className="
                flex
                flex-col
                items-center
                w-1/2
                p-2

                rounded-md
                
                gap-2
            "
        >
            <Col className="items-center w-full">
                <input
                    ref={filesInput}
                    type="file"
                    name="team-media"
                    accept={acceptedMimes}
                    className="hidden"
                    onChange={handleSelectedMedia}
                    multiple
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
                            <p className="text-md">Select Media</p>
                        </>
                    }
                </Col>

                <Col className="items-center">
                    <p className="text-md text-primary-1/75">Supported Filetypes:</p>
                    <p className="text-xs text-primary-1/25">{acceptedMimes.replaceAll("image/", "").replaceAll("video/", "").replaceAll(",", ", ")}</p>
                </Col>
            </Col>

            {
                (uploading.submitted && !uploading.pending) &&
                (result && !result.success) &&
                <ErrorMessage description={result.msg ?? "Unknown result"} />
            }

            {
                (uploading.submitted && !uploading.pending) &&
                (result && result.success) &&
                <SuccessMessage description={result.msg ?? "Unknown result"} />
            }

            <Col className="w-full gap-2">
                <Col>
                    <label htmlFor="body" className="text-xs">Post Body</label>
                    <InputTextarea
                        name="body"
                        id="body"
                        rows={10}
                    />
                </Col>

                <Col>
                    {
                        uploading.submitted && uploading.pending ?
                            <LoadingSpinner loadingText="Submitting post, please wait..." /> :
                            <FormSubmitButton>Post</FormSubmitButton>
                    }
                </Col>

                <Row>
                    <FormResetButton />
                </Row>
            </Col>

        </form>
    );
}