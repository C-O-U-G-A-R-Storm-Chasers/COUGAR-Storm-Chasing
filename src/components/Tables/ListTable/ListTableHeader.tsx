"use client";

import { ReactNode } from "react";

export default function ListTableHeader({ children }: { children: ReactNode }) {
    return <div className="flex flex-row flex-1 justify-center items-center text-md font-semibold gap-2">{children}</div>;
}