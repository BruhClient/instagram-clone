import type {Session , User} from "next-auth"
import { JWT } from "next-auth/jwt"

type UserId = string 

declare module "next-auth/jwt" { 
    interface JWT { 
        id : UserId , 
        username : string | null, 
        bio : string | null ,
        image: string, 
    }
}

declare module "next-auth" { 
    interface Session { 
        user : { 
            id : UserId , 
            username : string | null, 
            email : string | undefined | null , 
            image : string | undefined | null ,
            bio : string | undefined | null
        }
         
        
    }
}