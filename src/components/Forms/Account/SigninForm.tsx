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
import InfoHeader from "@/components/Text/Headers/InfoHeader";

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
        <form
            action={action}
            className="
                flex
                flex-col
                items-center
                w-1/3
                p-2
                
                bg-sky-700

                rounded-md
                
                gap-2
            "
        >
            <InfoHeader textContent="Sign In" />

            <Col className="w-full gap-2">

                {error && <ErrorMessage description={error} />}
                <ErrorMessage description="Error message goes here" />

                <Col>
                    <label htmlFor="username" className="text-xs font-semibold">Your Username</label>
                    <InputTextMain name="username" id="username" placeholder="JohnDoe" required />
                </Col>

                <Col>
                    <label htmlFor="password" className="text-xs font-semibold">Your Password</label>
                    <InputPasswordMain name="password" id="password" required />
                </Col>

                <Row className="justify-between">
                    <FormResetButton />
                    <FormSubmitButton>Sign In</FormSubmitButton>
                </Row>

            </Col>
        </form>
    );
}