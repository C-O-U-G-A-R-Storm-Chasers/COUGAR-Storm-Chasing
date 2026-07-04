"use client";

import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import Col from "@/components/Col";
import { PhotoIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Row from "@/components/Row";
import config from "../../../lib/cougar-config.json";
import ErrorMessage from "@/components/Messages/ErrorMessage";
import { BasicResult } from "@/_Interfaces/BasicResult";
import SuccessMessage from "@/components/Messages/SuccessMessage";
import { useRouter } from "next/navigation";
import { ProfileImage } from "@/_Interfaces/Files/ProfileImage";
import { User } from "@/_Interfaces/Users/User";
import ProfileImagePlaceholder from "@/components/Users/ProfileImagePlaceholder";
import PostCreateFormBodyInput from "./PostCreateFormBodyInput";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import PostCreateFormSelectedMedia from "./PostCreateFormSelectedMedia";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function PostCreateForm({ currentUser, currentUserProfileImage }: { currentUser: User, currentUserProfileImage: ProfileImage | null }) {
    const postForm = useRef<HTMLFormElement>(null);
    const filesInput = useRef<HTMLInputElement>(null);
    const [selectedFiles, setSelectedFiles] = useState<FileList>();
    const [uploading, setUploading] = useState<{ submitted: boolean, pending: boolean }>({ submitted: false, pending: false });
    const [result, setResult] = useState<BasicResult | null>(null);
    const [edited, setEdited] = useState<boolean>(false);
    const router = useRouter();

    useEffect(() => {
        // Form submitted & finished processing
        if (uploading.submitted && !uploading.pending) {
            if (result?.success && result.data) {
                router.push(`/dashboard/posts`);
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

        if (selectedFiles) {
            const files = Array.from(selectedFiles);

            await Promise.all(files.map(file => formData.append("media", file)));
        }

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

    const submitPost = () => postForm.current?.requestSubmit();

    const selectMedia = () => filesInput.current?.click();

    const acceptedMimes = [...config.supported_image_mimes, config.supported_video_mimes].join(",");

    return (
        <form
            ref={postForm}
            onSubmit={handleSubmit}
            className="
                flex
                flex-col
                w-full
                p-1
                px-2
                
                bg-neutral-600

                border-1
                border-neutral-500
                rounded-md

                gap-2
            "
        >
            <input
                ref={filesInput}
                type="file"
                name="team-media"
                accept={acceptedMimes}
                className="hidden"
                onChange={handleSelectedMedia}
                multiple
            />

            <Row className="justify-start items-start w-full gap-2">
                <Col className="relative w-8 aspect-square">
                    {
                        currentUserProfileImage ?
                        <Image
                            src={`/cdn/profile_images/${currentUserProfileImage.id}.${currentUserProfileImage.ext}`}
                            alt={`${currentUser.username}'s Profile Image`}
                            fill
                            className="object-cover"
                        />
                        :
                        <ProfileImagePlaceholder username={currentUser.username} />
                    }
                </Col>

                <Row className="flex-1 gap-2">
                    <PostCreateFormBodyInput isEdited={setEdited}/>

                    {
                        uploading.submitted && uploading.pending ?
                        <LoadingSpinner size={28} /> :
                        edited &&
                        <Col className="flex-1">
                            <PaperAirplaneIcon
                                title={"Submit post"}
                                className="w-8 w-8 cursor-pointer text-cyan-400 hover:text-cyan-700"
                                onClick={submitPost}
                            />
                        </Col>
                    }
                </Row>
            </Row>
            
            {
                (uploading.submitted && !uploading.pending) &&
                (result && !result.success) &&
                <Row className="justify-start items-start w-full gap-2">
                    <ErrorMessage description={result.msg ?? "Unknown result"} />
                </Row>
            }

            {
                (uploading.submitted && !uploading.pending) &&
                (result && result.success) &&
                <Row className="justify-start items-start w-full gap-2">
                    <SuccessMessage description={result.msg ?? "Unknown result"} />
                </Row>
            }
            
            {
                edited &&
                <Row className="justify-start items-start w-full gap-2">
                    <Row className="justify-start items-start w-full px-2 border-2 border-neutral-300 rounded-full gap-2">
                        <PhotoIcon
                            title={`Attach media (Supported types: ${acceptedMimes.replaceAll("image/", "").replaceAll("video/", "").replaceAll(",", ", ")})`}
                            className="w-8 w-8 cursor-pointer text-green-600 hover:text-green-700"
                            onClick={selectMedia}
                        />
                    </Row>
                </Row>
            }
            
            {
                (selectedFiles && selectedFiles.length > 0) &&
                <Row className="justify-start items-start w-full gap-2">
                    <Row className="w-full p-2 border-2 border-neutral-300 rounded-md">
                        <PostCreateFormSelectedMedia
                            file={selectedFiles[0]}
                            filesCount={Array.from(selectedFiles).length}
                            selectMedia={selectMedia}
                        />
                    </Row>
                </Row>
            }
        </form>
    );
}