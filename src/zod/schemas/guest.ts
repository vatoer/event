import { z } from "zod";

const emptyStringToNull = z
  .string()
  .transform((val) => (val === "" || val === "-" ? null : val));

export const guestSchema = z
  .object({
    id: z
      .union([z.string().cuid().optional(), z.string().optional()]),
    prefix: z.string().optional(),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    email: emptyStringToNull
      .nullable()
      .optional()
      .refine(
        (val) =>
          val === null ||
          val === undefined ||
          z.string().email().safeParse(val).success,
        {
          message: "Invalid email address",
        }
      ),
    profession: z.string().optional(),
    institution: z.string().optional(),
    eventId: z.string(),
  })
  .superRefine((data, ctx) => {
    if (data.firstName?.trim() === "" && data.lastName?.trim() === "") {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "At least one of first Name or last Name must not be null or an empty string",
        path: ["firstName"],
      });
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "At least one of first Name or last Name must not be null or an empty string",
        path: ["lastName"],
      });
    }
  });

export type Guest = z.infer<typeof guestSchema>;
