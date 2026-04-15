export interface PasswordHash {
    salt: string,
    hash: string,
    iterations: number,
    keylen: number,
    digest: string
}