import Col from "@/components/Col";
import { FaceFrownIcon } from "@heroicons/react/24/solid";

export default async function NotFound() {
    return (
        <Col className="w-full h-full justify-center items-center">
            <h1 className="text-3xl font-semibold">404: The requested page could not be found.</h1>

            <FaceFrownIcon className="w-8 h-8"/>
            
            <p className="text-lg">Are you sure you are in the right place?</p>
        </Col>
    );
}