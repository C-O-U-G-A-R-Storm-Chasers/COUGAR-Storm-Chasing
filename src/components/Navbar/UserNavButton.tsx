"use client";

import { User } from "@/_Interfaces/Users/User";
import Image from "next/image";
import Link from "next/link";
import Col from "../Col";
import { ProfileImage } from "@/_Interfaces/Files/ProfileImage";
import ProfileImagePlaceholder from "../Users/ProfileImagePlaceholder";

export default function UserNavButton({ user, profileImage }: { user: User, profileImage: ProfileImage | null }) {
    return (
        <Link
            href={`/dashboard/account/${user.handle ?? user.uid}`}
            className="
                flex
                flex-row
                items-center
                p-1
                px-2

                bg-neutral-50

                rounded-lg
                gap-1
            "
        >
            
            <Col className="relative items-center justify-center w-5 aspect-square rounded-md">
                {
                    profileImage ?
                    <Image
                        src={`/cdn/profile_images/${profileImage.id}.${profileImage.ext}`}
                        alt={`${user.username}'s Profile Image`}
                        fill
                        className="w-full h-full"
                    />
                    :
                    <ProfileImagePlaceholder username={user.username} />
                }
            </Col>
            
            <p className="text-xs font-semibold text-blue-500">{user.username}</p>
        </Link>
    );
}