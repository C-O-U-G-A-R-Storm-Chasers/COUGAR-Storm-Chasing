import { UUID } from "crypto";
import { Chaser } from "./Chaser";

type Digit = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';

export interface PlannedChase {
    id: UUID,
    title: string,
    description: string,
    chasers: Chaser["id"][],
    start_date: `${Digit}${Digit}${Digit}${Digit}-${Digit}${Digit}-${Digit}${Digit}`,
    end_date: `${Digit}${Digit}${Digit}${Digit}-${Digit}${Digit}-${Digit}${Digit}`,
    created_timestamp: number,
    updated_timestamp: number
}