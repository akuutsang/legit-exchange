import { z } from "zod";

export const propertyFiltersSchema = z.object({
  page: z.string().regex(/^\d+$/, "Page must be a number").optional(),
  limit: z.string().regex(/^\d+$/, "Limit must be a number").optional(),
  search: z.string().optional(),
  type: z.string().optional(), // comma-separated
  minPrice: z.string().regex(/^\d+$/, "Min price must be a number").optional(),
  maxPrice: z.string().regex(/^\d+$/, "Max price must be a number").optional(),
  bedrooms: z
    .string()
    .regex(/^\d+\+?$/, "Bedrooms must be number or number+")
    .optional(),
  status: z.enum(["available", "pending", "sold", "rented", "all"]).optional(),
  sortBy: z.enum(["price", "createdAt"]).optional(),
  sortOrder: z.enum(["asc", "desc"]).optional(),
});

export type PropertyFilters = z.infer<typeof propertyFiltersSchema>;
