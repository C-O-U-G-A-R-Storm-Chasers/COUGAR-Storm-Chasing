import Col from "@/components/Col";
import SigninForm from "@/components/Forms/Account/SigninForm";

export default async function SigninPage() {
    return (
        <Col className="w-full h-full items-center justify-center">
            <SigninForm />
        </Col>
    );
}