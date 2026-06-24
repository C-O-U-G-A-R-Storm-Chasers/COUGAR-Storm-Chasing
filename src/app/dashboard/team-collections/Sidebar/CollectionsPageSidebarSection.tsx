"use client";

import Col from "@/components/Col";
import { ReactNode } from "react";

export default function CollectionsPageSidebarSection({ label, children }: { label?: string, children?: ReactNode }) {
    return (
        <Col className="w-full items-center gap-2">
            { label && <p className="text-md text-primary-1/75 font-semibold">{label}</p>}

            <Col className="w-full gap-1">
                {children}
            </Col>
        </Col>
    );
}