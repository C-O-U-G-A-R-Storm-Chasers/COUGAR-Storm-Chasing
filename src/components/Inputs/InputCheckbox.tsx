"use client";

export default function InputCheckbox({ ...props }: & React.InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input
            className="
                p-1

                outline-none
                border-1
                border-slate-50/20
                focus:border-slate-50

                text-md
                rounded-sm
            "
            type="checkbox"
            {...props}
        />
    );
}