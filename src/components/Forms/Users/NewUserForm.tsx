"use client";

import { NewUserAction } from "@/_Actions/Users/NewUserAction";
import { useActionState, useEffect, useState } from "react";
import ErrorMessage from "@/components/Messages/ErrorMessage";
import SuccessMessage from "@/components/Messages/SuccessMessage";
import InputTextMain from "@/components/Inputs/InputText";
import InputPasswordMain from "@/components/Inputs/InputPassword";
import InputCheckbox from "@/components/Inputs/InputCheckbox";
import FormSubmitButton from "@/components/Buttons/FormSubmitButton";
import FormResetButton from "@/components/Buttons/FormResetButton";
import Col from "@/components/Col";
import Row from "@/components/Row";

export default function NewUserForm() {
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
        <form action={action}>
            <Col>

                {
                    error && <ErrorMessage description={error} />
                }

                {
                    serverState.success && <SuccessMessage description="Success!" />
                }

                <Row>
                    <Col>
                        <InputTextMain name="first" placeholder="John" required />
                    </Col>
                    <Col>
                        <InputTextMain name="last" placeholder="Doe" required />
                    </Col>
                </Row>

                <Col>
                    <InputTextMain name="uid" placeholder="1234" required />
                </Col>

                <Col>
                    <InputTextMain name="username" placeholder="JohnDoe" required />
                </Col>

                <Col>
                    <InputTextMain name="email" placeholder="johndoe@riverbendschools.net" required />
                </Col>

                <Col>
                    <InputPasswordMain name="password" required />
                </Col>

                <Col>
                    <InputPasswordMain name="repeatedPassword" required />
                </Col>

                <Col>
                    <InputCheckbox name="super" />
                </Col>

                <Row>
                    <FormResetButton />
                    <FormSubmitButton>Create Admin</FormSubmitButton>
                </Row>

            </Col>
        </form>
    );
}