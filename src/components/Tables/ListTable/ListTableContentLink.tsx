"use client";

import Link from "next/link";
import { ReactNode } from "react";

export default function ListTableContentLink({ href, children }: { href: string, children: ReactNode }) {
    return <Link href={href} className="flex-1 text-md text-center hover:underline">{children}</Link>;
}