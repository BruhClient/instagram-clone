import DesktopSidebar from "@/components/DesktopSidebar";
import MobileNavbar from "@/components/MobileNavbar";

export default function HomeLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {

    
    return (
        <div className="md:flex">  
            <MobileNavbar className="flex md:hidden"/>
            <DesktopSidebar className="hidden md:flex" />
            <div className="w-full">
              {children}
            </div>
            
            
        </div>
          
        
    );
  }