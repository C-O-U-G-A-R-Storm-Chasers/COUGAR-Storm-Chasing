import { FileRecord } from "../FileRecord";
import { Thumbnail } from "../Thumbnails/Thumbnail";

export interface CollectionFile extends FileRecord {
    thumb: Thumbnail["id"]
}