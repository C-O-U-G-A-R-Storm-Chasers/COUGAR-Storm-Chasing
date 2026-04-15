"use server";

import { cookies } from "next/headers";

export async function fetchServerCookie(name: string) {
    const cookiesStore = await cookies();
    const dataRaw = cookiesStore.get(name);

    if (!dataRaw || !dataRaw.value) return null;

    return JSON.parse(dataRaw.value);
}