"use client";

import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SignoutAction } from "@/_Actions/Users/SignoutAction";
import Col from "@/components/Col";
import ErrorMessage from "@/components/Messages/ErrorMessage";
import FormSubmitButton from "@/components/Buttons/FormSubmitButton";
import FormActionButton from "@/components/Buttons/FormActionButton";

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
                w-full
                p-2

                rounded-md
                
                gap-4
            "
        >
            <p className="text-sm md:text-xl lg:text-2xl font-semibold">Are you sure you want to sign out?</p>

            <Col className="w-full md:w-1/2 lg:w-1/3 gap-2">

                {error && <ErrorMessage description={error} />}

                <FormSubmitButton>Yes</FormSubmitButton>
                <FormActionButton onClick={() => router.back()}>No, take me back</FormActionButton>

            </Col>
        </form>
    );
}