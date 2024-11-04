"use client"

import { cn } from "@/lib/utils";
import { Header } from "@/assets/fonts";
import { Button } from "@/components/ui/button";
import { Icons } from "@/assets/images";

import GoogleSignIn from "@/components/GoogleSignIn";
import { zodResolver } from "@hookform/resolvers/zod";
import { createUserValidator } from "@/lib/users";
import {SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import {signIn} from "next-auth/react"
import { Input } from "@/components/ui/input";
import GitHubSignIn from "@/components/GitHubSignIn";

type FormFields = z.infer<typeof createUserValidator>

export default function Home() {
  const router = useRouter()
  const {register,handleSubmit,formState:{isSubmitting,errors},} = useForm<FormFields>({ 
  
    resolver: zodResolver(createUserValidator), 
  })

  
  const onSubmit:SubmitHandler<FormFields> = async (data) => { 
    console.log(data)
    await signIn("email",{
      email : data.email , 
      callbackUrl:"/home"
    })
      

      
  }
  console.log(errors.email)
  
  return (

      <div className="flex justify-center items-center h-screen px-3 flex-col gap-4">
        
        <h1 className={cn(Header.className,"text-[60px] md:text-[100px] pb-3  ")} >Insta - gram</h1>

        <form action="" className="w-full px-4 max-w-[400px]" onSubmit={handleSubmit(onSubmit)}>
          
          <Input type="text" {...register("email")} placeholder="Enter your email address" className={errors.email == undefined ? "mb-3" : ""}/>
          {errors.email != undefined ? <div className="text-red-400 font-semibold p-0 m-0 text-xs pl-1 mb-3">Email format is wrong . Please try again .</div> : ""}

          <div className="flex flex-col gap-3">
            <Button className="text-lg " variant={"highlight"} disabled={isSubmitting}>Log in</Button>
            <GoogleSignIn />
            <GitHubSignIn />
          </div>
          
          
          
        </form>

      </div>
      
    
  );
}
