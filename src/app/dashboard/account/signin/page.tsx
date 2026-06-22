import Col from "@/components/Col";
import SigninForm from "@/components/Forms/Account/SigninForm";
import { updateWebVisits } from "@/lib/utils/statistics/updateWebStats";

export default async function SigninPage() {
    await updateWebVisits();

    return (
        <Col className="w-full h-full items-center">
            <SigninForm />
        </Col>
    );
}