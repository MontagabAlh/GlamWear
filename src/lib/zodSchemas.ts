import { z } from "zod"

export const productSchema = z.object({
    name: z.string(),
    description: z.string(),
    price: z.number().min(1),
    status: z.enum(["draft", "published", "archived"]),
    images: z.array(z.string()).min(1, "At Least one image is required"),
    category: z.enum(["men", "women", "kids"]),
    isFeatured: z.boolean().optional(),
})