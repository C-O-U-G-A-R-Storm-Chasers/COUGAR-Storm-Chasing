import { CollectionFile } from "@/_Interfaces/Files/Collections/CollectionFile";
import { FileRecord } from "@/_Interfaces/Files/FileRecord";
import { ProfileImage } from "@/_Interfaces/Files/Images/ProfileImage";
import { Thumbnail } from "@/_Interfaces/Files/Thumbnails/Thumbnail";

export type FileRecordTypes = 
    FileRecord |
    CollectionFile |
    ProfileImage |
    Thumbnail