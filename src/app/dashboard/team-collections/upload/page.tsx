"use server";

import { PermissionLevels } from "@/_Enums/PermissionLevels";
import Col from "@/components/Col";
import TeamCollectionCreateForm from "@/components/Forms/TeamCollections/TeamCollectionCreateForm";
import ErrorMessage from "@/components/Messages/ErrorMessage";
import { signinValidation } from "@/lib/auth/SigninValidation/signinValidation";
import { updateWebVisits } from "@/lib/utils/statistics/updateWebStats";

export default async function TeamCollectionCreatePage() {
    const { success, msg } = await signinValidation(PermissionLevels.ADMIN);

    if (!success) return <ErrorMessage description={msg} />;

    await updateWebVisits();

    return (
        <Col className="w-full h-full items-center">
            <TeamCollectionCreateForm />
        </Col>
    );
}