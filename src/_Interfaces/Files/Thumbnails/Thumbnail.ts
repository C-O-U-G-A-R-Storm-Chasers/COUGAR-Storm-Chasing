import { SupportedImageExtension } from "@/_Types/SupportedImageExtension";
import { FileRecord } from "../FileRecord";

export interface Thumbnail extends Omit<FileRecord, "ext"> {
    ext: SupportedImageExtension
}