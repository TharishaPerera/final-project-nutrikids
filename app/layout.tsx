import type { Metadata } from "next";
import { Montserrat, Poppins } from "next/font/google";
import { Toaster } from "sonner";
import { SessionProvider } from "next-auth/react";

import "./globals.css";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { auth } from "@/auth";
import { EdgeStoreProvider } from "@/lib/edgestore";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "N U T R I K I D S",
  description: "A Parent Guidance Application",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  console.log(session);
  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body className={poppins.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Toaster position="bottom-right" />
            <EdgeStoreProvider>{children}</EdgeStoreProvider>
          </ThemeProvider>
        </body>
      </html>
    </SessionProvider>
  );
}
