import { ButtonHTMLAttributes, ReactNode } from "react";

export default function FormActionButton({ children, onClick, ...props }: { children: ReactNode } & ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            type="button"
            className="
                flex
                flex-row
                items-center
                p-2
                px-4

                bg-gradient-to-br
                from-emerald-500
                to-emerald-700
                hover:from-emerald-600
                hover:to-emerald-500

                border-1
                border-emerald-50/20

                text-sm
                font-semibold
                rounded-sm
                cursor-pointer
                gap-2
            "
            onClick={(e) => {
                if (onClick) {
                    e.preventDefault();
                    onClick(e);
                }
            }}
            {...props}
        >
            {children}
        </button>
    );
}