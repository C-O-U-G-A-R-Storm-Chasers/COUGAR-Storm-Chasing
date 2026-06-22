import { ButtonHTMLAttributes, ReactNode } from "react";

export default function FormActionButton({ children, onClick, ...props }: { children: ReactNode } & ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            type="button"
            className="
                p-1

                text-xs
                font-semibold

                text-primary-1

                bg-gradient-to-br
                from-neutral-500
                to-neutral-600

                hover:from-neutral-600
                hover:to-neutral-500

                border-1
                border-neutral-500

                rounded-xs
                cursor-pointer
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