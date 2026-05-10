import { readdirSync, statSync } from "node:fs";
import { join } from "node:path";

export function findFileRecursive(dir: string, target: string): string | null {
    const entries = readdirSync(dir);

    for (const entry of entries) {
        const fullPath = join(dir, entry);
        const stat = statSync(fullPath);

        if (stat.isDirectory()) {
            const found = findFileRecursive(fullPath, target);

            if (found) return found;
        } else if (entry === target) return fullPath;
    }

    return null;
}