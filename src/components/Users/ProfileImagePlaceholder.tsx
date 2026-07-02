"use client";

import { User } from "@/_Interfaces/Users/User";
import Col from "../Col";

export default function ProfileImagePlaceholder({ username }: { username: User["username"] }) {
    const colors = [
        "bg-red-500",
        "bg-orange-500",
        "bg-yellow-500",
        "bg-lime-500",
        "bg-green-500",
        "bg-emerald-500",
        "bg-teal-500",
        "bg-cyan-500",
        "bg-sky-500",
        "bg-blue-500",
        "bg-indigo-500",
        "bg-violet-500",
        "bg-purple-500",
        "bg-fuchsia-500",
        "bg-pink-500",
        "bg-rose-500",
    ];

    const color = colors[
        username
            .split("")
            .reduce((sum, char) => sum + char.charCodeAt(0), 0) % colors.length
    ];

    return (
        <Col
            className={`
                justify-center
                items-center
                w-full
                h-full

                text-neutral-50

                ${color}

                rounded-sm
            `}
        >
            <p className="text-xs">{username.slice(0, 1)}</p>
        </Col>
    );
}