"use client";

export default function InfoBulletStandard({ textContent }: { textContent: string }) {
    return (
        <p
            className="
                text-sm
                font-semibold
                before:content-['•']
                before:pr-1
            "
        >
            {textContent}
        </p>
    );
}