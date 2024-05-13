import type { Metadata } from "next";
import { Montserrat, Poppins, Lexend_Deca } from "next/font/google";
import { Toaster } from "sonner";
import { SessionProvider } from "next-auth/react";

import "./globals.css";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { auth } from "@/auth";
import { EdgeStoreProvider } from "@/lib/edgestore";
import { ViewTransitions } from "next-view-transitions";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
const lexend = Lexend_Deca({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
})

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
      <ViewTransitions>
        <html lang="en">
          <body className={lexend.className}>
            <ThemeProvider
              attribute="class"
              defaultTheme="light"
              enableSystem
              disableTransitionOnChange
            >
              <Toaster position="bottom-right" />
              <EdgeStoreProvider>{children}</EdgeStoreProvider>
            </ThemeProvider>
          </body>
        </html>
      </ViewTransitions>
    </SessionProvider>
  );
}
