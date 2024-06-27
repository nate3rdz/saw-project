import z from 'zod';

export const userPatchOutputSchema = z.object({
    success: z.boolean()
});

export type IUserPatchOutput = z.infer<typeof userPatchOutputSchema>;