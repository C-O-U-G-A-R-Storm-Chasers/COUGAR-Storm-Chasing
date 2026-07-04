"use server";

import Col from "../Col";
import { Post } from "@/_Interfaces/Posts/Post";
import PostCardHeader from "./Header/PostCardHeader";
import PostCardBody from "./PostCardBody";
import PostCardMedia from "./Media/PostCardMedia";
import { MediaFile } from "@/_Interfaces/Files/MediaFile";

export default async function PostCard({ post }: { post: Post }) {
    return (
        <Col
            className="
                w-full
                p-1
                px-2
                
                bg-neutral-600

                border-1
                border-neutral-500
                rounded-md

                gap-2
            "
        >
            <PostCardHeader post={post} />
            
            <PostCardBody post={post} />

            <PostCardMedia postID={post.id} media={post.files as MediaFile[]} />
        </Col>
    );
}