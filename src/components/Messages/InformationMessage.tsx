import Col from "../Col";

export default function InformationMessage({ title, description }: { title?: string, description: string }) {
    return (
        <Col
            className="
                w-full
                p-2
                bg-cyan-400/30
                border-1
                border-cyan-400
                rounded-xs
            "
        >
            <p className="text-xl text-white">{title}</p>
            <p className="text-sm text-white">{description}</p>
        </Col>
    );
}