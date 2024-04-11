import * as z from "zod";

/**
 * New community post schema
 */
export const NewPostSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, { message: "Post title can not be empty!" }),
  content: z
    .string()
    .min(10, { message: "Post content should be more than 10 characters!" }),
  media: z.string().optional(),
});

/**
 * New answer schema
 */
export const NewAnswerSchema = z.object({
  answer: z.string().min(1, { message: "Answer should be more than 10 characters!" }),
})