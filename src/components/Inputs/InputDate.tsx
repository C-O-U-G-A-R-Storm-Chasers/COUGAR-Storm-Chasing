"use client";

export default function InputDate({ ...props }: & React.InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input
            className="
                w-full
                p-1

                outline-none
                border-1
                border-slate-50/20
                focus:border-slate-50

                bg-neutral-100
                text-neutral-950

                text-md
                rounded-sm
            "
            type="date"
            {...props}
        />
    );
}