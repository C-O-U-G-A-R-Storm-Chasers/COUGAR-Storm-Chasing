import ffmpegPath from "ffmpeg-static";
import { spawn } from "child_process";

export function autoThumbnail(inputPath: string, outputPath: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        const ffmpeg = spawn(ffmpegPath!, [
            "-i",
            inputPath,

            // Grab frame
            "-ss",
            "00:00:02", // 2 seconds

            // Frame output
            "-frames:v",
            "1",

            "-vf",
            "scale=640:-1",

            outputPath,
        ]);

        ffmpeg.on("close", (code) => {
            if (code === 0) resolve();
            else reject(new Error(`FFmpeg exited with code ${code}`));
        });
    });
}