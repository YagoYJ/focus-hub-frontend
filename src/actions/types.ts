import { z } from "zod";

export const groupSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
})

export const prioritySchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  description: z.string(),
  completed: z.boolean(),
  groupId: z.string().uuid(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const errorResponseSchema = z.object ({
  name: z.string(),
  message: z.string(),
});

export const createGroupSchema = z.object({
  name: z
    .string()
    .min(3, {
      message: "Name must be at least 3 characters.",
    })
    .max(50, {
      message: "Name must be until 50 characters.",
    }),
});

export type Group = z.infer<typeof groupSchema>;
export type Priority = z.infer<typeof prioritySchema>;
export type ErrorResponse = z.infer<typeof errorResponseSchema>;
export type CreateGroup = z.infer<typeof createGroupSchema>;