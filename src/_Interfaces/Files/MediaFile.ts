import { UUID } from "crypto";
import { User } from "../Users/User";
import { SupportedImageExtension } from "@/_Types/SupportedImageExtension";
import { SupportedVideoExtension } from "@/_Types/SupportedVideoExtension";

export interface MediaFile {
    id: UUID,
    uploader: User["uid"],
    uploadedAt: number,
    ext: SupportedImageExtension | SupportedVideoExtension,
    thumb?: ImageFile["id"] | ImageFile
}

export interface ImageFile extends Omit<MediaFile, "ext" | "thumb"> {
    ext: SupportedImageExtension
}

export interface VideoFile extends Omit<MediaFile, "ext"> {
    ext: SupportedVideoExtension
}