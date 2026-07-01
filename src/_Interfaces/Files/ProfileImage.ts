import { User } from "../Users/User";
import { ImageFile } from "./MediaFile";

export interface ProfileImage extends Omit<ImageFile, "uploader"> {
    uid: User["uid"]
}