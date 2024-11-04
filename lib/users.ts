import {z} from "zod"

export const createUserValidator = z.object({
    email : z.string().email(), 
})


export const updateUserValidator = z.object({
    username: z.string(), 
    bio : z.string(), 
    email: z.string()

})




export type createUserPayload = z.infer<typeof createUserValidator> 

export type updateUserPayload = z.infer<typeof updateUserValidator> 




