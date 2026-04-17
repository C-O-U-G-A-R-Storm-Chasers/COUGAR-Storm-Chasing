import Col from "@/components/Col";
import ChangePasswordForm from "@/components/Forms/Account/ChangePasswordForm";

export default async function SigninPage() {
    return (
        <Col className="w-full h-full items-center justify-center">
            "You have not signed in before" message goes here (but put it inside the form itself)
            reminder to add change password form here
            <ChangePasswordForm />
        </Col>
    );
}