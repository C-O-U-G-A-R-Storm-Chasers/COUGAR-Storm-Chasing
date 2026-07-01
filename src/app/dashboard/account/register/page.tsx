import { PermissionLevels } from "@/_Enums/PermissionLevels";
import Col from "@/components/Col";
import RegisterForm from "@/components/Forms/Account/RegisterForm";
import ErrorMessage from "@/components/Messages/ErrorMessage";
import { signinValidation } from "@/lib/auth/SigninValidation/signinValidation";
import { updateWebVisits } from "@/lib/utils/statistics/updateWebStats";

export default async function RegisterPage() {
    const { data: currentUser } = await signinValidation(PermissionLevels.MEM);
        
    if (currentUser) return (
        <Col className="w-full h-full items-center">
            <ErrorMessage description="You already have an account and are signed in. Please sign out, and try again to make an alternate account." />
        </Col>
    );
    
    await updateWebVisits();

    return (
        <Col className="w-full h-full items-center">
            <RegisterForm />
        </Col>
    );
}