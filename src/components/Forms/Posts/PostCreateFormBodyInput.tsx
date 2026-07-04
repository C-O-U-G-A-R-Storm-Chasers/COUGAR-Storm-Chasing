"use client";

import { useEffect, useRef, useState } from "react";

export default function PostCreateFormBodyInput({ isEdited }: { isEdited: (value: boolean) => void }) {
    const [typing, setTyping] = useState<boolean>(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        isEdited(typing);
    }, [typing, isEdited]);

    useEffect(() => {
        adjustH();
    }, []);

    const adjustH = () => {
        const textarea = textareaRef.current;

        if (textarea) {
            textarea.style.height = "auto";
            textarea.style.height = `${textarea.scrollHeight}px`;
        }
    };

    return (
        <textarea
            ref={textareaRef}
            name="body"
            className={`
                w-full
                min-h-auto
                p-1
                px-3

                
                ${typing ? "bg-neutral-200" : "bg-neutral-300 hover:bg-neutral-200"}

                text-md
                text-neutral-950

                outline-none
                box-border
                overflow-hidden
                resize-none

                rounded-2xl
            `}
            rows={1}
            placeholder="Write a post..."
            onInput={adjustH}
            onClick={() => setTyping(true)}
            required
        />
    );
}