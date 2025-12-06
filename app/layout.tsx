import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Team Durbar | Mars Rover Team from KUET, Bangladesh",
  description:
    "Forging the future of Martian exploration from Bangladesh. Team Durbar is a Mars Rover team from KUET pushing the boundaries of space robotics.",
  keywords: [
    "Team Durbar",
    "Mars Rover",
    "KUET",
    "Bangladesh",
    "Space Robotics",
    "ARC",
    "Rover Challenge",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          <Navbar />
          <main className="flex-1 pt-16 md:pt-20">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}

