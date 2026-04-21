import { User } from "../Users/User";

export interface UploadedFile {
    webPath: string,
    timestamp: number,
    uploadedBy: User["uid"]
}