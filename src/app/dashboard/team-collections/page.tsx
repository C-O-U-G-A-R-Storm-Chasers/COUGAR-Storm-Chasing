"use server";

import { PermissionLevels } from "@/_Enums/PermissionLevels";
import Col from "@/components/Col";
import ErrorMessage from "@/components/Messages/ErrorMessage";
import Row from "@/components/Row";
import { signinValidation } from "@/lib/auth/SigninValidation/signinValidation";
import { updateWebVisits } from "@/lib/utils/statistics/updateWebStats";
import { unixToUTC } from "@/lib/utils/unixToUTC";
import { TeamCollectionWithFullRecords } from "@/_Interfaces/TeamCollections/TeamCollection";
import { fetchAllTeamCollections } from "@/lib/database/team-collections/fetchAllTeamCollections";
import Link from "next/link";
import CollectionMediaPreview from "./CollectionMediaPreview";

export default async function TeamCollectionViewPage() {
    const { success, msg } = await signinValidation(PermissionLevels.MEM);

    if (!success) return <ErrorMessage description={msg} />;

    await updateWebVisits();

    const collections: TeamCollectionWithFullRecords[] = await fetchAllTeamCollections();

    return (
        <Col className="w-full h-full items-center gap-2">
            {
                !collections || collections.length === 0 ?
                <Col className="w-2/3 items-center text-center">
                    <p className="text-4xl">Uh oh!</p>
                    <p className="text-xl">It appears that we have not uploaded any media to our website yet. This means something is wrong, or the website is very new. Please try refreshing the page!</p>
                    <p className="text-lg">If you believe this is an error, please report it.</p>
                </Col>
                :
                collections.map(collection => (
                    <Row key={collection.id}>
                        <Col className="w-3/8 p-2 bg-cyan-400 text-primary-11 rounded-tl-md rounded-bl-md gap-2">
                            <Col>
                                <Link href={`/dashboard/team-collections/${collection.id}`} className="text-2xl hover:underline">{collection.title}</Link>
                                <p className="text-xs text-primary-11/75 font-semibold">Capture Date: {collection.captureDate}</p>
                                <p className="text-xs text-primary-11/75 font-semibold">Uploaded: {unixToUTC(collection.uploadedAt)}</p>
                            </Col>

                            <p className="text-xs">{collection.description}</p>
                        </Col>

                        <Col className="w-5/8 bg-primary-7">
                            <CollectionMediaPreview fileRecords={collection.files} />
                        </Col>
                    </Row>
                ))
            }
        </Col>
    );
}