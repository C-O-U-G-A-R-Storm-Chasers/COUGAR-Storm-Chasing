"use client";

export default function InfoPageTitle({ textContent }: { textContent: string }) {
    return (
        <p
            className="
                text-2xl
                font-semibold
            "
        >
            {textContent}
        </p>
    );
}