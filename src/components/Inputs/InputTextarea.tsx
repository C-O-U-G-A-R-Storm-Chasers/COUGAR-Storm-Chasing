"use client";

export default function InputTextarea({ rows, className, ...props }: { rows?: number, className?: string } & React.InputHTMLAttributes<HTMLTextAreaElement>) {
    return (
        <textarea
            className={`
                w-full
                p-1

                text-md

                outline-none
                border-1
                border-slate-50/20
                focus:border-slate-50

                rounded-sm

                ${className}
            `}
            rows={rows ?? 2}
            {...props}
        ></textarea>
    );
}