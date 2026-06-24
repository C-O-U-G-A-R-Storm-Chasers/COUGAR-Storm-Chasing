"use server";

import { PermissionLevels } from "@/_Enums/PermissionLevels";
import Col from "@/components/Col";
import ErrorMessage from "@/components/Messages/ErrorMessage";
import { signinValidation } from "@/lib/auth/SigninValidation/signinValidation";
import { fetchTeamCollection } from "@/lib/database/team-collections/fetchTeamCollection";
import { updateWebVisits } from "@/lib/utils/statistics/updateWebStats";
import { unixToUTC } from "@/lib/utils/unixToUTC";
import { UUID } from "crypto";
import CollectionMediaView from "./CollectionMediaView";

export default async function TeamCollectionViewByIDPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    
    const { success } = await signinValidation(PermissionLevels.MEM);

    if (!success) return <ErrorMessage description="You must be a member to access this feature!" />;

    await updateWebVisits();

    const collection = await fetchTeamCollection(id as UUID);

    if (!collection) return <ErrorMessage description={`No collection exists with ID ${id}`} />;

    return (
        <Col className="w-full gap-2">
            <Col className="w-full p-2 bg-cyan-400 text-primary-11 gap-2 rounded-md">
                <Col>
                    <p className="text-5xl">{collection.title}</p>
                    <p className="text-xs text-primary-11/75 font-semibold">Capture Date: {collection.captureDate}</p>
                    <p className="text-xs text-primary-11/75 font-semibold">Uploaded: {unixToUTC(collection.uploadedAt)}</p>
                </Col>

                <p className="text-md">{collection.description}</p>
            </Col>

            <Col className="items-center w-full p-2 bg-primary-7 gap-2 rounded-md">
                <CollectionMediaView records={collection.files} />
            </Col>
        </Col>
    );
}