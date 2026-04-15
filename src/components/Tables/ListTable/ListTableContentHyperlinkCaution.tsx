"use client";

import Link from "next/link";
import { ReactNode } from "react";

export default function ListTableContentHyperlinkCaution({ href, children }: { href: string, children: ReactNode }) {
    return <Link href={href} className="flex-1 text-xs text-center text-red-500 hover:text-red-400 hover:underline">{children}</Link>;
}