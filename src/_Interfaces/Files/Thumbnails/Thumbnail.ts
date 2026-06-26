import { SupportedImageExtension } from "@/_Types/SupportedImageExtension";
import { FileRecord } from "../FileRecord";

export interface Thumbnail extends Omit<FileRecord, "thumbnail" | "ext"> { // exclude thumbnail prop to prevent recursivity
    ext: SupportedImageExtension
}