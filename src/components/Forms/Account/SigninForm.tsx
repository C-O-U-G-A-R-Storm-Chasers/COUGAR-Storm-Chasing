"use client";

import { useActionState, useEffect, useState } from "react";
import { SigninAction } from "@/_Actions/Users/SigninAction";
import Col from "@/components/Col";
import Row from "@/components/Row";
import InputTextMain from "@/components/Inputs/InputText";
import InputPasswordMain from "@/components/Inputs/InputPassword";
import FormResetButton from "@/components/Buttons/FormResetButton";
import FormSubmitButton from "@/components/Buttons/FormSubmitButton";
import ErrorMessage from "@/components/Messages/ErrorMessage";
import InfoHeader from "@/components/Text/Headers/InfoHeader";
import Link from "next/link";

export default function SigninForm() {
    const [serverState, action] = useActionState(SigninAction, {
        success: false
    });
    const [error, setError] = useState<string | null>(null);

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
            <InfoHeader textContent="Sign In" />

            <p className="text-xs">New here? <Link href="/account/register" className="underline">Create an account</Link>.</p>

            <Col className="w-full gap-2">

                {error && <ErrorMessage description={error} />}

                <Col>
                    <label htmlFor="login" className="text-xs font-semibold">Your Username or Email Address</label>
                    <InputTextMain name="login" id="login" placeholder="JohnDoe or johndoe@gmail.com" required />
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