import { ButtonHTMLAttributes, ReactNode } from "react";

export default function FormSubmitButton({ children, ...props }: { children: ReactNode } & ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            type="submit"
            className="
                p-1

                text-xs
                font-semibold

                text-primary-1

                bg-gradient-to-br
                from-blue-500
                to-blue-600

                hover:from-blue-600
                hover:to-blue-500

                border-1
                border-blue-500

                rounded-xs
                cursor-pointer
            "
            {...props}
        >
            {children}
        </button>
    );
}