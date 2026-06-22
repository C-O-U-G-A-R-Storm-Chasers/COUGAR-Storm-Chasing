"use server";

import Col from "@/components/Col";
import { signinValidation } from "@/lib/auth/SigninValidation/signinValidation";
import ErrorMessage from "@/components/Messages/ErrorMessage";
import { updateWebVisits } from "@/lib/utils/statistics/updateWebStats";

export default async function DashboardPage() {
    const { success, msg } = await signinValidation();
    
    if (!success) return <ErrorMessage description={msg} />;

    await updateWebVisits();

    return (
        <Col className="w-full">
            
        </Col>
    );
}