"use server";

import { User } from "@/_Interfaces/Users/User";
import Col from "../Col";
import Row from "../Row";
import { fetchUserByID } from "@/lib/database/users/fetchUserByID";
import Link from "next/link";
import Image from "next/image";
import { fetchUserProfileImage } from "@/lib/database/users/fetchUserProfileImage";
import { ProfileImage } from "@/_Interfaces/Files/ProfileImage";
import ProfileImagePlaceholder from "../Users/ProfileImagePlaceholder";

function ProfileImageLink({ user, profileImage }: { user: User, profileImage: ProfileImage | null }) {
    const href = `/dashboard/account/${user.handle ?? user.uid}`;

    if (profileImage) return (
        <Col>
            <Link
                href={href}
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
        </Col>
    );

    return (
        <Col className="w-6 h-6">
            <Link
                href={href}
                className="w-full h-full"
            >
                <ProfileImagePlaceholder username={user.username} />
            </Link>
        </Col>
    );
}

function UsernameLink({ user }: { user: User }) {
    const href = `/dashboard/account/${user.handle ?? user.uid}`;

    return (
        <>
            <Link
                href={href}
                className="md:hidden text-sm font-semibold hover:underline"
            >
                {user.username}
            </Link>

            <Link
                href={href}
                className="hidden md:flex text-xs font-semibold hover:underline"
            >
                {user.username}
            </Link>
        </>
    );
}

export default async function PostCardHeader(
    {
        title,
        timestamp,
        postedByUID,
    }:
    {
        title?: string,
        timestamp: string,
        postedByUID: User["uid"],
    }
) {
    const user = await fetchUserByID(postedByUID);

    let profileImage = null;
    if (user?.profileImage) profileImage = await fetchUserProfileImage(user.profileImage);

    return (
        <Col className="w-full">
            <Row className="w-full items-center gap-2">
                {
                    user ?
                    <>
                        <ProfileImageLink user={user} profileImage={profileImage} />
                        
                        <Col>
                            <UsernameLink user={user} />
                            <p className="md:hidden text-xs font-semibold text-primary-1/50">{timestamp}</p>
                            <p className="hidden md:flex text-2xs font-semibold text-primary-1/50">{timestamp}</p>
                        </Col>
                    </>
                    :
                    <Col>
                        <p className="text-xs">null</p>
                    </Col>
                }
            </Row>
            
            {
                title &&
                <>
                    <p className="md:hidden text-xs font-semibold">{title}</p>
                    <p className="hidden md:flex text-sm font-semibold">{title}</p>
                </>
            }
        </Col>
    );
}