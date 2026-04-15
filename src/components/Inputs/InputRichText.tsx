"use client";

import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Underline from "@tiptap/extension-underline" // Import Underline
import React, { ReactNode, useEffect, useRef } from "react"
import Image from "next/image";
import Row from "@/components/Row";
import Col from "@/components/Col";
import { EditorNode } from "@/_Interfaces/Editor/EditorNode";

const FormatButton = ({ onClick, isActive, image }: { onClick: () => void, isActive: boolean, image: string }) => (
    <Image
        alt="Rich text format button"
        onClick={onClick}
        src={image}
        width={512}
        height={512}
        className={`
            flex
            flex-row
            items-center
            w-12
            h-12

            bg-gradient-to-br

            text-sm
            font-semibold
            cursor-pointer
            gap-2

            ${
                isActive ?
                "from-stone-500 to-stone-300" :
                "from-stone-300 to-stone-500 hover:from-stone-300 hover:to-stone-200"
            }
        `}
    />
);

export default function InputRichText({ label, onUpdate }: { label: ReactNode, onUpdate: (data: EditorNode) => void }) {
    const onUpdateRef = useRef(onUpdate);

    useEffect(() => {
        onUpdateRef.current = onUpdate;
    }, [onUpdate]);

    const editor = useEditor({
        immediatelyRender: false,
        extensions: [
            StarterKit,
            Underline,
        ],
        content: "",
        editorProps: {
            attributes: {
                class: "max-w-none min-h-[175px] p-2 border bg-white text-lg text-black focus:outline-none rounded-md prose [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5",
            },
        },
        onUpdate: ({ editor }) => {
            const json = editor.getJSON(); 
            
            onUpdateRef.current(json as EditorNode);
        },
    });

    if (!editor) return null;

    return (
        <Col className="w-full p-1.5 border-1 border-slate-50/20 rounded-sm gap-2">

            <div className="text-md">{label}</div>

            <Col className="p-1.5 flex-wrap bg-slate-600 rounded-sm">
                <Row>
                    <FormatButton 
                        onClick={() => editor.chain().focus().toggleBold().run()} 
                        isActive={editor.isActive("bold")} 
                        image="/assets/rich-text/bold.png" 
                    />
                    <FormatButton 
                        onClick={() => editor.chain().focus().toggleItalic().run()} 
                        isActive={editor.isActive("italic")} 
                        image="/assets/rich-text/italic.png"
                    />
                    <FormatButton 
                        onClick={() => editor.chain().focus().toggleUnderline().run()} 
                        isActive={editor.isActive("underline")} 
                        image="/assets/rich-text/underline.png"
                    />
                    <FormatButton 
                        onClick={() => editor.chain().focus().toggleBulletList().run()} 
                        isActive={editor.isActive("bulletList")} 
                        image="/assets/rich-text/list.png"
                    />
                </Row>
            </Col>

            <Col
                className="
                    w-full
                    min-h-[100px]
                    p-1

                    outline-none
                    border-1
                    border-slate-50/20
                    focus:border-slate-50

                    text-md
                    rounded-sm
                "
            >
                <EditorContent editor={editor} />
            </Col>

        </Col>
    );
}