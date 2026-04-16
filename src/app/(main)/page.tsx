import Col from "@/components/Col";
import InfoHomeTitle from "@/components/Text/Headers/InfoHomeTitle";
import InfoPageTitle from "@/components/Text/Headers/InfoPageTitle";
import InfoSubheader from "@/components/Text/Headers/InfoSubheader";
import Image from "next/image";
import config from "../../lib/cougar-config.json";

export default async function Home() {
    return (
        <Col
            id="home-page-wrapper"
            className="
                justify-between
                w-full
                h-full
                pt-8
                pb-12
            "
        >
            <Col className="items-center">
                <InfoHomeTitle textContent="C.O.U.G.A.R. Storm Chasers" />
                <InfoPageTitle textContent="Cyclone Observation Unit for General Atmospheric Research" />
                <InfoSubheader textContent="Est. July 2024" />
            </Col>

            <Col className="items-center">
                <Image
                    src={config["homepage-overlay-banner"]}
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
    );
}