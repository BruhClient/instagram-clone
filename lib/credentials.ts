import { z } from "zod";

export const updateCredentialsValidator = z.object({
    username : z.string().min(5).max(30) ,
    bio: z.string().max(75) ,

})


export type updateCredentialsPayload = z.infer<typeof updateCredentialsValidator>