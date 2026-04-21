"use client";

import Col from "@/components/Col";
import InputText from "@/components/Inputs/InputText";
import Image from "next/image";

export default function ImagePreview({ webPath }: { webPath: string }) {
    return (
        <Col
            className="
                w-full
                items-center

                gap-2
            "
        >
            <Image
                src={webPath}
                alt="Preview Image"
                width={512}
                height={512}
                className="w-2/3 bg-slate-200 rounded-md"
            />

            <Col className="w-2/3">
                <label htmlFor="title" className="text-xs font-semibold">Video Title</label>
                <InputText name="title" id="title" required />
            </Col>

            <Col className="w-2/3">
                <label htmlFor="capture-date" className="text-xs font-semibold">Video Capture Date (YYYY-MM-DD)</label>
                <InputText name="capture-date" id="capture-date" required />
            </Col>
        </Col>
    );
}