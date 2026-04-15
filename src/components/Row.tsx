import { HTMLAttributes, ReactNode } from "react";

export default function Row({ className, children, ...props }: { className?: string, children?: ReactNode } & HTMLAttributes<HTMLDivElement>) {
    return <div className={`flex flex-row ${className}`} {...props}>{children}</div>;
}