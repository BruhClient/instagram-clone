"use client"

import { Header } from "@/assets/fonts";
import { Icons } from "@/assets/images";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { FunctionComponent } from "react";

interface LogoProps {
    
}
 
const Logo: FunctionComponent<LogoProps> = () => {

    const router = useRouter()
    return ( 
        <div className={cn("flex items-center gap-2 cursor-pointer",Header.className)} onClick={() => router.push("/home")}>
            <Icons.instagram className="fill-primary w-9 opacity-100"/>
            <div className="text-3xl">Insta-gram</div>
         </div>
     );
}
 
export default Logo;