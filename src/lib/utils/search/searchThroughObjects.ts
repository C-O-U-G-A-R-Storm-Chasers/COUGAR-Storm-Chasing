import { stringSearch } from "./stringSearch";

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export function searchThroughObjects<T extends Record<string, any>>(items: T[], query: string): T[] {
    const trimmed = query.trim();

    // Syntax example: "created:2026"
    const hasFilter = trimmed.includes(":");

    if (hasFilter) {
        const [rawFilter, rawValue] = trimmed.split(":");
        const filter = rawFilter.trim();
        const valueQuery = rawValue.trim();

        return items.filter(item => {
            return Object.entries(item).some(([key, value]) => {
                if (typeof value !== "string" && typeof value !== "number") return false;

                // Property fuzzy matching
                const keyMatches = stringSearch([key], filter).length > 0;

                if (!keyMatches) return false;

                // Value fuzzy matching
                const valueMatches = stringSearch([String(value)], valueQuery).length > 0;

                return valueMatches;
            });
        });
    }

    // Generic search mode
    return items.filter(item => {
        return Object.values(item).some(value => {
            if (typeof value !== "string" && typeof value !== "number") return false;

            return stringSearch([String(value)], trimmed).length > 0;
        });
    });
}