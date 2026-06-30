"use client";

import { ReactNode } from "react";

export default function NavbarSection({ children }: { children: ReactNode }) {
    return (
        <div className="flex flex-row items-center gap-2">
            {children}
        </div>
    );
}