"use server";

import Col from "../Col";

export default async function PostCardBody(
    {
        body,
    }:
    {
        body: string,
    }
) {
    return (
        <Col className="w-full gap-2">
            <p className="text-xs">{body}</p>
        </Col>
    );
}