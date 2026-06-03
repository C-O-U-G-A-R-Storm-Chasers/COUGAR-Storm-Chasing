"use client";

import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SignoutAction } from "@/_Actions/Users/SignoutAction";
import Col from "@/components/Col";
import ErrorMessage from "@/components/Messages/ErrorMessage";
import FormSubmitButton from "@/components/Buttons/FormSubmitButton";
import FormActionButton from "@/components/Buttons/FormActionButton";
import InfoHeader from "@/components/Text/Headers/InfoHeader";

export default function SignoutForm() {
    const [serverState, action] = useActionState(SignoutAction, {
        success: false
    });
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        if (!serverState.success && serverState.msg) {
            setError(serverState.msg);
        }
    }, [serverState]);

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
            <InfoHeader textContent="Are you sure you want to sign out?" />

            <Col className="w-full gap-2">

                {error && <ErrorMessage description={error} />}

                <FormSubmitButton>Yes</FormSubmitButton>
                <FormActionButton onClick={() => router.back()}>No, take me back</FormActionButton>

            </Col>
        </form>
    );
}