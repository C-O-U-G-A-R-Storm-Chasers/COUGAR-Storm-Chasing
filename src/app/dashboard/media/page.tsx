import Col from "@/components/Col";
import ErrorMessage from "@/components/Messages/ErrorMessage";
import Row from "@/components/Row";
import InfoPageTitle from "@/components/Text/Headers/InfoPageTitle";
import { signinValidation } from "@/lib/auth/SigninValidation/signinValidation";
import { updateWebVisits } from "@/lib/utils/statistics/updateWebStats";
import MediaPageSidebar from "./Sidebar/MediaPageSidebar";

export default async function OurMediaPage() {
    const { success, msg, data } = await signinValidation();

    if (!success) return <ErrorMessage description={msg} />;

    await updateWebVisits();

    return (
        <Col
            className="
                w-full
                items-start
                p-2
                
                gap-2
            "
        >
            <InfoPageTitle textContent="Media" />

            <Row className="w-full">
                <MediaPageSidebar user={data} />
            </Row>
        </Col>
    );
}