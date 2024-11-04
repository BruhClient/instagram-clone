import { FunctionComponent } from "react";
import { Button } from "./ui/button";
import { signIn } from "next-auth/react";
import { useToast } from "./hooks/use-toast";
import { Icons } from "@/assets/images";
interface GoogleSignInProps {
    
}
 
const GoogleSignIn: FunctionComponent<GoogleSignInProps> = () => {

    const {toast} = useToast()

    async function signInWithGoogle() { 
    
        try { 
          const res = await signIn("google",{callbackUrl:"/home"})
          
    
        
        } catch(error) { 
    
          toast({
            title : "Something went wrong." , 
            description : "Please try again."
          })
    
        }
        
      }
    return ( 
      <Button variant={"outline"} type="button" onClick={signInWithGoogle} className="flex py-4"><Icons.google className=" fill-primary text-primary"/> <div className="tracking-wide text-lg px-6 flex-1 ">Sign in with <span className="font-bold">Google</span></div> </Button>
     );
}
 
export default GoogleSignIn;