import { UUID } from "crypto";
import { User } from "../Users/User";
import { SupportedImageExtension } from "./Images/SupportedImageExtension";

export interface ProfileImage {
    id: UUID,
    uid: User["uid"],
    ext: SupportedImageExtension,
    uploadedAt: number
}