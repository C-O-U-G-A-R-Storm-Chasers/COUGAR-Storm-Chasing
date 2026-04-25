import { PermissionLevels } from "@/_Enums/PermissionLevels";
import Col from "@/components/Col";
import MediaUploadForm from "@/components/Forms/Media/Upload/MediaUploadForm";
import ErrorMessage from "@/components/Messages/ErrorMessage";
import { signinValidation } from "@/lib/auth/SigninValidation/signinValidation";

export default async function MediaUploadPage() {
    const { success, msg } = await signinValidation(PermissionLevels.ADMIN);

    if (!success) return <ErrorMessage description={msg} />;

    return (
        <Col className="w-full h-full items-center justify-center">
            <MediaUploadForm />
        </Col>
    );
}