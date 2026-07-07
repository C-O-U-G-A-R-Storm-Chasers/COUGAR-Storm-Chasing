import { PermissionLevels } from "@/_Enums/PermissionLevels";
import Col from "@/components/Col";
import CreatePaymentForm from "@/components/Forms/Payments/CreatePaymentForm";
import { signinValidation } from "@/lib/auth/SigninValidation/signinValidation";
import { updateWebVisits } from "@/lib/utils/statistics/updateWebStats";

export default async function PaymentsPage() {
    const { data: currentUser } = await signinValidation(PermissionLevels.MEM);
    
    await updateWebVisits();

    return (
        <Col className="w-full h-full items-center">
            <CreatePaymentForm currentUser={currentUser} />
        </Col>
    );
}