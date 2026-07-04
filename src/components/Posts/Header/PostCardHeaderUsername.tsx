"use server";

import { User } from "@/_Interfaces/Users/User";
import Link from "next/link";

export default async function PostCardHeaderUsername({ user }: { user: User }) {
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
                className="hidden md:flex text-sm font-semibold hover:underline"
            >
                {user.username}
            </Link>
        </>
    );
}