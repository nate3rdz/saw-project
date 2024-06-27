export const USER_PERMISSIONS = ['user-manage', 'manage-permissions', 'manage-tickets'] as const;
export type UserPermissions = typeof USER_PERMISSIONS[number];

export type PermissionsMap = Record<UserPermissions, boolean>;

export default interface IJWT{
    token: string;
    data: JWTData;
};

export interface JWTData{
    userId: number;
}