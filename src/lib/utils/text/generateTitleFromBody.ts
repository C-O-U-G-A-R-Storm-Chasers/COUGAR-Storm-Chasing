export function generateTitleFromBody(body: string): string {
    const hasLineBreak = body.includes("\n");

    if (!hasLineBreak) return body;

    const firstPara = body.split("\n")[0].trim();

    const periodIndex = firstPara.indexOf(".");

    return periodIndex === -1 ? firstPara : firstPara.slice(0, periodIndex + 1);
}