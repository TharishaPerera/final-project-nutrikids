import React from "react";

import { Footer } from "@/components/navigation/footer";
import { Navbar } from "@/components/navigation/navbar";

interface LandingPageLayoutProps {
  children: React.ReactNode;
}

const LandingPageLayout: React.FC<LandingPageLayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col space-y-6">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="flex h-16 items-center justify-between py-4">
          <Navbar />
        </div>
      </header>
      <main className="flex w-full flex-1 flex-col px-6 md:px-16 overflow-hidden">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default LandingPageLayout;
