import config from "../../lib/cougar-config.json";
import { ReactNode } from "react";

export default async function MainLayout({ children }: { children: ReactNode }) {
    return (
        <div
            className="
                relative
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
                    h-full
                    flex-1
                    object-cover
                    pointer-events-none
                    select-none
                "
            >
                <source src={config["homepage-background-video"]} type="video/mp4" />
            </video>

            {children}
        </div>
    );
}