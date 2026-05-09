"use server";

import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

export default async function ListTableSearchRow({ name, id, searchTerm, action }: { name: string, id: string, searchTerm: string, action: (data: FormData) => void }) {
    return (
        <form
            action={action}
            className="
                flex
                flex-row
                items-center
                w-full
                p-2

                bg-slate-50
                rounded-t-sm

                gap-2
            "
        >
            <MagnifyingGlassIcon className="w-5 h-5" />

            <input
                type="text"
                name={name}
                id={id}
                placeholder={`Search ${searchTerm}...`}
                minLength={1}
                className="
                    w-full
                    p-1

                    text-sm

                    focus:outline-2
                    focus:outline-sky-500/25

                    rounded-xs
                "
            />
        </form>
    );
}