import Col from "@/components/Col";
import Image from "next/image";
import config from "../../lib/cougar-config.json";
import { signinValidation } from "@/lib/auth/SigninValidation/signinValidation";
import ErrorMessage from "@/components/Messages/ErrorMessage";
import { updateWebVisits } from "@/lib/utils/statistics/updateWebStats";

export default async function Home() {
    const { success, msg } = await signinValidation();
        
    if (!success) return <ErrorMessage description={msg} />;

    await updateWebVisits();

    return (
        <Col
            id="home-page-wrapper"
            className="
                justify-between
                w-full
                h-full
                p-2
                gap-2
            "
        >
            <Col className="items-center text-center">
                <p className="text-2xl md:text-4xl lg:text-6xl font-bold">C.O.U.G.A.R. Storm Chasers</p>
                <p className="text-xs md:text-2xl lg:text-3xl font-semibold">Cyclone Observation Unit for General Atmospheric Research</p>
                <p className="text-xs md:text-xl lg:text-2xl font-bold">Est. July 2024</p>
            </Col>

            <Col className="justify-center items-center w-full">
                <Image
                    src={config["homepage-overlay-banner"]}
                    alt="Banner for COUGAR Storm Chasing"
                    width={2967}
                    height={1413}
                    className="
                        w-full
                        md:w-2/3
                        lg:w-1/2
                        rounded-md
                    "
                />
            </Col>
        </Col>
    );
}