"use server";

import Col from "@/components/Col";
import { signinValidation } from "@/lib/auth/SigninValidation/signinValidation";
import ErrorMessage from "@/components/Messages/ErrorMessage";
import { updateWebVisits } from "@/lib/utils/statistics/updateWebStats";
import Row from "@/components/Row";
import InfoPageTitle from "@/components/Text/Headers/InfoPageTitle";
import TeamCollectionStats from "@/components/DashboardStatistics/TeamCollections/TeamCollectionsStats";
import { PermissionLevels } from "@/_Enums/PermissionLevels";
import UserStats from "@/components/DashboardStatistics/TeamCollections/UserStats";

export default async function DashboardPage() {
    const { success, msg, data: user } = await signinValidation();
            
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
            <InfoPageTitle textContent="Statistics" />

            <Row className="w-full flex-wrap gap-2">
                {
                    (user && user.perm_level < PermissionLevels.MOD) &&
                    <UserStats />
                }

                <TeamCollectionStats />
            </Row>
        </Col>
    );
}