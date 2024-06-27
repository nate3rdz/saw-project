import z from 'zod';

export const userShowOutputSchema = z.object({
    username: z.string(),
    email: z.string().email()
});

export type IUserShowOutput = z.infer<typeof userShowOutputSchema>