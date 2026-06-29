import { ThreatTypes } from "@/_Enums/Threats/ThreatTypes";
import { UUID } from "crypto";
//import { UploadedFile } from "../Files/UploadedFile";
import { DateString } from "@/_Types/DateString";

export interface Outlook {
    id: UUID,
    forDate: DateString,
    outlookDay: number,
    riskLevel: number,
    primaryThreat: ThreatTypes,
    secondaryThreat: ThreatTypes,
    discussion: string,
    //media: UploadedFile[],
    createdUnixTimestamp: number,
    createdTimestamp: string,
    validUntil: string
}