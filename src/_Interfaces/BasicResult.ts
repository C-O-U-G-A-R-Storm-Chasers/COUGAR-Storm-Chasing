/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export interface BasicResult<T = any> {
    success: boolean,
    msg?: string,
    data?: T
}