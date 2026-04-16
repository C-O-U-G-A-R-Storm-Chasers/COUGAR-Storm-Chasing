import Col from "@/components/Col";
import InfoHomeTitle from "@/components/Text/Headers/InfoHomeTitle";
import InfoPageTitle from "@/components/Text/Headers/InfoPageTitle";
import { FaceFrownIcon } from "@heroicons/react/24/solid";
import config from "../lib/cougar-config.json";

export default async function NotFound() {
    return (
        <div
            id="home-page-video-overlay-wrapper"
            className="
                relative
                overflow-hidden
                text-white
                text-center
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

            <Col className="absolute items-center left-0 top-0 w-full h-full pt-8 pb-12 gap-8">
                <Col className="items-center">
                    <FaceFrownIcon className="w-15 h-15"/>
                    <InfoHomeTitle textContent="404" />
                    <InfoHomeTitle textContent="The requested page could not be found." />
                </Col>

                <Col className="items-center">
                    <InfoPageTitle textContent="Are you sure you are in the right place?" />
                </Col>
            </Col>
        </div>
    );
}