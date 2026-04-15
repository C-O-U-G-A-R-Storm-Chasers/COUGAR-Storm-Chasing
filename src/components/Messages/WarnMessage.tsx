import Col from "../Col";

export default function WarnMessage({ title, description }: { title?: string, description: string }) {
    return (
        <Col
            className="
                w-full
                p-2
                bg-amber-400/30
                border-1
                border-amber-400
                rounded-xs
            "
        >
            <p className="text-xl text-white">{title}</p>
            <p className="text-sm text-white">{description}</p>
        </Col>
    );
}