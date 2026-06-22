"use client";

import { User } from "@/_Interfaces/Users/User";
import Link from "next/link";

export default function UserNavButton({ user }: { user: User }) {
    return (
        <Link
            href="/dashboard/account"
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
            <p className="text-xs font-semibold text-blue-500">{user.username}</p>
        </Link>
    );
}