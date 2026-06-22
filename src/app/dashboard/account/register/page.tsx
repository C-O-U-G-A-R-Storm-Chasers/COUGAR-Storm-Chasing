import Col from "@/components/Col";
import RegisterForm from "@/components/Forms/Account/RegisterForm";
import { updateWebVisits } from "@/lib/utils/statistics/updateWebStats";

export default async function RegisterPage() {
    await updateWebVisits();

    return (
        <Col className="w-full h-full items-center">
            <RegisterForm />
        </Col>
    );
}