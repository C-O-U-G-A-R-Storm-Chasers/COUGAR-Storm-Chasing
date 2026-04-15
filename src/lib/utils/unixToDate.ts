export function unixToDate(unixMilliseconds: number) {
    const dtf = new Intl.DateTimeFormat("en-US", {
        timeZone: "America/Chicago",
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
    });

    const parts = dtf.formatToParts(new Date(unixMilliseconds));
    const get = (t: Intl.DateTimeFormatPartTypes) => parts.find(p => p.type === t)?.value ?? "";

    const mm = get("month");
    const dd = get("day");
    const yyyy = get("year");
    const hh = get("hour");
    const min = get("minute");
    const ampm = (get("dayPeriod") || "").toLowerCase();

    return `${mm}/${dd}/${yyyy} ${hh}:${min} ${ampm}`;
}