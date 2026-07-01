"use server";

import { PermissionLevels } from "@/_Enums/PermissionLevels";
import Col from "@/components/Col";
import PostCreateForm from "@/components/Forms/Posts/PostCreateForm";
import ErrorMessage from "@/components/Messages/ErrorMessage";
import { signinValidation } from "@/lib/auth/SigninValidation/signinValidation";
import { updateWebVisits } from "@/lib/utils/statistics/updateWebStats";

export default async function PostCreatePage() {
    const { success, msg } = await signinValidation(PermissionLevels.ADMIN);

    if (!success) return (
        <Col className="w-full h-full items-center">
            <ErrorMessage description={msg} />
        </Col>
    );

    await updateWebVisits();

    return (
        <Col className="w-full h-full items-center">
            <PostCreateForm />
        </Col>
    );
}