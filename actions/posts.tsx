"use server"

import { utapi } from "@/app/api/uploadthing/core";


async function deleteUploadImage(key : string) { 
    console.log("key" ,key)
    await utapi.deleteFiles([key]);
}

export { 
    deleteUploadImage
}