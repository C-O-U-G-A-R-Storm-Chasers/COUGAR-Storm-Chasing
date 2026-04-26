import { UUID } from "crypto";
import { Chaser } from "./Chaser";
import { DateString } from "@/_Types/DateString";

export interface PlannedChase {
    id: UUID,
    title: string,
    description: string,
    chasers: Chaser["id"][],
    start_date: DateString,
    end_date: DateString,
    created_timestamp: number,
    updated_timestamp: number
}