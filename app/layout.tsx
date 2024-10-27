import "./globals.css";
import {Inter as FontSans} from "next/font/google";
import type {Metadata} from "next";
import {Toaster} from "react-hot-toast";

import {cn} from "@/lib/utils";
import getServerUser from "@/actions/getServerUser";

import {ThemeProvider} from "./_components/theme-provider";
import PrimaryColorProvider from "./_components/primary-provider";
import AuthProvider from "./_components/auth-provider";
import Header from "./_components/header";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: {
    default: "Online Book Store",
    template: "%s | Online Book Store",
  },
  description: "Online book store using nextjs",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getServerUser();

  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <PrimaryColorProvider>
            <AuthProvider>
              <Header user={user ? JSON.parse(JSON.stringify(user)) : null} />
              <main>{children}</main>
              <Toaster />
            </AuthProvider>
          </PrimaryColorProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
