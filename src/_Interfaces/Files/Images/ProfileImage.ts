import { User } from "../../Users/User";
import { SupportedImageExtension } from "../../../_Types/SupportedImageExtension";
import { FileRecord } from "../FileRecord";

export interface ProfileImage extends Omit<FileRecord, "uploader" | "ext"> {
    uid: User["uid"],
    ext: SupportedImageExtension,
}