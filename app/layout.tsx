import "./globals.css";
import {Inter as FontSans} from "next/font/google";
import type {Metadata} from "next";

import {cn} from "@/lib/utils";
import {ThemeProvider} from "@/components/theme-provider";
import PrimaryColorProvider from "@/components/primary-provider";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
          <PrimaryColorProvider>{children}</PrimaryColorProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
