import { User } from "@/_Interfaces/Users/User";
import { DateString } from "@/_Types/DateString";
import { UUID } from "crypto";
import { FileRecord } from "../Files/FileRecord";

export interface TeamCollection {
    id: UUID,
    uploader: User["uid"],
    uploadedAt: number,
    captureDate: DateString,
    title: string,
    description: string,
    files: FileRecord["id"][],
}

export interface TeamCollectionWithFullRecords extends Omit<TeamCollection, "files"> {
    files: FileRecord[],
}