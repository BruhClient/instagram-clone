import { getAuthSession } from "@/lib/auth"
import { db } from "@/lib/db"
import { updateUserValidator } from "@/lib/users"
import { z } from "zod"




export async function POST(req: Request) {


    const session = await getAuthSession()

    if (!session) { 
        return new Response("User is Unauthenticated.",{status : 401})
    }


    try { 
        const body = await req.json()

        const {username,bio,email} = updateUserValidator.parse(body)

        const user = await db.user.findFirst({ 
            where: { 
                email
            }, 
        })

        if (!user) { 
            return new Response("User does not exist .",{status:404})
        }

        const usernameExists = await db.user.findFirst({
            where : { 
                email : {
                    not : email
                }, 
                username
            }, 

        })

        
        if (!usernameExists) { 
            const res = await db.user.update({ 
                where : {
                    email
                }, 
                data : {
                    username, 
                    bio
                }
    
            })
            return Response.json({
                username,
                bio
            })
        } else { 
            return new Response("Username already exists!",{status : 409})
        }

        

       
        

        
    } catch (error) { 
        if (error instanceof z.ZodError) { 
            return new Response(error.message,{status : 422})
        }

        return new Response("Could not create a user", {status : 500})
    }
    

    








}