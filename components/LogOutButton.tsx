"use client"

import { FunctionComponent } from "react";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import {signOut} from "next-auth/react"
import { useToast } from "./hooks/use-toast";

interface LogOutButtonProps {
    
}
 
const LogOutButton: FunctionComponent<LogOutButtonProps> = () => {
    const {toast} = useToast()
    async function logOut() { 
        try{ 
            await signOut({callbackUrl:"/"})
            
        }
        catch (error) { 
            toast({
                title : "Something went wrong.", 
                description : "Please try again."
            })
        } 
    }
    return ( 
        <Button className="w-full" onClick={logOut}><LogOut /> Log out</Button>
     );
}
 
export default LogOutButton;