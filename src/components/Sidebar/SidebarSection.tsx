"use client";

import { ReactNode } from "react";
import Col from "../Col";

export default function SidebarSection({ label, collapsed, children }: { label?: string, collapsed: boolean, children?: ReactNode }) {
    return (
        <Col className="w-full items-center gap-2">
            { (label && !collapsed) && <p className="text-xs text-primary-1/75 font-semibold">{label}</p>}

            <Col className="w-full gap-1">
                {children}
            </Col>
        </Col>
    );
}