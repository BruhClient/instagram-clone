import type { Metadata } from "next";

import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/providers/theme-provider"
import { Paragraph } from "@/assets/fonts";
import { ModeToggle } from "@/components/mode-toggle";
import { Icons } from "@/assets/images";
import { Toaster } from "@/components/ui/toaster";
import Providers from "@/components/QueryClientProvider"
import { SessionProvider } from "next-auth/react";


export const metadata: Metadata = {
  title: "Insta - Gram",
  description: "Instagram Clone by Travis Ang",
};

export default function RootLayout({
  children,
  authModal
}: Readonly<{
  children: React.ReactNode;
  authModal: React.ReactNode
}>) {
  
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("bg-background text-foreground" ,Paragraph.className)}>
          <Providers>
            <ThemeProvider
                  attribute="class"
                  defaultTheme="system"
                  enableSystem
                  disableTransitionOnChange
                >
                  {authModal}
                  {children}
                  <div className="fixed bottom-4 right-4 ">
                    <ModeToggle/> 
                  </div>
                  <Icons.instagram className="absolute pointer-events-none hidden md:block fill-primary opacity-10 top-0 left-0 right-0 bottom-0 m-auto"/> 
                  <Toaster />
            </ThemeProvider>
          </Providers>
          
        
        
      </body>
    </html>
  );
}
