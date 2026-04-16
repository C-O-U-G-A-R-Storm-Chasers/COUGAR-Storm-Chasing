"use client";

import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SignoutAction } from "@/_Actions/Users/SignoutAction";
import Col from "@/components/Col";
import Row from "@/components/Row";
import ErrorMessage from "@/components/Messages/ErrorMessage";
import SuccessMessage from "@/components/Messages/SuccessMessage";
import FormSubmitButton from "@/components/Buttons/FormSubmitButton";
import FormActionButton from "@/components/Buttons/FormActionButton";

export default function SignoutForm() {
    const [serverState, action] = useActionState(SignoutAction, {
        success: false
    });
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);
    const router = useRouter();

    useEffect(() => {
        if (!serverState.success && serverState.msg) {
            setError(serverState.msg);
        }

        if (serverState.success) setSuccess(true);
    }, [serverState, router]);

    return (
        <form action={action}>
            <Col className="justify-center items-center">

                {
                    error && <ErrorMessage description={error} />
                }

                {
                    success && <SuccessMessage description="You have been successfully signed out. Please wait..." />
                }

                <Row className="justify-center items-center">
                    <FormSubmitButton>Yes</FormSubmitButton>
                    <FormActionButton onClick={() => router.back()}>No, take me back</FormActionButton>
                </Row>

            </Col>
        </form>
    );
}