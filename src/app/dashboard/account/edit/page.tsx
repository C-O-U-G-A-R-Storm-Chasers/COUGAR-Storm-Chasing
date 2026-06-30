"use server";

import { PermissionLevels } from "@/_Enums/PermissionLevels";
import Col from "@/components/Col";
import AccountDetailsForm from "@/components/Forms/Account/AccountDetailsForm";
import ChangeAccountImageForm from "@/components/Forms/Account/ChangeAccountImageForm";
import ErrorMessage from "@/components/Messages/ErrorMessage";
import InfoPageTitle from "@/components/Text/Headers/InfoPageTitle";
import { signinValidation } from "@/lib/auth/SigninValidation/signinValidation";
import { safeUUID } from "@/lib/crypto/crypto";
import { fetchUserProfileImage } from "@/lib/database/users/fetchUserProfileImage";
import { updateWebVisits } from "@/lib/utils/statistics/updateWebStats";
import { UUID } from "crypto";

export default async function UserPage() {
    const { success, msg, data: user } = await signinValidation(PermissionLevels.MEM);

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
                    w-full
                    p-2
    
                    rounded-md
                    
                    gap-2
                "
            >
                <div className="flex flex-col md:flex-row w-full">
                    <Col className="w-full md:w-1/2 lg:w-1/3 h-full items-center p-1">
                        <ChangeAccountImageForm profileImageSrc={profileImageSrc} />
                        <p className="text-xs">Click to change profile image</p>
                    </Col>
    
                    <Col className="w-full md:w-1/2 lg:w-2/3 h-full p-1">
                        <AccountDetailsForm user={user} />
                    </Col>
                </div>
            </Col>
        </Col>
    );
}