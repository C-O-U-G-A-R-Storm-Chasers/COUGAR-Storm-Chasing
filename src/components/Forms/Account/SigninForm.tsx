"use client";

import { FormEvent, useEffect, useState } from "react";
import Col from "@/components/Col";
import Row from "@/components/Row";
import InputTextMain from "@/components/Inputs/InputText";
import InputPasswordMain from "@/components/Inputs/InputPassword";
import FormResetButton from "@/components/Buttons/FormResetButton";
import FormSubmitButton from "@/components/Buttons/FormSubmitButton";
import ErrorMessage from "@/components/Messages/ErrorMessage";
import InfoHeader from "@/components/Text/Headers/InfoHeader";
import Link from "next/link";
import { BasicResult } from "@/_Interfaces/BasicResult";
import { useRouter } from "next/navigation";
import SuccessMessage from "@/components/Messages/SuccessMessage";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function SigninForm() {
    const [uploading, setUploading] = useState<{ submitted: boolean, pending: boolean }>({ submitted: false, pending: false });
    const [result, setResult] = useState<BasicResult | null>(null);
    const [edited, setEdited] = useState<boolean>(false);
    const router = useRouter();

    useEffect(() => {
        // Form submitted & finished processing
        if (uploading.submitted && !uploading.pending) {
            if (result?.success) {
                // Add delay so it's not so abrupt
                const timeout = setTimeout(() => {
                    router.push("/dashboard");
                    router.refresh();
                }, 3000);

                return () => clearTimeout(timeout);
            }
        }
    }, [result, uploading, router]);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        setUploading({ submitted: true, pending: true });
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        try {
            const response = await fetch("/api/users/signin", {
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
                w-full
                md:w-2/3
                p-2

                rounded-md
                
                gap-2
            "
        >
            <InfoHeader textContent="Sign In" />

            <p className="text-xs">New here? <Link href="/dashboard/account/register" className="underline">Create an account</Link>.</p>

            <Col className="w-full gap-2">

                <Col>
                    <label htmlFor="login" className="text-xs">Your Username or Email Address</label>
                    <InputTextMain
                        name="login"
                        id="login"
                        placeholder="johndoe@gmail.com"
                        onChange={() => setEdited(true)}
                        required
                    />
                </Col>

                <Col>
                    <label htmlFor="password" className="text-xs">Your Password</label>
                    <InputPasswordMain
                        name="password"
                        id="password"
                        onChange={() => setEdited(true)}
                        required
                    />
                </Col>

                {
                    (uploading.submitted && !uploading.pending && result) &&
                    <>
                        {
                            // Error
                            !result.success &&
                            <>
                                <ErrorMessage description={result.msg ?? "Unknown response"} />
                            </>
                        }
                        {
                            // Success
                            result.success &&
                            <SuccessMessage description={result.msg ?? "Unknown result"} />
                        }
                    </>
                }

                <Col className="w-full">
                    {
                        uploading.submitted && uploading.pending ?
                        <LoadingSpinner loadingText="Signin in, please wait..." /> :
                        edited &&
                        <>
                            <FormSubmitButton>Sign In</FormSubmitButton>
    
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