"use client";

import { NewUserAction } from "@/_Actions/Users/NewUserAction";
import { useActionState, useEffect, useState } from "react";
import ErrorMessage from "@/components/Messages/ErrorMessage";
import InputTextMain from "@/components/Inputs/InputText";
import InputPasswordMain from "@/components/Inputs/InputPassword";
import FormSubmitButton from "@/components/Buttons/FormSubmitButton";
import FormResetButton from "@/components/Buttons/FormResetButton";
import Col from "@/components/Col";
import Row from "@/components/Row";
import InfoHeader from "@/components/Text/Headers/InfoHeader";
import Link from "next/link";

export default function RegisterForm() {
    const [serverState, action] = useActionState(NewUserAction, {
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
            <InfoHeader textContent="Register" />

            <p className="text-xs">Already have an account? <Link href="/account/signin" className="underline">Sign in instead</Link>.</p>

            <Col className="w-full gap-2">

                {error && <ErrorMessage description={error} />}

                <Col>
                    <label htmlFor="first" className="text-xs font-semibold">First Name</label>
                    <InputTextMain name="first" id="first" placeholder="John" required />
                </Col>

                <Col>
                    <label htmlFor="last" className="text-xs font-semibold">Last Name</label>
                    <InputTextMain name="last" id="last" placeholder="Doe" required />
                </Col>

                <Col>
                    <label htmlFor="username" className="text-xs font-semibold">Desired Username</label>
                    <InputTextMain name="username" id="username" placeholder="John Doe 01" required />
                </Col>

                <Col>
                    <label htmlFor="email" className="text-xs font-semibold">Email Address</label>
                    <InputTextMain name="email" id="email" placeholder="johndoe@gmail.com" required />
                </Col>

                <Col>
                    <label htmlFor="password" className="text-xs font-semibold">Desired Password</label>
                    <InputPasswordMain name="password" id="password" required />
                </Col>

                <Col>
                    <label htmlFor="rpt-password" className="text-xs font-semibold">Repeat Password</label>
                    <InputPasswordMain name="rpt-password" id="rpt-password" required />
                </Col>

                <Row className="justify-between">
                    <FormResetButton />
                    <FormSubmitButton>Sign In</FormSubmitButton>
                </Row>

            </Col>
        </form>
    );
}