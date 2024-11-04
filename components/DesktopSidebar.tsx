"use client"

import { Icons } from "@/assets/images";
import { cn } from "@/lib/utils";
import { FunctionComponent } from "react";
import { Header } from "@/assets/fonts";
import { User } from "lucide-react";
import LogOutButton from "./LogOutButton";
import { useRouter } from "next/navigation";
import Logo from "./Logo";
interface DesktopSidebarProps {
    className : string , 
}
 
const DesktopSidebar: FunctionComponent<DesktopSidebarProps> = ({className}) => {

    const router = useRouter()
    return ( 
    <div className={cn("w-[300px] border-2 h-screen border-primary flex-col gap-7 items-center p-4",className)}>
        <Logo />
         <div className="flex flex-col text-xl font-semibold flex-1 justify-center gap-7 pb-9">
            <button className="flex items-center gap-2" onClick={() => router.push("/profile")}><User size={35}/>Profile</button>
            <button className="flex items-center gap-2"><User size={35}/>Saved</button>
            <button className="flex items-center gap-2"><User size={35}/>Notifications</button>
            <button className="flex items-center gap-2" onClick={() => {router.push("/create")}}><User size={35} />Create Post</button>
         </div>

         <LogOutButton />
    </div> );
}
 
export default DesktopSidebar;