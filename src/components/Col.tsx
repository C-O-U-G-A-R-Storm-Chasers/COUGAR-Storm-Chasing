import { HTMLAttributes, ReactNode } from "react";

export default function Col({ className, children, ...props }: { className?: string, children?: ReactNode } & HTMLAttributes<HTMLDivElement>) {
    return <div className={`flex flex-col ${className}`} {...props}>{children}</div>;
}