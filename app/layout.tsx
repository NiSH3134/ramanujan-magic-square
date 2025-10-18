import type { Metadata } from "next";
import "./globals.css";


import { Montserrat } from "next/font/google";


const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600"], // optional
});

export const metadata: Metadata = {
  title: "Ramanujan Magic Square",
  description: "Create your own magic square using your date of birth.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        {children}
      </body>
    </html>
  );
}
