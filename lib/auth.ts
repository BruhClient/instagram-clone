import { PrismaAdapter } from "@auth/prisma-adapter";
import { getServerSession, NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";
import { nanoid } from "nanoid";
import { db } from "./db";

const authOptions :NextAuthOptions = { 
    adapter : PrismaAdapter(db), 
    session : { 
        strategy: "jwt", 

    }, 
    providers : [

        GoogleProvider({
            clientId:  process.env.GOOGLE_CLIENT!, 
            clientSecret : process.env.GOOGLE_SECRET!, 
            allowDangerousEmailAccountLinking: true,
        }
        ),
        EmailProvider({
          id: "email", 
          name:"email", 
          server: {
            host: process.env.EMAIL_SERVER_HOST,
            port: process.env.EMAIL_SERVER_PORT,
            auth: {
              user: process.env.EMAIL_SERVER_USER,
              pass: process.env.EMAIL_SERVER_PASSWORD
            }
          },
          from: process.env.EMAIL_FROM
        }),

        
        



    ], 
    pages : { 
        signIn : "/",
       
        
        
         
    },
    callbacks : {
        async jwt ({ token }) { 
            const dbUser = await db.user.findFirst({
                where: {
                  email: token.email,
                },
              })

              if (!dbUser) {
            
                return token
              }

              if (!dbUser.username) {
                await db.user.update({
                  where: {
                    id: dbUser.id,
                  },
                  data: {
                    username: nanoid(),
                  },
                })

            }


 
            
            return {
                id : dbUser.id,
                name : dbUser.name, 
                email : dbUser.email, 
                image : dbUser.image,
                username : dbUser.username ,
                bio : dbUser.bio, 

            }
        },
        async session({token , session}) { 

                if (token) { 
                    
                    session.user!.id = token.id
                    session.user!.email = token.email
                    session.user!.image = token.image
                    session.user!.username = token.username
                    session.user.bio = token.bio
                    


                }
                return session
        }
  
    }
    
}


export const getAuthSession = () => getServerSession(authOptions)

export default authOptions