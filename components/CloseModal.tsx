"use client"

import { X } from "lucide-react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const CloseModel = () => {

    const router = useRouter()
    return ( 
        <Button aria-label="close model" variant={"ghost"} className="h-6 w-6 p-0 rounded-md" onClick={() => {
            router.back()
        }}>
            <X className="h-4 w-4"/>
        </Button>
     );
}
 
export default CloseModel;