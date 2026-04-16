"use client";

export default function InfoHeader({ textContent }: { textContent: string }) {
    return (
        <p
            className="
                text-xl
                font-bold
            "
        >
            {textContent}
        </p>
    );
}