import Col from "@/components/Col";
import ErrorMessage from "@/components/Messages/ErrorMessage";
import { signinValidation } from "@/lib/auth/SigninValidation/signinValidation";
import { updateWebVisits } from "@/lib/utils/statistics/updateWebStats";

export default async function OurMediaPage() {
    const { success, msg } = await signinValidation();
        
    if (!success) return <ErrorMessage description={msg} />;

    await updateWebVisits();

    return (
        <Col>

        </Col>
    );
}