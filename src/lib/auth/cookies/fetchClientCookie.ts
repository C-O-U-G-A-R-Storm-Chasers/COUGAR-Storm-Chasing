"use client";

import Cookies from "js-cookie";

export function fetchClientCookie(name: string) {
    const dataRaw = Cookies.get(name);

    if (!dataRaw) return null;

    return JSON.parse(dataRaw);
}