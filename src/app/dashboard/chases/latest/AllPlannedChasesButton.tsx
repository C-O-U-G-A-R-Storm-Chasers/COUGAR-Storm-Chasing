"use client";

import FormActionButton from "@/components/Buttons/FormActionButton";
import { useRouter } from "next/navigation";

export default function AllPlannedChasesButton() {
    const router = useRouter();
    
    return (
        <FormActionButton onClick={() => router.push("/chases")}>All Planned Chases</FormActionButton>
    );
}