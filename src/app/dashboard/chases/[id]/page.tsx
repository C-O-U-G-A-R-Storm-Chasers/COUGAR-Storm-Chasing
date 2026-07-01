"use server";

import Col from "@/components/Col";
import ErrorMessage from "@/components/Messages/ErrorMessage";
import InfoHeader from "@/components/Text/Headers/InfoHeader";
import { signinValidation } from "@/lib/auth/SigninValidation/signinValidation";
import ChaseRecord from "@/components/Chases/ChaseRecord";
import Row from "@/components/Row";
import AllPlannedChasesButton from "../latest/AllPlannedChasesButton";
import LatestPlannedChaseButton from "../LatestPlannedChaseButton";
import { fetchPlannedChase } from "@/lib/database/chases/fetchPlannedChase";
import { UUID } from "crypto";
import { updateWebVisits } from "@/lib/utils/statistics/updateWebStats";
import { PermissionLevels } from "@/_Enums/PermissionLevels";

export default async function PlannedChasePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const { success } = await signinValidation(PermissionLevels.MEM);

    if (!success) return (
        <Col className="w-full h-full items-center justify-center">
            <ErrorMessage description="You must be a member to access this feature!" />
        </Col>
    );

    await updateWebVisits();

    const chase = await fetchPlannedChase(id as UUID);

    return (
        <Col className="w-full h-full items-center justify-center">
            <Col
                className="
                    flex
                    flex-col
                    items-start
                    w-3/4
                    p-2
                    
                    bg-primary-10

                    border-1
                    border-primary-9

                    rounded-md
                    
                    gap-2
                "
            >
                <Col className="w-full items-center gap-2">
                    <InfoHeader textContent={!chase ? "Unknown Planned Chase" : `${chase.start_date} - ${chase.end_date}`}/>

                    <Row className="gap-2">
                        <LatestPlannedChaseButton />
                        <AllPlannedChasesButton />
                    </Row>
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