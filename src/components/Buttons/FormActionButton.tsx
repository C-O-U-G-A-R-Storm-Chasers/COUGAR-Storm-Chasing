import { ButtonHTMLAttributes, ReactNode } from "react";

export default function FormActionButton({ children, onClick, ...props }: { children: ReactNode } & ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            type="button"
            className="
                p-1

                text-xs
                font-semibold

                bg-gradient-to-br
                from-sky-500
                to-sky-600

                hover:from-sky-600
                hover:to-sky-500

                border-1
                border-sky-500

                rounded-sm
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