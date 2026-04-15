"use client";

import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SigninAction } from "@/_Actions/Users/SigninAction";
import Col from "@/components/Col";
import Row from "@/components/Row";
import InputTextMain from "@/components/Inputs/InputText";
import InputPasswordMain from "@/components/Inputs/InputPassword";
import FormResetButton from "@/components/Buttons/FormResetButton";
import FormSubmitButton from "@/components/Buttons/FormSubmitButton";
import ErrorMessage from "@/components/Messages/ErrorMessage";

export default function SigninForm() {
    const [serverState, action] = useActionState(SigninAction, {
        success: false
    });
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        if (serverState.success) {
            if (serverState.requiresPasswordReset) {
                setError("You have not signed in before. You must change your password. Redirecting, please wait...");

                const timer = setTimeout(() => {
                    router.push("/data/account/change-password");
                }, 3000);

                return () => clearTimeout(timer);
            }
        } else setError(serverState.msg!);
    }, [serverState, router]);

    return (
        <form action={action} className="flex flex-col items-center w-full">
            <Col className="max-w-1/2">

                {
                    error && <ErrorMessage description={error} />
                }

                <Col>
                    <InputTextMain name="username" placeholder="JohnDoe" required />
                </Col>

                <Col>
                    <InputPasswordMain name="password" required />
                </Col>

                <Row>
                    <FormResetButton />
                    <FormSubmitButton>Sign In</FormSubmitButton>
                </Row>

            </Col>
        </form>
    );
}