"use server"

import { db } from "@/lib/db"

async function updateUserProfile({email,username,bio} : {email: string , username: string, bio : string}) { 
    const res = await db.user.update({ 
        where: { 
            email : email
        }, 
        data : { 
            username , 
            bio
        }
    }) 
}

export { 
    updateUserProfile
}