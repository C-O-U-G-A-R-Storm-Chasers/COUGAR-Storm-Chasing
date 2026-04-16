import Col from "@/components/Col";
import InfoHomeTitle from "@/components/Text/Headers/InfoHomeTitle";
import InfoPageTitle from "@/components/Text/Headers/InfoPageTitle";
import InfoSubheader from "@/components/Text/Headers/InfoSubheader";
import Image from "next/image";

export default async function Home() {
    return (
        <div
            id="home-page-video-overlay-wrapper"
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
                <source src="/assets/backgrounds/2026-04-14-main-page-background.mp4" type="video/mp4" />
            </video>

            <Col className="absolute justify-between items-center left-0 top-0 w-full h-full pt-8 pb-12">
                <Col className="items-center">
                    <InfoHomeTitle textContent="C.O.U.G.A.R. Storm Chasers" />
                    <InfoPageTitle textContent="Cyclone Observation Unit for General Atmospheric Research" />
                    <InfoSubheader textContent="Est. July 2024" />
                </Col>

                <Col className="items-center">
                    <Image
                        src="/assets/banner.jpg"
                        alt="Banner for COUGAR Storm Chasing"
                        width={2967}
                        height={1413}
                        className="
                            w-3/8
                            rounded-md
                        "
                    />
                </Col>
            </Col>
        </div>
    );
}


//id="home-page-video-overlay-wrapper"