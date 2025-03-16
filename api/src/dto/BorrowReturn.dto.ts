import { z } from "zod";
import { UserRegisterSchema } from "./UserRegister.dto";


//Zod schema for validating borrow input, picking only the email field from UserRegisterSchema.
export const BorrowReturnSchema = UserRegisterSchema.pick({ email: true }).extend({});

export type BorrowReturnInput = z.infer<typeof BorrowReturnSchema>
