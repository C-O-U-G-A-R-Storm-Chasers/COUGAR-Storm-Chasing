"use server";

import Col from "../../Col";
import Row from "../../Row";
import { fetchUserByID } from "@/lib/database/users/fetchUserByID";
import { Post } from "@/_Interfaces/Posts/Post";
import PostCardTitle from "../PostCardTitle";
import PostCardHeaderProfileImage from "./PostCardHeaderProfileImage";
import PostCardHeaderUsername from "./PostCardHeaderUsername";
import { unixToDate } from "@/lib/utils/unixToDate";

export default async function PostCardHeader({ post }: { post: Post }) {
    const user = await fetchUserByID(post.uploader);

    return (
        <Col className="w-full">
            <Row className="w-full items-center gap-2">
                {
                    user ?
                    <>
                        <PostCardHeaderProfileImage user={user} />
                        
                        <Col>
                            <PostCardHeaderUsername user={user} />
                            <p className="md:hidden text-xs font-semibold text-primary-1/50">{unixToDate(post.uploadedAt)}</p>
                            <p className="hidden md:flex text-2xs font-semibold text-primary-1/50">{unixToDate(post.uploadedAt)}</p>
                        </Col>
                    </>
                    :
                    <Col>
                        <p className="text-xs">null</p>
                    </Col>
                }
            </Row>
            
            < PostCardTitle post={post} />
        </Col>
    );
}