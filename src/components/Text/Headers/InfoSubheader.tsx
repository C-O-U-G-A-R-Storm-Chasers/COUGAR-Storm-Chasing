"use client";

export default function InfoSubheader({ textContent }: { textContent: string }) {
    return (
        <p
            className="
                text-lg
                font-semibold
            "
        >
            {textContent}
        </p>
    );
}