import { User } from "@/_Interfaces/Users/User";
import { DateString } from "@/_Types/DateString";
import { UUID } from "crypto";
import { CollectionFile } from "../Files/Collections/CollectionFile";

export interface TeamCollection {
    id: UUID,
    uploader: User["uid"],
    uploadedAt: number,
    captureDate: DateString,
    title: string,
    description: string,
    files: CollectionFile["id"][],
}

export interface TeamCollectionWithFullRecords extends Omit<TeamCollection, "files"> {
    files: CollectionFile[],
}