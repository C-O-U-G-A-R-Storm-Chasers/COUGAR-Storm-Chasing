"use client";

import { Post } from "@/_Interfaces/Posts/Post";

export default function PostCardTitle({ post }: { post: Post }) {
    const hasLineBreak = post.body.includes("\n");

    let title: string | undefined;

    if (hasLineBreak) {
        const firstPara = post.body.split("\n")[0].trim();

        const periodIndex = firstPara.indexOf(".");

        title = periodIndex === -1 ? firstPara : firstPara.slice(0, periodIndex + 1);
    }

    return (
        <>
            <p className="md:hidden text-xs font-semibold">{title}</p>
            <p className="hidden md:flex text-sm font-semibold">{title}</p>
        </>
    );
}