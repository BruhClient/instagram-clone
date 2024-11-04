"use client"

import { FunctionComponent, useState } from "react";
import { UploadButton, UploadDropzone } from "@uploadthing/react";
import { useRouter } from "next/navigation";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { SubmitHandler, useForm } from "react-hook-form";
import { updateCredentialsPayload, updateCredentialsValidator } from "@/lib/credentials";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateUserPayload } from "@/lib/users";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios"
import { useToast } from "./hooks/use-toast";
import { OurFileRouter } from "@/app/api/uploadthing/core";


interface ProfileProps {
    username : string  , 
    email: string , 
    bio : string 
}
 




const Profile: FunctionComponent<ProfileProps> = ({username,email,bio}) => {

    const router = useRouter()

    
    const {register,handleSubmit,formState:{isSubmitting,errors},} = useForm<updateCredentialsPayload>({ resolver : zodResolver(updateCredentialsValidator)})

    const {toast} = useToast()

    const {mutate : updateUser, isPending:isSubLoading} = useMutation(
      { 
        mutationFn :async ({username,bio} : {username: string , bio : string}) => {
          const payload : updateUserPayload = {
            email, 
            username, 
            bio
        }

        const {data} = await axios.post("/api/user",payload)
        return data
         },
         onError :(err) =>  { 
          
          if (err instanceof AxiosError) { 
              
          return toast({
              title: err.response?.data, 
              description : "Something went wrong , please try again", 
              variant : "destructive"
          })
          }
      
          }, 
        onSuccess : (data) => {
          toast({
            title: "Account updated !", 
            description : "See your new changes in real time.", 
         
            })
            
            router.refresh()
          }
          

         
        
      }
    )

    const onSubmit : SubmitHandler<updateCredentialsPayload> = async (data) => { 
     
      const res = updateUser(
        {
          username : data.username, 
          bio: data.bio
        }
      )

    }
    
    return ( <div className="w-[300px] md:w-[500px]">
 
        
        
        <UploadButton<OurFileRouter,"imageUploader">
          


          className="mt-4 ut-button:bg-red-500 ut-button:ut-readying:bg-red-500/50"
       
        
        endpoint="imageUploader"
        onClientUploadComplete={(res : any) => {
          // Do something with the response

      

          router.refresh()
          
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
        
      />

      <form onSubmit={handleSubmit(onSubmit)} action=""> 
        <Label>Username : </Label>
        <Input {...register("username")} defaultValue={username} /> 
        {errors.username != undefined ? <div className="text-red-400 font-semibold p-0 m-0 text-xs pl-1 mb-3">Email format is wrong . Please try again .</div> : ""}
        <Label>Bio : </Label>
        <Textarea {...register("bio")}  defaultValue={bio} className="max-h-44 mb-3" /> 
        {errors.bio != undefined ? <div className="text-red-400 font-semibold p-0 m-0 text-xs pl-1 mb-3">Email format is wrong . Please try again .</div> : ""}


        <Button className="w-full" disabled={isSubLoading}>Save Changes</Button>
      </form>
      
      
    </div> );
}
 
export default Profile;