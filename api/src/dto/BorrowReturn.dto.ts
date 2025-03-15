import { z } from "zod";
import { UserRegisterSchema } from "./UserRegister.dto";



export const BorrowReturnSchema = UserRegisterSchema.pick({ email: true }).extend({});

export type BorrowReturnInput = z.infer<typeof BorrowReturnSchema>