"use client";

import Row from "@/components/Row";
import { ReactNode } from "react";

export default function ListTableHeaderRow({ children }: { children: ReactNode }) {
    return (
        <Row
            className="
                items-center
                p-1

                odd:bg-slate-800
                even:bg-slate-900

                first:rounded-t-sm
                last:rounded-b-sm

                gap-2
            "
        >
            {children}
        </Row>
    );
}