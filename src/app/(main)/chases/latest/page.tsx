"use server";

import Col from "@/components/Col";
import ErrorMessage from "@/components/Messages/ErrorMessage";
import InfoHeader from "@/components/Text/Headers/InfoHeader";
import { signinValidation } from "@/lib/auth/SigninValidation/signinValidation";
import AllPlannedChasesButton from "./AllPlannedChasesButton";
import { fetchLatestPlannedChase } from "@/lib/database/chases/fetchLatestPlannedChase";
import ChaseRecord from "@/components/Chases/ChaseRecord";
import { updateWebVisits } from "@/lib/utils/statistics/updateWebStats";
import { PermissionLevels } from "@/_Enums/PermissionLevels";

export default async function LatestPlannedChasePage() {
    const { success } = await signinValidation(PermissionLevels.MEM);

    if (!success) return <ErrorMessage description="You must be a member to access this feature!" />;

    await updateWebVisits();

    const chase = await fetchLatestPlannedChase();

    return (
        <Col className="w-full h-full items-center justify-center">
            <Col
                className="
                    flex
                    flex-col
                    items-start
                    w-3/4
                    p-2
                    
                    bg-sky-700

                    border-1
                    border-sky-500

                    rounded-md
                    
                    gap-2
                "
            >
                <Col className="w-full items-center gap-2">
                    <InfoHeader textContent="Latest Planned Chase"/>

                    <AllPlannedChasesButton />
                </Col>

                {
                    !chase ?
                    <ErrorMessage description="There are currently no planned chases." /> :
                    <ChaseRecord chase={chase} />
                }
            </Col>
        </Col>
    );
}