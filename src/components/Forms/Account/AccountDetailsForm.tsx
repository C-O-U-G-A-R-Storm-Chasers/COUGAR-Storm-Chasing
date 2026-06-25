"use client";

import { FormEvent, useEffect, useState } from "react";
import Col from "@/components/Col";
import Row from "@/components/Row";
import InputText from "@/components/Inputs/InputText";
import ErrorMessage from "@/components/Messages/ErrorMessage";
import FormSubmitButton from "@/components/Buttons/FormSubmitButton";
import FormResetButton from "@/components/Buttons/FormResetButton";
import { BasicResult } from "@/_Interfaces/BasicResult";
import SuccessMessage from "@/components/Messages/SuccessMessage";
import { redirect } from "next/navigation";
import LoadingSpinner from "@/components/LoadingSpinner";
import { User } from "@/_Interfaces/Users/User";

export default function AccountDetailsForm({ user }: { user: User }) {
    const [uploading, setUploading] = useState<{ submitted: boolean, pending: boolean }>({ submitted: false, pending: false });
    const [result, setResult] = useState<BasicResult | null>(null);
    const [edited, setEdited] = useState<boolean>(false);

    useEffect(() => {
        // Form submitted & finished processing
        if (uploading.submitted && !uploading.pending) {
            if (result?.success && result.data) redirect("/dashboard/account");
        }
    }, [result, uploading]);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        setUploading({ submitted: true, pending: true });
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        try {
            const response = await fetch("/api/users/edit-account", {
                method: "POST",
                body: formData
            });

            setResult(await response.json());
        } finally {
            setUploading({ submitted: true, pending: false });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col w-full h-full gap-1.25">
            <Col className="w-full">
                <label htmlFor="first" className="text-xs">First Name</label>
                <InputText
                    name="first"
                    id="first"
                    defaultValue={user.first}
                    placeholder="John"
                    onChange={() => setEdited(true)}
                    required
                />
            </Col>

            <Col className="w-full">
                <label htmlFor="last" className="text-xs">Last Name</label>
                <InputText
                    name="last"
                    id="last"
                    defaultValue={user.last}
                    placeholder="Doe"
                    onChange={() => setEdited(true)}
                    required
                />
            </Col>

            <Col className="w-full">
                <label htmlFor="username" className="text-xs">Username</label>
                <InputText
                    name="username"
                    id="username"
                    defaultValue={user.username}
                    placeholder="John Doe 01"
                    onChange={() => setEdited(true)}
                    required />
            </Col>

            <Col className="w-full">
                <label htmlFor="handle" className="text-xs">Handle</label>
                <Row className="items-center">
                    <p className="p-1 text-md border-l-1 border-t-1 border-b-1 border-slate-50/20 bg-neutral-800">@</p>
                    <InputText
                        name="handle"
                        id="handle"
                        defaultValue={user.handle?.replace("@", "") ?? ""}
                        placeholder="@johndoe00"
                        onChange={() => setEdited(true)}
                        required
                    />
                </Row>
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