import { stringSearch } from "./stringSearch";

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export function searchThroughObjects<T extends Record<string, any>>(items: T[], query: string): T[] {
    const filter = query.split(":")[0];

    // Query filter matches an object property
    const properties = Object.entries(items[0]).map(obj => obj[0]);
    const propertiesMatchingFilter = stringSearch(properties, filter);

    const matchedItems = items.map((item, i) => {
        const matchedItem = Object.entries(item).map(([key, value]) => {
            if (
                propertiesMatchingFilter.includes(key) &&
                (typeof value === "string" || typeof value === "number")
            ) return value;
        });

        if (matchedItem) return items[i];
    }).filter(matchedItem => matchedItem !== undefined);

    return matchedItems;
}