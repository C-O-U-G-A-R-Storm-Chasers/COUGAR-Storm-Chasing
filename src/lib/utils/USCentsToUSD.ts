export function USCentsToUSD(centsUSD: number) {
    return `$${(centsUSD || 0) / 100}`
}