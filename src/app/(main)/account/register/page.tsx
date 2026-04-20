import Col from "@/components/Col";
import RegisterForm from "@/components/Forms/Account/RegisterForm";

export default async function RegisterPage() {
    return (
        <Col className="w-full h-full items-center justify-center">
            <RegisterForm />
        </Col>
    );
}