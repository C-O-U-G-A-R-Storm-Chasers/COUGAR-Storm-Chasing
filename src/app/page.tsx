import Col from "@/components/Col";

export default async function Home() {
    return (
        <Col>
            <Col
                id="home-page-video-overlay-wrapper"
                className="
                    w-full
                    h-100
                "
            >
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="
                        h-full
                        object-fill
                        pointer-events-none
                        select-none
                    "
                >
                    <source src="/assets/backgrounds/2026-04-14-main-page-background.mp4" type="video/mp4" />
                </video>
            </Col>
        </Col>
    );
}
