

import Profile from "@/components/Profile";
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { Avatar } from "@radix-ui/react-avatar";
import Image from "next/image";
import { FunctionComponent } from "react";

interface ProfileProps {
    
}
 
const ProfilePage: FunctionComponent<ProfileProps> = async () => {
    const session = await getAuthSession()

    const user = await db.user.findFirst({
        where : { 
            id : session?.user.id
        }
    })



    return ( <div className="flex justify-center items-center h-screen flex-col ">

        <Avatar >
            <AvatarImage src={user!.image!} alt="@profile image" className="rounded-full w-52 h-52 object-cover"/>
            <AvatarFallback><Skeleton className="h-52 w-52 rounded-full" /></AvatarFallback>
        </Avatar>

        
        <Profile username={user?.username} bio={user?.bio} email={user?.email} />
    </div> );
}
 
export default ProfilePage;