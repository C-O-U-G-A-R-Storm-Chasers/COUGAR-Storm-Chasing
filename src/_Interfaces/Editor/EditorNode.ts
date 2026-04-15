export interface EditorNode {
    type: NodeTypes;
    content?: EditorNode[]; // Recursive content
    text?: string; // Only for text nodes
    marks?: Array<EditorMark>; // Formatting
}

type NodeTypes = "doc" | "paragraph" | "text" | "bulletList" | "listItem" | "variable";

interface EditorMark {
    type: "bold" | "italic" | "underline";
}