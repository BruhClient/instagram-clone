import { z } from "zod";

export const createPostValidator = z.object({ 
    imageUrl : z.string(), 
    caption : z.string().min(1).max(50)

})


export type createPostPayload = z.infer<typeof createPostValidator>
