import { z } from "zod"

export const paginationQuerySchema = z.object({
    skip: z.string().optional(),
    limit: z.string().optional()
})

export type IPaginationQueryParams = z.infer<typeof paginationQuerySchema>;