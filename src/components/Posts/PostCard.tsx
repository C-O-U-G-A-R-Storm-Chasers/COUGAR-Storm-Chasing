"use server";

import { ReactNode } from "react";
import Col from "../Col";

export default async function PostCard({ children }: { children: ReactNode }) {
    return (
        <Col
            className="
                w-full
                min-w-100
                max-w-120
                p-1
                px-2
                
                bg-neutral-600

                border-1
                border-neutral-500
                rounded-md

                gap-2
            "
        >
            {children}
        </Col>
    );
}