

import CreatePosts from "@/components/CreatePosts";
import { FunctionComponent } from "react";
interface CreatePageProps {
    
}
 
const CreatePage: FunctionComponent<CreatePageProps> = () => {
    return ( <div className="grid place-items-center h-screen">
        <CreatePosts /> 
    </div> );
}
 
export default CreatePage;