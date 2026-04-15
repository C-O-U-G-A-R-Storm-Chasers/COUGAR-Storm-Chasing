"use client";

import Link from "next/link";
import { ReactNode } from "react";

export default function ListTableContentHyperlink({ href, children }: { href: string, children: ReactNode }) {
    return <Link href={href} className="flex-1 text-xs text-center text-sky-500 hover:text-sky-400 hover:underline">{children}</Link>;
}