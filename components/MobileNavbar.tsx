import { Icons } from "@/assets/images";
import { FunctionComponent } from "react";
import { Header } from "@/assets/fonts";
import { cn } from "@/lib/utils";
import { UserProfile } from "./UserProfile";
import { getAuthSession } from "@/lib/auth";
import Logo from "./Logo";
interface MobileNavbarProps {
    className : string , 
    
}
 
const MobileNavbar: FunctionComponent<MobileNavbarProps> = async ({className} ) => {

    const session = await getAuthSession()
    return ( 
    <nav className={cn("m-2 flex items-center justify-between",className)}>
         <Logo />
         <div>
            <UserProfile user={session?.user} size={35}/> 
         </div>
         
         
    </nav> );
}
 
export default MobileNavbar;