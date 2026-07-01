"use server";

import Col from "@/components/Col";
import ErrorMessage from "@/components/Messages/ErrorMessage";
import { signinValidation } from "@/lib/auth/SigninValidation/signinValidation";
import { updateWebVisits } from "@/lib/utils/statistics/updateWebStats";
import PostCard from "@/components/Posts/PostCard";
import PostCardHeader from "@/components/Posts/PostCardHeader";
import { unixToDate } from "@/lib/utils/unixToDate";
import PostCardBody from "@/components/Posts/PostCardBody";
import PostCardMedia from "@/components/Posts/Media/PostCardMedia";
import { Post } from "@/_Interfaces/Posts/Post";
import { fetchAllPosts } from "@/lib/database/posts/fetchAllPosts";
import { MediaFile } from "@/_Interfaces/Files/MediaFile";

export default async function PostsViewPage() {
    const { success, msg } = await signinValidation();

    if (!success) return (
        <Col className="w-full p-2 gap-2">
            <ErrorMessage description={msg} />
        </Col>
    );

    await updateWebVisits();

    const posts: Post[] = await fetchAllPosts();

    return (
        <Col className="w-full p-2 gap-2">
            {
                !posts || posts.length === 0 ?
                <Col className="w-full items-center text-center">
                    <p className="text-4xl">Uh oh!</p>
                    <p className="text-xl">It appears that we have not uploaded any media to our website yet. This means something is wrong, or the website is very new. Please try refreshing the page!</p>
                    <p className="text-lg">If you believe this is an error, please report it.</p>
                </Col>
                :
                posts.map(post => (
                    <PostCard key={post.id}>
                        <PostCardHeader
                            title={`${post.body.slice(0, 16)}...`}
                            timestamp={unixToDate(post.uploadedAt)}
                            postedByUID={post.uploader}
                        />
                        
                        <PostCardBody body={post.body} />

                        <PostCardMedia postID={post.id} media={post.files as MediaFile[]} />
                    </PostCard>
                ))
            }
        </Col>
    );
}