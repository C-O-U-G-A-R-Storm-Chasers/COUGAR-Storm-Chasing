"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export default function ControlBarButton({ href, children }: { href: string, children: ReactNode }) {
    const pathname = usePathname();

    return (
        <Link
            href={href}
            className={`
                flex
                flex-row
                items-center
                p-1
                px-2

                ${(pathname === href) && "bg-sky-50/5"}
                hover:bg-sky-50/25

                rounded-sm
                gap-2
            `}
        >
            {children}
        </Link>
    );
}