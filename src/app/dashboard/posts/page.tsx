"use server";

import Col from "@/components/Col";
import ErrorMessage from "@/components/Messages/ErrorMessage";
import { signinValidation } from "@/lib/auth/SigninValidation/signinValidation";
import { updateWebVisits } from "@/lib/utils/statistics/updateWebStats";
import PostCard from "@/components/Posts/PostCard";
import { Post } from "@/_Interfaces/Posts/Post";
import { fetchAllPosts } from "@/lib/database/posts/fetchAllPosts";
import PostCreateForm from "@/components/Forms/Posts/PostCreateForm";
import { fetchUserProfileImage } from "@/lib/database/users/fetchUserProfileImage";
import { PermissionLevels } from "@/_Enums/PermissionLevels";

export default async function PostsViewPage() {
    const { success, msg, data: currentUser } = await signinValidation(PermissionLevels.MEM);
    
    if (!success || !currentUser) return (
        <Col className="w-full p-2 gap-2">
            <ErrorMessage description={msg} />
        </Col>
    );

    await updateWebVisits();

    let currentUserProfileImage = null;

    if (currentUser?.profileImage) currentUserProfileImage = await fetchUserProfileImage(currentUser.profileImage);
    const posts: Post[] = await fetchAllPosts();

    return (
        <Col className="w-full h-full items-center overflow-y-auto">
            <Col className="w-full md:w-1/2 p-2">
                <PostCreateForm currentUser={currentUser} currentUserProfileImage={currentUserProfileImage} />

                <Col className="w-full pt-2 gap-2">
                    {
                        !posts || posts.length === 0 ?
                        <Col className="w-full items-center text-center">
                            <p className="text-4xl">Uh oh!</p>
                            <p className="text-xl">It appears that we have not uploaded any media to our website yet. This means something is wrong, or the website is very new. Please try refreshing the page!</p>
                            <p className="text-lg">If you believe this is an error, please report it.</p>
                        </Col>
                        :
                        posts.map(post => <PostCard key={post.id} post={post} />)
                    }
                </Col>
            </Col>
        </Col>
    );
}