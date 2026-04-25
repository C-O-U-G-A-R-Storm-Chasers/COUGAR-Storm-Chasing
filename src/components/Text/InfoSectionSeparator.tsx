"use client";

import { ReactNode } from "react";
import Col from "../Col";

export default function InfoSectionseparator({ children }: { children: ReactNode }) {
    return (
        <Col
            className="
                w-full
                items-center
                
                text-center
                gap-1
            "
        >
            {children}
        </Col>
    );
}