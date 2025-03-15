import { z } from "zod";

export const UserRegisterSchema = z.object({
    fullName: z.string().trim().min(3, "Full Name must be a min length of 3 character"),
    email: z.string().email({ message: "Invalid email format" }),
    phone: z.string().trim().regex(/^\+?[1-9]\d{9,14}$/, { message: "Invalid phone number format" }),
});

export type UserRegisterInput = z.infer<typeof UserRegisterSchema>;