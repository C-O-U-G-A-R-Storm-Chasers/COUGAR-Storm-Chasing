"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import Row from "../Row";

export default function SidebarButtonStandard({ children, href }: { children: ReactNode, href: string }) {
    const pathname = usePathname();

    return (
        <Row
            className={`
                w-full
                justify-center

                ${(pathname === href) && "border-l-3 border-cyan-500"}

                gap-1
            `}
        >
            <Link
                href={href}
                className={`
                    flex
                    flex-row
                    w-9/10
                    items-center
                    p-1
                    px-2

                    ${(pathname === href) && "bg-sky-50/5"}
                    hover:bg-sky-50/25

                    rounded-sm
                    gap-1
                    md:gap-2
                `}
            >
                {children}
            </Link>
        </Row>
    );
}