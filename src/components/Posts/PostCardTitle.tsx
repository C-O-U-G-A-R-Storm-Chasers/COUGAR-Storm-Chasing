"use client";

import { Post } from "@/_Interfaces/Posts/Post";
import { generateTitleFromBody } from "@/lib/utils/text/generateTitleFromBody";

export default function PostCardTitle({ post }: { post: Post }) {
    const title = generateTitleFromBody(post.body);

    return (
        <>
            <p className="md:hidden text-xs font-semibold">{title}</p>
            <p className="hidden md:flex text-sm font-semibold">{title}</p>
        </>
    );
}