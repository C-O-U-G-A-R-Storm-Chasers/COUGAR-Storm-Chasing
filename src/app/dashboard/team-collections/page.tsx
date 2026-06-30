"use server";

import Col from "@/components/Col";
import ErrorMessage from "@/components/Messages/ErrorMessage";
import { signinValidation } from "@/lib/auth/SigninValidation/signinValidation";
import { updateWebVisits } from "@/lib/utils/statistics/updateWebStats";
import { TeamCollectionWithFullRecords } from "@/_Interfaces/TeamCollections/TeamCollection";
import { fetchAllTeamCollections } from "@/lib/database/team-collections/fetchAllTeamCollections";
import PostCard from "@/components/Posts/PostCard";
import PostCardHeader from "@/components/Posts/PostCardHeader";
import { unixToDate } from "@/lib/utils/unixToDate";
import PostCardBody from "@/components/Posts/PostCardBody";
import PostCardMedia from "@/components/Posts/Media/PostCardMedia";

export default async function TeamCollectionViewPage() {
    const { success, msg } = await signinValidation();

    if (!success) return <ErrorMessage description={msg} />;

    await updateWebVisits();

    const collections: TeamCollectionWithFullRecords[] = await fetchAllTeamCollections();

    return (
        <Col className="w-full p-2 gap-2">
            {
                !collections || collections.length === 0 ?
                <Col className="w-full items-center text-center">
                    <p className="text-4xl">Uh oh!</p>
                    <p className="text-xl">It appears that we have not uploaded any media to our website yet. This means something is wrong, or the website is very new. Please try refreshing the page!</p>
                    <p className="text-lg">If you believe this is an error, please report it.</p>
                </Col>
                :
                collections.map(collection => (
                    <PostCard key={collection.id}>
                        <PostCardHeader
                            title={collection.title}
                            timestamp={unixToDate(collection.uploadedAt)}
                            postedByUID={collection.uploader}
                        />
                        
                        <PostCardBody body={collection.description} />

                        <PostCardMedia
                            collectionMedia={{
                                collectionID: collection.id,
                                collectionFiles: collection.files
                            }}
                        />
                    </PostCard>
                ))
            }
        </Col>
    );
}