import { ReactNode } from "react";

export default function FormUploadButton({ children, ...props }: { children: ReactNode }  & React.ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            type="button"
            className="
                p-1

                text-xs
                font-semibold

                bg-gradient-to-br
                from-amber-500
                to-amber-600

                hover:from-amber-600
                hover:to-amber-500

                border-1
                border-amber-500

                rounded-sm
                cursor-pointer
            "
            {...props}
        >
            {children}
        </button>
    );
}