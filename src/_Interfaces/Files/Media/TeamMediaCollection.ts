import { User } from "@/_Interfaces/Users/User";
import { DateString } from "@/_Types/DateString";
import { UUID } from "crypto";
import { FileRecord } from "../FileRecord";

export interface TeamMediaCollection {
    id: UUID,
    uploader: User["uid"],
    uploadedAt: number,
    captureDate: DateString,
    title: string,
    description: string,
    files: FileRecord["id"][],
}

export interface TeamMediaCollectionWithFullRecords extends Omit<TeamMediaCollection, "files"> {
    files: FileRecord[],
}