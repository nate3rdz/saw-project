import z from 'zod';

export const userLoginOutputSchema = z.object({
    token: z.string()
});

export type IUserLoginOutput = z.infer<typeof userLoginOutputSchema>;