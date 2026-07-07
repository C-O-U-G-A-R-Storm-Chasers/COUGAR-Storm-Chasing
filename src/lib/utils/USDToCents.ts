export function USDToCents(USDString: string) {
    const cleaned = USDString.replace(/[^\d.]/g, "");

    const cents = Math.round(parseFloat(cleaned) * 100);

    return cents;
}