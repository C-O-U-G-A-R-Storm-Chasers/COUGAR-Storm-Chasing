"use client";

import { ReactNode } from "react";
import Col from "../Col";

export default function SidebarSection({ label, children }: { label?: string, children?: ReactNode }) {
    return (
        <Col className="w-full items-center gap-2">
            { label && <p className="text-sm text-primary-1/75 font-semibold">{label}</p>}

            <Col className="w-full gap-2">
                {children}
            </Col>
        </Col>
    );
}