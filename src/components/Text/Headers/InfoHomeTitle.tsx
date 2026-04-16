"use client";

export default function InfoHomeTitle({ textContent }: { textContent: string }) {
    return (
        <p
            className="
                text-8xl
                font-semibold
            "
        >
            {textContent}
        </p>
    );
}