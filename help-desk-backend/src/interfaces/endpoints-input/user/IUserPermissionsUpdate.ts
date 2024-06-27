import { Request } from "express";
import z from 'zod';
import { UserPermissions, USER_PERMISSIONS } from "../../system/IAuth.js";

export const userPermissionsUpdateInputParamsSchema = z.object({
    id: z.string(),
});

export const userPermissionsUpdateInputBodySchema = z.object({
    permissions: z.array(z.string()).refine((val) => {
        for (const permission of val) {
            if (!USER_PERMISSIONS.includes(permission as any))
                return false;
        }
    })
});

type UserPermissionsUpdateInputParams = z.infer<typeof userPermissionsUpdateInputParamsSchema>;

export default interface IUserPermissionsUpdateInput extends Request {
    body: {
        permissions: UserPermissions[]
    },
    params: UserPermissionsUpdateInputParams,
    query: {

    }
}