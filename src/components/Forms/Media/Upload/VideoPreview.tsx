"use client";

import Col from "@/components/Col";
import InputText from "@/components/Inputs/InputText";

export default function VideoPreview({ webPath }: { webPath: string }) {
    return (
        <Col
            className="
                w-full
                items-center
                p-2

                bg-teal-700

                rounded-md
                gap-2
            "
        >
            <video
                autoPlay={false}
                controls
                className="w-2/3 bg-slate-200 rounded-md"
            >
                <source src={webPath} />
            </video>
            
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