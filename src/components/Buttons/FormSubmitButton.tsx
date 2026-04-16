import { ButtonHTMLAttributes, ReactNode } from "react";

export default function FormSubmitButton({ children, ...props }: { children: ReactNode } & ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            type="submit"
            className="
                p-1

                text-xs
                font-semibold

                bg-gradient-to-br
                from-emerald-500
                to-emerald-600

                hover:from-emerald-600
                hover:to-emerald-500

                border-1
                border-emerald-500

                rounded-sm
                cursor-pointer
            "
            {...props}
        >
            {children}
        </button>
    );
}