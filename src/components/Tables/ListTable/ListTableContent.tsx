"use client";

import { ReactNode } from "react";

export default function ListTableContent({ children }: { children: ReactNode }) {
    return <p className="flex-1 text-xs text-center">{children}</p>;
}