"use client";

export default function InfoPageTitle({ textContent }: { textContent: string }) {
    return (
        <p
            className="
                text-md
                md:text-xl
                font-semibold
            "
        >
            {textContent}
        </p>
    );
}