"use client";

import { FormEvent,  useEffect,  useState } from "react";
import ErrorMessage from "@/components/Messages/ErrorMessage";
import InputTextMain from "@/components/Inputs/InputText";
import InputPasswordMain from "@/components/Inputs/InputPassword";
import FormSubmitButton from "@/components/Buttons/FormSubmitButton";
import FormResetButton from "@/components/Buttons/FormResetButton";
import Col from "@/components/Col";
import Row from "@/components/Row";
import InfoHeader from "@/components/Text/Headers/InfoHeader";
import Link from "next/link";
import SuccessMessage from "@/components/Messages/SuccessMessage";
import ProfileImageUploadForm from "../Media/Upload/ProfileImageUploadForm";
import { BasicResult } from "@/_Interfaces/BasicResult";
import { redirect } from "next/navigation";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function RegisterForm() {
    const [uploading, setUploading] = useState<{ submitted: boolean, pending: boolean }>({ submitted: false, pending: false });
    const [result, setResult] = useState<BasicResult | null>(null);
    const [edited, setEdited] = useState<boolean>(false);

    useEffect(() => {
        // Form submitted & finished processing
        if (uploading.submitted && !uploading.pending) {
            if (result?.success && result.data) redirect("/dashboard/account/signin");
        }
    }, [result, uploading]);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        setUploading({ submitted: true, pending: true });
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        try {
            const response = await fetch("/api/users/register", {
                method: "POST",
                body: formData
            });

            setResult(await response.json());
        } finally {
            setUploading({ submitted: true, pending: false });
        }
    };

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
            <InfoHeader textContent="Register" />

            <p className="text-xs">Already have an account? <Link href="/dashboard/account/signin" className="underline">Sign in instead</Link>.</p>

            <Col className="w-full gap-2">
                
                <ProfileImageUploadForm defaultValue={null} />

                <Col>
                    <label htmlFor="first" className="text-xs">First Name</label>
                    <InputTextMain
                        name="first"
                        id="first"
                        placeholder="John"
                        onChange={() => setEdited(true)}
                        required
                    />
                </Col>

                <Col>
                    <label htmlFor="last" className="text-xs">Last Name</label>
                    <InputTextMain
                        name="last"
                        id="last"
                        placeholder="Doe"
                        onChange={() => setEdited(true)}
                        required
                    />
                </Col>

                <Col>
                    <label htmlFor="username" className="text-xs">Desired Username</label>
                    <InputTextMain
                        name="username"
                        id="username"
                        placeholder="John Doe 01"
                        onChange={() => setEdited(true)}
                        required
                    />
                </Col>

                <Col>
                    <label htmlFor="email" className="text-xs">Email Address</label>
                    <InputTextMain
                        name="email"
                        id="email"
                        placeholder="johndoe@gmail.com"
                        onChange={() => setEdited(true)}
                        required
                    />
                </Col>

                <Col>
                    <label htmlFor="password" className="text-xs">Desired Password</label>
                    <InputPasswordMain
                        name="password"
                        id="password"
                        onChange={() => setEdited(true)}
                        required
                    />
                </Col>

                <Col>
                    <label htmlFor="rpt-password" className="text-xs">Repeat Password</label>
                    <InputPasswordMain
                        name="rpt-password"
                        id="rpt-password"
                        onChange={() => setEdited(true)}
                        required
                    />
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
                        <LoadingSpinner loadingText="Creating account, please wait..." /> :
                        edited &&
                        <>
                            <FormSubmitButton>Create New Account</FormSubmitButton>
    
                            <Row onClick={() => setEdited(false)}>
                                <FormResetButton />
                            </Row>
                        </>
                    }
                </Col>

            </Col>
        </form>
    );
}