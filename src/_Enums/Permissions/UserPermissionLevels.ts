export enum UserPermissionLevels {
    SUPER_ADMIN = 1 << 3,
    ADMIN = 1 << 2,
    MODERATOR = 1 << 1,
    USER = 1 << 0,
}