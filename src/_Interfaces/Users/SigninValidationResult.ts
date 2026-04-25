import { BasicResult } from "../BasicResult";
import { User } from "./User";

export interface SigninValidationResult extends BasicResult {
    msg: string,
    data: User | null
}