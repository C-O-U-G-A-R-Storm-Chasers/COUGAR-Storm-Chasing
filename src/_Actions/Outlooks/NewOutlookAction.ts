"use server";

import { BasicResult } from "@/_Interfaces/BasicResult";
import { safeUUID } from "@/lib/crypto/crypto";
import { UUID } from "crypto";
import { redirect } from "next/navigation";

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export async function NewOutlookAction(prevState: any, data: FormData): Promise<BasicResult> {
    const id = safeUUID() as UUID;
    const outlookDay = parseInt(data.get("outlook-day") as string);
    const riskLevel = parseInt(data.get("risk-level") as string);
    const primaryThreat = data.get("primary-threat") as string;
    const secondaryThreat = data.get("secondary-threat") as string;
    const discussion = data.get("discussion") as string;
    const mediaRaw = data.get("attached-media") as string | null;

    /*let media: UploadedFile[] = [];

    if (typeof mediaRaw === "string") media = JSON.parse(mediaRaw);

    const now = new Date();

    const outlook: Outlook = {
        id: id,
        forDate: getOutlookDate(outlookDay),
        outlookDay,
        riskLevel,
        primaryThreat: ThreatTypes[primaryThreat as keyof typeof ThreatTypes],
        secondaryThreat: ThreatTypes[secondaryThreat as keyof typeof ThreatTypes],
        discussion,
        media,
        createdUnixTimestamp: Date.now(),
        createdTimestamp: now.toISOString(),
        validUntil: new Date(now.getTime() + 6 * 60 * 60 * 1000).toISOString()
    };
    
    const insertOutlookResult = await insertOutlook(outlook);

    if (!insertOutlookResult.acknowledged || !insertOutlookResult.insertedId) return {
        success: false,
        msg: "A technical error occurred. Error Code: Insert-1"
    };*/

    redirect(`/outlooks/day/${outlookDay}`);
}