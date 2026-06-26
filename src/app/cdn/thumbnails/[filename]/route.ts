import mime from "mime";
import { NextRequest, NextResponse } from "next/server";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

export async function GET(req: NextRequest, { params }: { params: Promise<{ filename: string }> }) {
    const { filename } = await params;

    const rootLocation = process.env.NODE_ENV === "development" ? "F:/thumbnails" : "/data/thumbnails";
    const filePath = join(rootLocation, filename);

    if (process.env.NODE_ENV === "development") console.log("CDN FILE PATH:", filePath);

    if (!existsSync(filePath)) return new NextResponse("Not found", { status: 404 });

    const buffer = await readFileSync(filePath);

    return new NextResponse(
        buffer,
        {
            headers: {
                "Content-Type": mime.getType(filePath) ?? "application/octet-stream",
                "Cache-Control": "public, max-age=31536000, immutable",
            },
        }
    );
}