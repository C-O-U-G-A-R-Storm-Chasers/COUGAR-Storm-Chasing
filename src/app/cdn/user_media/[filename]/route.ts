import getRootPath from "@/lib/utils/getRootPath";
import mime from "mime";
import { NextRequest, NextResponse } from "next/server";
import { createReadStream, existsSync, statSync } from "node:fs";
import { join } from "node:path";

export async function GET(req: NextRequest, { params }: { params: Promise<{ filename: string }> }) {
    const { filename } = await params;

    const rootPath = getRootPath();
    const filePath = join(rootPath, "user_media", filename);

    if (!existsSync(filePath)) {
        return new NextResponse("Not found", { status: 404 });
    }

    const stat = statSync(filePath);
    const fileSize = stat.size;
    const contentType =
        mime.getType(filePath) ?? "application/octet-stream";

    const range = req.headers.get("range");

    if (range) {
        const parts = range.replace(/bytes=/, "").split("-");
        const start = parseInt(parts[0], 10);
        const end = parts[1]
            ? parseInt(parts[1], 10)
            : fileSize - 1;

        const chunkSize = end - start + 1;

        const stream = createReadStream(filePath, {
            start,
            end,
        });

        return new NextResponse(stream as any, { /* eslint-disable-line @typescript-eslint/no-explicit-any */
            status: 206,
            headers: {
                "Content-Type": contentType,
                "Accept-Ranges": "bytes",
                "Content-Length": chunkSize.toString(),
                "Content-Range": `bytes ${start}-${end}/${fileSize}`,
                "Cache-Control":
                    "public, max-age=31536000, immutable",
            },
        });
    }

    const stream = createReadStream(filePath);

    return new NextResponse(stream as any, { /* eslint-disable-line @typescript-eslint/no-explicit-any */
        headers: {
            "Content-Type": contentType,
            "Content-Length": fileSize.toString(),
            "Accept-Ranges": "bytes",
            "Cache-Control":
                "public, max-age=31536000, immutable",
        },
    });
}