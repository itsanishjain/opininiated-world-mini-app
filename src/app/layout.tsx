import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import MiniKitProvider from "@/components/minikit-provider";
import dynamic from "next/dynamic";
import NextAuthProvider from "@/components/next-auth-provider";
import { ThemeProvider } from "@/components/theme-provider";
import { BottomNav } from "@/components/bottom-nav";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GoRide - Driving Instructor App",
  description: "Connect with qualified driving instructors",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const ErudaProvider = dynamic(
    () => import("../components/Eruda").then((c) => c.ErudaProvider),
    {
      ssr: false,
    }
  );
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>
          <ErudaProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="light"
              enableSystem
              disableTransitionOnChange
            >
              <MiniKitProvider>{children}</MiniKitProvider>
              <BottomNav />
            </ThemeProvider>
          </ErudaProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
