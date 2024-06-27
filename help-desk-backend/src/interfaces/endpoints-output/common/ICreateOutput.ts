import { z } from "zod"

export const createOutputSchema = z.object({
    ID: z.number()
})

export type ICreateOutput = z.infer<typeof createOutputSchema>;