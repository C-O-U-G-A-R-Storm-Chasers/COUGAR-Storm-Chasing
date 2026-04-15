"use client";

import { ReactNode } from "react";
import Col from "../../Col";

export default function ListTable({ children }: { children: ReactNode }) {
    return (
        <Col>
            {children}
        </Col>
    );
}