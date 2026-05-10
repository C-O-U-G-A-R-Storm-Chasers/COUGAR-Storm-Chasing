import { DateString } from "@/_Types/DateString";

export function getOutlookDate(outlookDay: number): DateString {
    const today = new Date();

    // Normalize to midnight
    today.setHours(0, 0, 0, 0);

    const offsetDays = outlookDay - 1;
    const target = new Date(today);

    target.setDate(today.getDate() + offsetDays);

    return target.toISOString().split("T")[0] as DateString;
}