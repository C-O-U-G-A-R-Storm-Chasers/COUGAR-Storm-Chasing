import mime from "mime";
import { NextRequest, NextResponse } from "next/server";
import { createReadStream, existsSync, statSync } from "node:fs";
import { join, normalize, resolve } from "node:path";

export async function GET(req: NextRequest, { params }: { params: Promise<{ filename: Array<string> }> }) {
    const { filename } = await params;

    try {
        const baseDir = "/uploads";
        const unsafePath = join(baseDir, "media", ...filename);
        const safePath = normalize(unsafePath);
        const resolvedBase = resolve(baseDir);
        const resolvedPath = resolve(safePath);

        if (!resolvedPath.startsWith(resolvedBase)) return new NextResponse("Forbidden", { status: 403 });

        if (!existsSync(safePath)) return new NextResponse("Not Found", { status: 404 });

        const mimeType = mime.getType(safePath) || "";

        if (!mimeType.startsWith("image/") && !mimeType.startsWith("video/")) return new NextResponse("Unsupported media type", { status: 415 });

        // Range support for videos
        const range = req.headers.get("range");
        const stat = statSync(resolvedPath);
        const fileSize = stat.size;

        if (!range) {
            const stream = createReadStream(resolvedPath);

            return new NextResponse(stream as any, { /* eslint-disable-line @typescript-eslint/no-explicit-any */
                headers: {
                    "Content-Type": mimeType,
                    "Content-Length": String(fileSize),
                    "Accept-Ranges": "bytes",
                    "Cache-Control": "public, max-age=31536000, immutable",
                },
            });
        }

        const match = /bytes=(\d+)-(\d*)/.exec(range);

        if (!match) return new NextResponse("Invalid Range", { status: 416 });

        const start = parseInt(match[1], 10);
        const end = match[2] ? parseInt(match[2], 10) : fileSize - 1;
        const chunkSize = end - start + 1;
        const stream = createReadStream(resolvedPath, { start, end });

        return new NextResponse(stream as any, { /* eslint-disable-line @typescript-eslint/no-explicit-any */
            status: 206,
            headers: {
                "Content-Range": `bytes ${start}-${end}/${fileSize}`,
                "Accept-Ranges": "bytes",
                "Content-Length": String(chunkSize),
                "Content-Type": mimeType,
                "Cache-Control": "public, max-age=31536000, immutable",
            },
        });
    } catch (error: any) { /* eslint-disable-line @typescript-eslint/no-explicit-any */
        return new NextResponse("Image not found: " + error, { status: 404 });
    }
}