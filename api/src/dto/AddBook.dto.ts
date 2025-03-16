import { z } from "zod";

//Zod schema for validating book input.
export const AddBookSchema = z.object({
    title: z.string({message: "title must be a string"}).trim().min(3, "title must be a min length of 3 character"),
    author: z.string({message: "author must be a string"}).trim().min(3, "author must be a min length of 3 character"),
    category: z.string({message: "category must be a string"}).trim().nullable().optional(),
    isbn: z.string({message: 'isbn must be a string'}).min(10, "isbn must be at least 10 number"),
    isBorrowed: z.boolean({message: "isBorrowed must be a true or false"}).default(false),
    borrowerUserId: z.string({message: "UserId must be a string"}).trim().nullable().optional(),
});


export type BookInput = z.infer<typeof AddBookSchema>

