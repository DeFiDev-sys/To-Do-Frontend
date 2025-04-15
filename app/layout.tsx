import type { Metadata } from "next";
import "./globals.css";
import ReduxProvider from "@/components/ReduxProvider";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: {
    template: "%s | Task Manager",
    default: "Task Manager",
  },
  description: "A To-Do List Web Application, used for task management.",
  keywords: "Task Manager, To-Do List, Task Management",
  openGraph: {
    title: "Task Manager",
    description: "A To-Do List Web Application, used for task management.",
    type: "website",
    url: "https://to-do-frontend-theta.vercel.app/",
    images: {
      url: "https://res.cloudinary.com/dybqllv1r/image/upload/v1744714282/metadataPic_ebcfje.png",
      alt: "Task Manager Logo",
      width: 800,
      height: 600,
    },
  },
  twitter: {
    card: "summary_large_image",
    site: "@task-manager",
    title: "Task Manager",
    description: "A To-Do List Web Application, used for task management.",
    images: "https://res.cloudinary.com/dybqllv1r/image/upload/v1744714282/metadataPic_ebcfje.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={""}>
        <ThemeProvider attribute='class' defaultTheme='light' enableSystem disableTransitionOnChange>
          <ReduxProvider>
            <main>{children}</main>
            <Toaster />
          </ReduxProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
