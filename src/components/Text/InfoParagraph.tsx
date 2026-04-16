"use client";

export default function InfoParagraph({ textContent }: { textContent: string }) {
    return (
        <p
            className="
                text-md
            "
        >
            {textContent}
        </p>
    );
}