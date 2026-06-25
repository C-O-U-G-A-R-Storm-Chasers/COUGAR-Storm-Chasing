"use client";

import { User } from "@/_Interfaces/Users/User";
import Image from "next/image";
import Link from "next/link";
import Col from "../Col";
import { UserCircleIcon } from "@heroicons/react/24/outline";

export default function UserNavButton({ user }: { user: User }) {
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
            {
                user.profileImage ?
                <Col className="items-center justify-center w-5 h-5 bg-teal-700 rounded-md">
                    <Image
                        src={`/cdn/profile_images/${user.profileImage.id}.${user.profileImage.ext}`}
                        alt={`${user.username}'s Profile Image`}
                        width={512}
                        height={512}
                        className="w-full h-full"
                    />
                </Col>
                :
                <Col className="items-center justify-center w-5 h-5 bg-teal-700 rounded-md">
                    <UserCircleIcon className="w-full h-full text-primary-1" />
                </Col>
            }
            
            <p className="text-xs font-semibold text-blue-500">{user.username}</p>
        </Link>
    );
}