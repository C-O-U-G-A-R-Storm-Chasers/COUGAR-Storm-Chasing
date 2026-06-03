import Col from "@/components/Col";
import ErrorMessage from "@/components/Messages/ErrorMessage";
import Row from "@/components/Row";
import { signinValidation } from "@/lib/auth/SigninValidation/signinValidation";
import { fetchAllUploadedMedia } from "@/lib/database/files/fetchAllUploadedMedia";
import { updateWebVisits } from "@/lib/utils/statistics/updateWebStats";
import MediaElement from "./MediaElement";

export default async function OurMediaPage() {
    const { success, msg } = await signinValidation();

    if (!success) return <ErrorMessage description={msg} />;

    await updateWebVisits();

    const uploadedMedia = await fetchAllUploadedMedia();

    return (
        <Col className="w-full h-full items-center justify-center">
            <Col
                className="
                    flex
                    flex-col
                    items-start
                    w-full
                    p-2
                    
                    bg-sky-950

                    border-1
                    border-sky-500

                    rounded-md
                    
                    gap-2
                "
            >
                <Row className="w-full flex-wrap">
                    {
                        (uploadedMedia && uploadedMedia.length > 0) && uploadedMedia.map((media, i) => <MediaElement key={`media-${i}`} media={media} i={i} />)
                    }
                </Row>
            </Col>
        </Col>
    );
}