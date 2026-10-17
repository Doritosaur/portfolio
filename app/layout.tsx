import { Karla } from "next/font/google";
import "./globals.css";
import type { Metadata } from "next";

const karla = Karla({ subsets: ["latin"], variable: "--font-karla" });

export const metadata: Metadata = {
  title: "Aman Adhikari — Full Stack Engineer",
  description: "Portfolio of Aman Adhikari, full stack engineer.",
  icons: { icon: "/me.jpg" },
};

// Runs before paint so the saved theme never flashes. Light is the default.
const themeScript = `try{var t=localStorage.getItem("theme");if(t==="dark")document.documentElement.dataset.theme="dark"}catch(e){}`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={karla.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
