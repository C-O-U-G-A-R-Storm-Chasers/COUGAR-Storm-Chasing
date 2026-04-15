import { ReactNode } from "react";

export default function FormUploadButton({ children, ...props }: { children: ReactNode }  & React.ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            type="button"
            className="
                p-2
                px-4

                bg-gradient-to-br
                from-pink-500
                to-pink-700
                hover:from-pink-600
                hover:to-pink-500

                border-1
                border-pink-50/20

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