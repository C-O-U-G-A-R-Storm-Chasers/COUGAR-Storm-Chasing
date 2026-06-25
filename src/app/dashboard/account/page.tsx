"use server";

import Col from "@/components/Col";
import AccountDetailsForm from "@/components/Forms/Account/AccountDetailsForm";
import ChangeAccountImageForm from "@/components/Forms/Account/ChangeAccountImageForm";
import ErrorMessage from "@/components/Messages/ErrorMessage";
import Row from "@/components/Row";
import InfoPageTitle from "@/components/Text/Headers/InfoPageTitle";
import { signinValidation } from "@/lib/auth/SigninValidation/signinValidation";
import { safeUUID } from "@/lib/crypto/crypto";
import { fetchUserProfileImage } from "@/lib/database/users/fetchUserProfileImage";
import { updateWebVisits } from "@/lib/utils/statistics/updateWebStats";
import { UUID } from "crypto";

export default async function UserPage() {
    const { success, msg, data: user } = await signinValidation();

    if (!success || !user) return <ErrorMessage description={msg} />;

    await updateWebVisits();

    const profileImage = await fetchUserProfileImage(user.profileImage ?? safeUUID() as UUID);
    const profileImageSrc = profileImage ? `/cdn/profile_images/${profileImage.id}.${profileImage.ext}` : null;

    return (
        <Col
            className="
                w-full
                items-start
                p-2
                
                gap-2
            "
        >
            <InfoPageTitle textContent="My Account - Edit" />
            
            <Col
                className="
                    flex
                    flex-col
                    items-center
                    w-1/2
                    p-2
    
                    rounded-md
                    
                    gap-2
                "
            >
                <Row className="w-full flex-wrap items-start">
                    <Col className="w-1/3 h-full p-1">
                        <ChangeAccountImageForm profileImageSrc={profileImageSrc} />
                    </Col>
    
                    <Col className="w-2/3 h-full p-1">
                        <AccountDetailsForm user={user} />
                    </Col>
                </Row>
    
            </Col>
        </Col>
    );
}