"use server";

import { User } from "@/_Interfaces/Users/User";
import { fetchUserProfileImage } from "@/lib/database/users/fetchUserProfileImage";
import Link from "next/link";
import Image from "next/image";
import Col from "@/components/Col";
import ProfileImagePlaceholder from "@/components/Users/ProfileImagePlaceholder";

export default async function PostCardHeaderProfileImage({ user }: { user: User }) {
    const href = `/dashboard/account/${user.handle ?? user.uid}`;

    let profileImage = null;
    if (user?.profileImage) profileImage = await fetchUserProfileImage(user.profileImage);

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