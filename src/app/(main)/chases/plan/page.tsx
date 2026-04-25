import { PermissionLevels } from "@/_Enums/PermissionLevels";
import Col from "@/components/Col";
import PlanChaseForm from "@/components/Forms/Chases/PlanChaseForm";
import ErrorMessage from "@/components/Messages/ErrorMessage";
import { signinValidation } from "@/lib/auth/SigninValidation/signinValidation";

export default async function PlanChasesPage() {
    const { success, msg } = await signinValidation(PermissionLevels.ADMIN);

    if (!success) return <ErrorMessage description={msg} />;

    return (
        <Col className="w-full h-full items-center justify-center">
            <PlanChaseForm />
        </Col>
    );
}