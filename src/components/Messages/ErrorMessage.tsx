import Col from "../Col";

export default function ErrorMessage({ title, description }: { title?: string, description: string }) {
    return (
        <Col
            className="
                w-full
                p-2
                bg-red-400
                border-1
                border-red-300
                rounded-xs
            "
        >
            <p className="text-xl text-white">{title}</p>
            <p className="text-sm text-white">{description}</p>
        </Col>
    );
}