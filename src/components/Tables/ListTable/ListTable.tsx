"use client";

import { ReactNode } from "react";
import Col from "../../Col";

export default function ListTable({ children }: { children: ReactNode }) {
    return (
        <Col className="w-full text-slate-950">
            {children}
        </Col>
    );
}