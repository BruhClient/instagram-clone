import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { createUserValidator } from "@/lib/users";
import { z } from "zod";
import bcrypt from "bcrypt"
import { nanoid } from "nanoid";
export async function POST(req: Request) {
        try { 
            

        const body = await req.json()
       
        const {email,password} = createUserValidator.parse(body)
        
        const saltRounds = await bcrypt.genSalt()
        
        const hashedPassword =  await bcrypt.hash(password,saltRounds)
        
        const userExists = await db.user.findFirst({ 
            where : { 
                email : email
            }
        })

        
        
        if (!!userExists) { 
            return new Response("Email address already exists",{status:400})
        }

        
        const user = await db.user.create({
            data : { 
                email : email , 
                Hashedpassword : hashedPassword, 
                username : nanoid(10) , 
            }
        })

        
        const account = await db.account.create({
            data : { 
                userId : user.id, 
                provider : "credentials" , 
                providerAccountId: nanoid(15) , 
                type : "credentials"
            }
        })


        return Response.json({email,password})
        

    } catch(error) { 
        if (error instanceof z.ZodError) { 
            return new Response(error.message,{status : 422})
        }

        return new Response("Could not create a user", {status : 500})
    }
    



}