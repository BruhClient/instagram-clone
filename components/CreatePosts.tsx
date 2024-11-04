"use client"

import { deleteUploadImage } from "@/actions/posts";
import { OurFileRouter } from "@/app/api/uploadthing/core";
import { UploadDropzone } from "@uploadthing/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FunctionComponent, useEffect, useState } from "react";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";

interface CreatePostsProps {
  
}
 
const CreatePosts: FunctionComponent<CreatePostsProps> = () => {


  const [image,setImage] = useState<string>()
  
  const router = useRouter()
  




  return ( <div className="flex flex-col gap-3 w-screen md:w-[500px] lg:w-[700px] ">

    {image ? <img src={image} alt="Hello World" className=" object-cover px-5 md:p-0 lg:h-[500px] h-[400px]"/> : 
    <UploadDropzone<OurFileRouter,"postImageUploader">
      endpoint="postImageUploader"

      className="bg-primary ut-label:text-lg ut-allowed-content:ut-uploading:text-red-300 lg:h-[500px] h-[400px]"
  
      onClientUploadComplete={(res) => {
        // Do something with the response

          
          
          setImage(res[0].url)
          router.refresh()
        
      }}
      onUploadError={(error: Error) => {
        alert(`ERROR! ${error.message}`);
      }}
      onUploadBegin={(name) => {
        
        // Do something once upload begins
        
        
      }}

    

  />
   }

  <Textarea className="w-full max-h-44" placeholder="Add a Caption" />

  <Button>Post Picture</Button>
    
    
  </div> );
}
 
export default CreatePosts;