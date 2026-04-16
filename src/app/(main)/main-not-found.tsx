import Col from "@/components/Col";
import InfoHomeTitle from "@/components/Text/Headers/InfoHomeTitle";
import InfoPageTitle from "@/components/Text/Headers/InfoPageTitle";
import { FaceFrownIcon } from "@heroicons/react/24/solid";

export default async function MainNotFound() {
    return (
        <Col
            id="not-found-error-wrapper"
            className="
                absolute
                justify-center
                items-center
                left-0
                top-0
                w-full
                h-full

                text-center

                gap-5
            "
        >
            <FaceFrownIcon className="w-15 h-15"/>
            <InfoHomeTitle textContent="The requested page could not be found." />
            <InfoPageTitle textContent="Are you sure you are in the right place?" />
        </Col>
    );
}