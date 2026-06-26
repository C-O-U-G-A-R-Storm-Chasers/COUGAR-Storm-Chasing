import { UUID } from "crypto";
import { User } from "../Users/User";
import { SupportedImageExtension } from "@/_Types/SupportedImageExtension";
import { SupportedVideoExtension } from "@/_Types/SupportedVideoExtension";
import { Thumbnail } from "./Thumbnails/Thumbnail";

export interface FileRecord {
    id: UUID,
    uploader: User["uid"],
    ext: SupportedImageExtension | SupportedVideoExtension,
    thumb: Thumbnail
    uploadedAt: number
}