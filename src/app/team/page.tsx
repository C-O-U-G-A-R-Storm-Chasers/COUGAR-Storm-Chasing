"use server";

import Col from "@/components/Col";
import InfoParagraph from "@/components/InfoParagraph";

export default async function TeamPage() {
    return (
        <Col className="w-full items-center gap-5">
            <h1 className="text-xl font-semibold">Meet Our Team Members</h1>

            <InfoParagraph textContent="" />
        </Col>
    );
}