"use server";

import { spawn } from "child_process";
import { existsSync } from "fs";
import { mkdir } from "fs/promises";
import { join } from "path";

export async function autoThumbnail(inputPathWithoutFile: string, inputFileNameWithExt: string, outputPathWithoutFile: string, outputFileNameWithExt: string): Promise<void> {
    const fullInputPathWithoutFile = join(inputPathWithoutFile);
    const fullOutputPathWithoutFile = join(outputPathWithoutFile);
    const fullInputPath = join(fullInputPathWithoutFile, inputFileNameWithExt);
    const fullOutputPath = join(fullOutputPathWithoutFile, outputFileNameWithExt);

    const debug = {
        fullInputPathWithoutFile,
        fullOutputPathWithoutFile,
        fullInputPath,
        fullOutputPath,
        fullInputPathWithoutFile_Exists: existsSync(fullInputPathWithoutFile),
        fullInputPath_Exists: existsSync(fullInputPath),
        fullOutputPathWithoutFile_Exists: existsSync(fullOutputPathWithoutFile),
    };

    if (!debug.fullOutputPathWithoutFile_Exists) await mkdir(fullOutputPathWithoutFile, { recursive: true });

    if (process.env.NODE_ENV === "production") console.log(debug);

    return new Promise<void>((resolve, reject) => {
        const ffmpeg = spawn("ffmpeg"!, [
            // Grab frame
            "-ss",
            "00:00:02", // 2 seconds

            "-i",
            fullInputPath,

            // Frame output
            "-frames:v",
            "1",

            "-vf",
            "scale=640:-1",

            "-update",
            "1",

            fullOutputPath,
        ]);

        ffmpeg.stdout.on("data", (data) => {
            if (process.env.NODE_ENV === "production") console.log("FFMPEG:", data.toString());
        });

        ffmpeg.stderr.on("data", (data) => {
            if (process.env.NODE_ENV === "production") console.error("FFMPEG ERROR:", data.toString());
        });

        ffmpeg.on("error", (err) => {
            if (process.env.NODE_ENV === "production") console.error("SPAWN ERROR:", err);
        });

        ffmpeg.on("close", (code) => {
            if (process.env.NODE_ENV === "production")  console.log("FFMPEG RETURN CODE:", code);

            if (code === 0) resolve();
            else reject(new Error(`FFmpeg exited with code ${code}`));
        });
    });
}