import React from "react";

import { Footer } from "@/components/navigation/footer";
import { Navbar } from "@/components/navigation/navbar";
import MobileSideNav from "@/components/navigation/mobile-side-nav";
import SideNav from "@/components/navigation/side-nav";

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col space-y-6">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="flex h-16 items-center justify-between py-4">
          <Navbar />
        </div>
      </header>
      <div className="grid flex-1 px-6 md:px-16 gap-6 md:grid-cols-[300px_1fr]">
        <aside className="hidden w-[300px] flex-col md:flex ">
          <SideNav />
        </aside>
        <main className="flex w-full flex-1 flex-col overflow-hidden ">
          {children}
        </main>
      </div>
      <MobileSideNav />
      <Footer />
    </div>
  );
};

export default DashboardLayout;
