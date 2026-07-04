"use server";

import { Fragment } from "react";
import Col from "../Col";
import { Post } from "@/_Interfaces/Posts/Post";
import Link from "next/link";

export default async function PostCardBody({ post }: { post: Post }) {
    return (
        <Col className="w-full gap-2">
            <Link
                href={`/dashboard/posts/${post.id}`}
                className="
                    p-1

                    text-xs
                    whitespace-pre-wrap

                    hover:bg-neutral-500

                    rounded-sm
                "
            >
                {
                    post.body.split("\r\n").map((line, i) => (
                        <Fragment key={i}>
                            {line}
                            <br />
                        </Fragment>
                    ))
                }
            </Link>
        </Col>
    );
}