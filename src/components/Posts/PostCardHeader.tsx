"use server";

import { User } from "@/_Interfaces/Users/User";
import Col from "../Col";
import Row from "../Row";
import { fetchUserByID } from "@/lib/database/users/fetchUserByID";
import Link from "next/link";
import Image from "next/image";
import { fetchUserProfileImage } from "@/lib/database/users/fetchUserProfileImage";

export default async function PostCardHeader(
    {
        title,
        timestamp,
        postedByUID,
    }:
    {
        title: string,
        timestamp: string,
        postedByUID: User["uid"],
    }
) {
    const user = await fetchUserByID(postedByUID);

    let profileImage = null;
    if (user?.profileImage) profileImage = await fetchUserProfileImage(user.profileImage);

    return (
        <Col className="w-full">
            <Row className="items-center gap-2">
                {
                    (user && profileImage) ?
                    <Row className="items-center gap-2">
                        <Link
                                href={`/dashboard/account/${user.handle ?? user.uid}`}
                                className="w-6 h-6"
                            >
                            <Image
                                src={`/cdn/profile_images/${profileImage.id}.${profileImage.ext}`}
                                alt={`${user.username}'s Profile Image`}
                                width={512}
                                height={512}
                                className="w-full h-full rounded-md"
                            />
                        </Link>

                        <Link
                            href={`/dashboard/account/${user.handle ?? user.uid}`}
                            className="text-xs font-semibold hover:underline"
                        >
                            {user.username}
                        </Link>

                        <p className="text-lg font-semibold">·</p>

                        <p className="text-xs font-semibold text-primary-1/50">{timestamp}</p>
                    </Row>
                    :
                    "null"
                }
            </Row>
            
            <p className="text-md font-semibold">{title}</p>
        </Col>
    );
}