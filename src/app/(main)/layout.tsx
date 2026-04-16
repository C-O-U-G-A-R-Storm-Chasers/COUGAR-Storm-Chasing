import config from "../../lib/cougar-config.json";
import { ReactNode } from "react";

export default async function MainLayout({ children }: { children: ReactNode }) {
    return (
        <div
            className="
                relative
                flex-1
                overflow-hidden
                text-white
            "
        >
            <video
                autoPlay
                muted
                loop
                playsInline
                className="
                    w-full
                    h-screen
                    object-cover
                    pointer-events-none
                    select-none
                "
            >
                <source src={config["homepage-background-video"]} type="video/mp4" />
            </video>

            <div className="absolute h-full z-10 inset-0">{children}</div>
        </div>
    );
}