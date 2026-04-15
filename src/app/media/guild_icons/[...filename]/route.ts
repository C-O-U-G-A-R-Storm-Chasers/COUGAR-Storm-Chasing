import mime from "mime";
import { NextRequest, NextResponse } from "next/server";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

export async function GET(req: NextRequest, { params }: { params: Promise<{ filename: Array<string> }> }) {
    const { filename } = await params;

    try {
        const baseDir = process.env.NODE_ENV === "production" ?
            "/uploaded_files" :
            join(process.cwd(), "uploaded_files");
        const localPath = join(baseDir, "guild_icons", ...filename);

        // Ensure file exists
        if (!existsSync(localPath)) return NextResponse.json({ error: "Guild icon not found" }, { status: 404 });


        const buffer = readFileSync(localPath);
        const mimeType = mime.getType(localPath) || "application/octet-stream";

        return new NextResponse(buffer, {
            headers: {
                "Content-Type": mimeType,
                "Cache-Control": "public, max-age=31536000, immutable"
            }
        });
    } catch (error: any) { /* eslint-disable-line @typescript-eslint/no-explicit-any */
        return new NextResponse("Guild icon not found: " + error, { status: 404 });
    }
}