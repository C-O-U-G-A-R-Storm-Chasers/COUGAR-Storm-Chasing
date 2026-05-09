"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { usePathname, useRouter } from "next/navigation";
import { FormEvent } from "react";

export default function ListTableSearchRow({ searchTerm }: { searchTerm: string }) {
    const router = useRouter();
    const pathName = usePathname();

    const submit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const data = new FormData(e.currentTarget);
        const query = data.get("query") as string;

        if (
            !query ||
            (query.trim().length === 0)
        ) {
            router.push(`${pathName}`);

            return;
        }

        router.push(`${pathName}?q=${query}`);
    };

    return (
        <form
            onSubmit={submit}
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
                name="query"
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