import { SupportedVideoExtension } from "@/_Types/SupportedVideoExtension";
import { FileRecord } from "../FileRecord";
import { Thumbnail } from "../Thumbnails/Thumbnail";

export interface CollectionFile extends Omit<FileRecord, "ext"> {
    ext: SupportedVideoExtension,
    thumb: Thumbnail
}