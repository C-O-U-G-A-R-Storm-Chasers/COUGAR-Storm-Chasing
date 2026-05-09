"use client";

import FormActionButton from "@/components/Buttons/FormActionButton";
import { useRouter } from "next/navigation";

export default function LatestPlannedChaseButton() {
    const router = useRouter();
    
    return (
        <FormActionButton onClick={() => router.push("/chases/latest")}>Latest</FormActionButton>
    );
}