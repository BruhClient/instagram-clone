"use client"

import {
    LogOut,
    Mail,
    MessageSquare,
    Settings,
    User,
    UserPlus,
  } from "lucide-react"
   
  import { Button } from "@/components/ui/button"
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"


interface UserProfileProps { 
    user : { 
        name : string , 
        email: string, 
        image : string ,
        username : string ,  
    }, 
    size : number, 
}



import { Avatar,AvatarFallback,AvatarImage } from "@radix-ui/react-avatar"
import { FunctionComponent } from "react"
import LogOutButton from "./LogOutButton"
import { useRouter } from "next/navigation"
   
export const UserProfile : FunctionComponent<UserProfileProps> = ({user,size}) =>  {
    const router = useRouter()

    return (
      <DropdownMenu>
        <DropdownMenuTrigger className="outline-none">
           
            <User size={size}/>
          
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={user.image} alt="@profile image" className="rounded-full w-14 h-14 object-cover"/>
              <AvatarFallback>Profile</AvatarFallback>
            </Avatar>

              <div className="text-lg">
                  
                  <div>
                      {user.username}
                  </div>
                  <div className="text-sm text-inputForeground">
                      {user.email}
                  </div>
              </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => router.push("/profile")}>
              <User />
              <span>Profile</span>
              
            </DropdownMenuItem>

            <DropdownMenuItem>
              <Settings />
              <span>Saved</span>
              <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings />
              <span>Notifications</span>
              <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings />
              <span onClick={() => {router.push("/create")}}>Create Post</span>
              <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <UserPlus />
                <span>Invite users</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuItem>
                    <Mail />
                    <span>Email</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <MessageSquare />
                    <span>Message</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            
            <LogOutButton />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }