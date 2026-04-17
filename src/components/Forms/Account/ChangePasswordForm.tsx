"use client";

import { useActionState, useEffect, useState } from "react";
import { ChangePasswordAction } from "@/_Actions/Users/ChangePasswordAction";
import { UserWithHashedPassword } from "@/_Interfaces/Users/User";
import ErrorMessage from "@/components/Messages/ErrorMessage";
import SuccessMessage from "@/components/Messages/SuccessMessage";
import Col from "@/components/Col";
import InputPasswordMain from "@/components/Inputs/InputPassword";
import Row from "@/components/Row";
import FormSubmitButton from "@/components/Buttons/FormSubmitButton";
import InfoHeader from "@/components/Text/Headers/InfoHeader";
import FormResetButton from "@/components/Buttons/FormResetButton";

export default function ChangePasswordForm({ user }: { user: UserWithHashedPassword }) {
    const [serverState, action] = useActionState(ChangePasswordAction, {
        success: false
    });
    const [success, setSuccess] = useState<string | null>(null);
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
            <InfoHeader textContent="Change Your Password" />

            <Col className="w-full gap-2">

                {error && <ErrorMessage description={error} />}

                {serverState.success && <SuccessMessage description="You have successfully changed your password! Please wait..." />}

                <Col>
                    <label htmlFor="password" className="text-xs font-semibold">Enter Your Old Password</label>
                    <InputPasswordMain name="password" id="password" required />
                </Col>

                <Col>
                    <label htmlFor="rpt-password" className="text-xs font-semibold">Enter Your New (Desired) Password</label>
                    <InputPasswordMain name="rpt-password" id="rpt-password" required />
                </Col>

                <Row className="justify-between">
                    <FormResetButton />
                    <FormSubmitButton>Change Password</FormSubmitButton>
                </Row>

            </Col>
        </form>
    );
}