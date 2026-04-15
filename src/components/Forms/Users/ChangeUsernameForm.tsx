"use client";

import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ChangeUsernameAction } from "@/_Actions/Users/ChangeUsernameAction";
import { User } from "@/_Interfaces/Users/User";
import ErrorMessage from "@/components/Messages/ErrorMessage";
import SuccessMessage from "@/components/Messages/SuccessMessage";
import Col from "@/components/Col";
import InputTextMain from "@/components/Inputs/InputText";
import InputPasswordMain from "@/components/Inputs/InputPassword";
import Row from "@/components/Row";
import FormSubmitButton from "@/components/Buttons/FormSubmitButton";

export default function ChangeUsernameForm({ user, visible }: { user: User, visible: boolean }) {
    const [changeUsernameState, action] = useActionState(ChangeUsernameAction, {
        success: false
    });
    const [success, setSuccess] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        if (changeUsernameState.success) {
            setSuccess(changeUsernameState.msg!);

            const timer = setTimeout(() => {
                router.push(`/data/account/${user.uid}`);
            }, 3000);

            return () => clearTimeout(timer);
        } else setError(changeUsernameState.msg!);
    }, [changeUsernameState, router, user]);

    return (
        <form action={action} className={`${visible ? "" : "hidden"}`}>
            <h2 className="text-lg font-semibold">Change Your Username</h2>

            {
                error && <ErrorMessage description={error} />
            }

            {
                success && <SuccessMessage description={success} />
            }

            <Col>
                <input type="hidden" name="uid" value={user.uid} />
                <InputTextMain name="newUsername" placeholder="JohnDoe" required />
                <InputPasswordMain name="password" required />
            </Col>

            <Row className="pt-2 pb-2">
                <FormSubmitButton>Change Username</FormSubmitButton>
            </Row>
        </form>
    );
}