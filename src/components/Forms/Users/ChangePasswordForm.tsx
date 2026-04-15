"use client";

import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ChangePasswordAction } from "@/_Actions/Users/ChangePasswordAction";
import { User } from "@/_Interfaces/Users/User";
import ErrorMessage from "@/components/Messages/ErrorMessage";
import SuccessMessage from "@/components/Messages/SuccessMessage";
import Col from "@/components/Col";
import InputPasswordMain from "@/components/Inputs/InputPassword";
import Row from "@/components/Row";
import FormSubmitButton from "@/components/Buttons/FormSubmitButton";

export default function ChangePasswordForm({ user, visible }: { user: User, visible: boolean }) {
    const [changePasswordState, action] = useActionState(ChangePasswordAction, {
        success: false
    });
    const [success, setSuccess] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        if (changePasswordState.success) {
            setSuccess(changePasswordState.msg!);

            const timer = setTimeout(() => {
                router.push(`/data/account/${user.uid}`);
            }, 3000);

            return () => clearTimeout(timer);
        } else setError(changePasswordState.msg!);
    }, [changePasswordState, router, user]);

    return (
        <form action={action} className={`${visible ? "" : "hidden"}`}>
            <h2 className="text-lg font-semibold">Change Your Password</h2>

            {
                error && <ErrorMessage description={error} />
            }

            {
                success && <SuccessMessage description={success} />
            }

            <Col>
                <input type="hidden" name="uid" value={user.uid} />
                <InputPasswordMain name="oldPassword" required />
                <InputPasswordMain name="newPassword" required />
            </Col>
            
            <Row className="pt-2 pb-2">
                <FormSubmitButton>Change Password</FormSubmitButton>
            </Row>
        </form>
    );
}