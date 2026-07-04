"use server";

import { Fragment } from "react";
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
            <p className="text-xs whitespace-pre-wrap">
                {
                    body.split("\r\n").map((line, i) => (
                        <Fragment key={i}>
                            {line}
                            <br />
                        </Fragment>
                    ))
                }
            </p>
        </Col>
    );
}