export function unixToUTC(unixTime: number) {
    const date = new Date(unixTime);

    return date.toISOString();
}