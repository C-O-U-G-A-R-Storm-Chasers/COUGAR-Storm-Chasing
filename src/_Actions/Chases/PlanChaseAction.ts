"use server";

import { BasicResult } from "@/_Interfaces/BasicResult";
import { Chaser } from "@/_Interfaces/Chasers/Chaser";
import { PlannedChase } from "@/_Interfaces/Chasers/PlannedChase";
import { safeUUID } from "@/lib/crypto/crypto";
import { insertPlannedChase } from "@/lib/database/chases/insertPlannedChase";
import { UUID } from "crypto";
import { redirect } from "next/navigation";

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export async function PlanChaseAction(prevState: any, data: FormData): Promise<BasicResult> {
    const id = safeUUID();
    const title = data.get("title") as UUID;
    const description = data.get("description") as string;
    const chasers = data.getAll("chasers") as Chaser["id"][];
    const startDate = data.get("start-date") as string;
    const endDate = data.get("end-date") as string;
    const createdTimestamp = Date.now();
    const updatedTimestamp = Date.now();

    const plannedChase: PlannedChase = {
        id: id as UUID,
        title,
        description,
        chasers,
        start_date: startDate as PlannedChase["start_date"],
        end_date: endDate as PlannedChase["end_date"],
        created_timestamp: createdTimestamp,
        updated_timestamp: updatedTimestamp
    };
    
    const insertPlannedChaseResult = await insertPlannedChase(plannedChase);

    if (!insertPlannedChaseResult) return {
        success: false,
        msg: "A technical error occurred. Error Code: Insert-1"
    };

    redirect("/chases/latest");
}