import type { Metadata } from "next";
import { Roboto_Flex, Istok_Web } from "next/font/google";
import Provider from "./provider";
import "./globals.css";

const robotoFlex = Roboto_Flex({
  variable: "--font-roboto-flex",
  subsets: ["latin"],
});

const istokWeb = Istok_Web({
  weight: ["400", "700"],
  variable: "--font-istok-web",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Grow Teens",
  description: "Empowering African Teens for a Brighter Future.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light" suppressHydrationWarning>
      <body
        className={`${robotoFlex.variable} ${istokWeb.variable} antialiased`}
        suppressHydrationWarning
      >
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
