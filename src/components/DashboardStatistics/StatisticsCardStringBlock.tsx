"use client";

import Col from "../Col";

export default function StatisticsCardStringBlock({ string, label }: { string: string, label: string }) {
    return (
        <Col className="items-center min-w-1/3 p-1 bg-neutral-700 rounded-sm">
            <p className="text-xl">{string}</p>
            <p className="text-sm">{label}</p>
        </Col>
    );
}