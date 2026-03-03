import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { MinimalistNavbar } from "@/components/ui/minimalist-navbar";
import { ThemeProvider } from "next-themes";
import { Preloader } from "@/components/ui/preloader";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Namish | Portfolio",
  description: "Portfolio of Namish, AI/ML Developer & CP Enthusiast",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <Preloader />
          <MinimalistNavbar />

          <main>
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
