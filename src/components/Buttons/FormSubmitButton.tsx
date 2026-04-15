import { ButtonHTMLAttributes, ReactNode } from "react";

export default function FormSubmitButton({ children, ...props }: { children: ReactNode } & ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            type="submit"
            className="
                p-2
                px-4

                bg-gradient-to-br
                from-violet-500
                to-violet-700
                hover:from-violet-600
                hover:to-violet-500

                border-1
                border-violet-50/20

                text-sm
                font-semibold
                rounded-sm
                cursor-pointer
            "
            {...props}
        >
            {children}
        </button>
    );
}