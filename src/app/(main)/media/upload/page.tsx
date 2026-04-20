import Col from "@/components/Col";
import MediaUploadForm from "@/components/Forms/Media/Upload/MediaUploadForm";

export default async function MediaUploadPage() {
    return (
        <Col className="w-full h-full items-center justify-center">
            <MediaUploadForm />
        </Col>
    );
}