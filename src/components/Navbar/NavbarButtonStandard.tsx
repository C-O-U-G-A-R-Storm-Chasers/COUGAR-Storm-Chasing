"use client";

import Link from "next/link";
import { ReactNode } from "react";

export default function NavbarButtonStandard({ children, href }: { children: ReactNode, href: string }) {
    return (
        <Link
            href={href}
            className="
                flex
                flex-row
                items-center
                p-1

                hover:bg-sky-50/25

                rounded-sm
                gap-1
            "
        >
            {children}
        </Link>
    );
}