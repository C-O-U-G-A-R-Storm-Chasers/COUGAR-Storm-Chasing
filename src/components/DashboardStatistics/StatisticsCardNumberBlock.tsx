"use client";

import Col from "../Col";

export default function StatisticsCardNumberBlock({ count, label }: { count: number, label: string }) {
    return (
        <Col className="items-center min-w-1/3 p-1 bg-neutral-700 rounded-sm">
            <p className="text-xl">{count}</p>
            <p className="text-sm">{label}</p>
        </Col>
    );
}