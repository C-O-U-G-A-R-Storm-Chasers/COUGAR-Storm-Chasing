"use client";

import Col from "@/components/Col";
import Row from "@/components/Row";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { ReactNode, useState } from "react";

export default function CollapsibleSection({ label, children }: { label: string, children: ReactNode }) {
    const [open, setOpen] = useState<boolean>(true);
    
    const handleExpand = () => setOpen((prev) => !prev);

    return (
        <Col className="w-full bg-slate-800 rounded-md">
            <Row
                onClick={handleExpand}
                className="
                    w-full
                    justify-between
                    items-center
                    p-1

                    cursor-pointer
                    select-none
                "
            >
                <p className="text-sm font-semibold text-slate-50">{label}</p>
                <ChevronDownIcon
                    className={`
                        w-5
                        h-5
                        transition-transform
                        duration-300
                        ${open ? "rotate-180" : "rotate-0"}
                    `}
                />
            </Row>

            <Col
                className={`
                    overflow-hidden
                    transition-all
                    duration-500
                    ease-in-out
                    overflow-y-auto
                    bg-slate-700
                    rounded-b-md
                    ${open ? "max-h-[1500px] opacity-100" : "max-h-0 opacity-0"}
                `}
            >
                <Col
                    className="
                        w-full
                        p-1
                    "
                >
                    {children}
                </Col>
            </Col>
        </Col>
    );
}