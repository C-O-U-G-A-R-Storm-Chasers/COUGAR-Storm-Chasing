"use client";

import { FormEvent, useEffect, useState } from "react";
import Col from "@/components/Col";
import Row from "@/components/Row";
import ErrorMessage from "@/components/Messages/ErrorMessage";
import FormSubmitButton from "@/components/Buttons/FormSubmitButton";
import FormResetButton from "@/components/Buttons/FormResetButton";
import { BasicResult } from "@/_Interfaces/BasicResult";
import SuccessMessage from "@/components/Messages/SuccessMessage";
import { redirect } from "next/navigation";
import LoadingSpinner from "@/components/LoadingSpinner";
import ProfileImageUploadForm from "../Media/Upload/ProfileImageUploadForm";

export default function ChangeAccountImageForm({ profileImageSrc }: { profileImageSrc: string | null }) {
    const [uploading, setUploading] = useState<{ submitted: boolean, pending: boolean }>({ submitted: false, pending: false });
    const [result, setResult] = useState<BasicResult | null>(null);
    const [edited, setEdited] = useState<boolean>(false);

    useEffect(() => {
        // Form submitted & finished processing
        if (uploading.submitted && !uploading.pending) {
            if (result?.success && result.data) {
                console.log("SUCCESS");

                redirect("/dashboard/account");
            }
        }
    }, [result, uploading]);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        setUploading({ submitted: true, pending: true });
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        try {
            const response = await fetch("/api/users/edit-account/image", {
                method: "POST",
                body: formData
            });

            setResult(await response.json());
        } finally {
            setUploading({ submitted: true, pending: false });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col w-full h-full gap-2">
            <ProfileImageUploadForm defaultValue={profileImageSrc} setChanged={setEdited} />

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

            <Col className="w-full">
                {
                    uploading.submitted && uploading.pending ?
                    <LoadingSpinner loadingText="Submitting changes, please wait..." /> :
                    edited &&
                    <>
                        <FormSubmitButton>Update Account</FormSubmitButton>

                        <Row onClick={() => setEdited(false)}>
                            <FormResetButton />
                        </Row>
                    </>
                }
            </Col>
        </form>
    );
}