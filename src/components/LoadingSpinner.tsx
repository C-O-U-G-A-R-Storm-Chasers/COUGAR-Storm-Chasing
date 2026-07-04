import Row from "./Row";

export default function LoadingSpinner({ loadingText, size = 12, thickness = 2, className = "" }: { loadingText?: string, size?: number, thickness?: number, className?: string }) {
    if (loadingText) return (
        <Row className="justify-center items-center w-full gap-2">
            {loadingText && <p className="">{loadingText}</p>}
            
            <div
                className={`animate-spin rounded-full border-neutral-500 border-t-white ${className}`}
                style={{
                    width: size,
                    height: size,
                    borderWidth: thickness
                }}
            />
        </Row>
    );

    return (
        <Row className="justify-center items-center">
            <div
                className={`animate-spin rounded-full border-neutral-500 border-t-white ${className}`}
                style={{
                    width: size,
                    height: size,
                    borderWidth: thickness
                }}
            />
        </Row>
    );
}