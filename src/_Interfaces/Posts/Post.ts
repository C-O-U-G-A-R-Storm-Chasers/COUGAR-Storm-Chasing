import { User } from "@/_Interfaces/Users/User";
import { UUID } from "crypto";
import { MediaFile } from "../Files/MediaFile";

export interface Post {
    id: UUID,
    uploader: User["uid"],
    uploadedAt: number,
    body: string,
    files: MediaFile["id"][] | MediaFile[],
}