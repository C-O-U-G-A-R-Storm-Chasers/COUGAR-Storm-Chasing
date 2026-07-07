"use server";

import Col from "@/components/Col";
import { signinValidation } from "@/lib/auth/SigninValidation/signinValidation";
import ErrorMessage from "@/components/Messages/ErrorMessage";
import { updateWebVisits } from "@/lib/utils/statistics/updateWebStats";
import Row from "@/components/Row";
import InfoPageTitle from "@/components/Text/Headers/InfoPageTitle";
import { PermissionLevels } from "@/_Enums/PermissionLevels";
import TeamCollectionStats from "@/components/DashboardStatistics/Cards/TeamCollectionsStats";
import UserStats from "@/components/DashboardStatistics/Cards/UserStats";
import PaymentStats from "@/components/DashboardStatistics/Cards/PaymentStats";

export default async function DashboardStatisticsPage() {
    const { success, msg, data: user } = await signinValidation(PermissionLevels.MEM);
            
    if (!success) return (
        <Col
            className="
                w-full
                items-start
                p-2
                
                gap-2
            "
        >
            <ErrorMessage description={msg} />
        </Col>
    );

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
            <Col className="w-full">
                <InfoPageTitle textContent="Statistics" />

                <p className="text-xs font-semibold">This page displays various website statistics for the website itself, our storm chases, our outlooks, your personal stats, and more.</p>
            </Col>

            <Col className="lg:hidden w-full flex-wrap gap-2">
                {
                    (user && user.perm_level < PermissionLevels.MOD) &&
                    <UserStats />
                }

                {/*<TeamCollectionStats />*/}

                <PaymentStats />
            </Col>

            <Row className="hidden lg:flex w-full flex-wrap gap-2">
                {
                    (user && user.perm_level < PermissionLevels.MOD) &&
                    <UserStats />
                }

                {/*<TeamCollectionStats />*/}
                
                <PaymentStats />
            </Row>
        </Col>
    );
}