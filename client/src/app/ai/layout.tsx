import AppSidebar from "@/components/Sidebar/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import CustomSessionProvider from "@/hooks/CustomeSessionProvider";
import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SidebarProvider>
        <CustomSessionProvider>
          <AppSidebar />
        </CustomSessionProvider>
        <main className="grow bg-custom-gradient2 text-white">{children}</main>
      </SidebarProvider>
    </>
  );
}
