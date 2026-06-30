"use client";

import Col from "@/components/Col";
import { ReactNode } from "react";

export default function StatisticsCard({ title, children }: { title: string, children?: ReactNode}) {
    return (
        <Col className="w-full lg:min-w-[245px] lg:max-w-1/4 p-2 bg-neutral-800 rounded-md gap-2">
            <p className="w-full text-xs font-bold text-primary-1/50 border-b-1 border-primary-1/50">{title}</p>

            {children}
        </Col>
    );
}