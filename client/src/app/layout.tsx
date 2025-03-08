import type { Metadata } from "next";
import { Roboto_Flex, Istok_Web } from "next/font/google";
import Provider from "./provider";
import "./globals.css";
import GrowTeensLogo from "@public/icons/logo.svg";
import GrowTeensLogoThumbnailImage from "@public/icons/logo.svg";

const robotoFlex = Roboto_Flex({
  variable: "--font-roboto-flex",
  subsets: ["latin"],
});

const istokWeb = Istok_Web({
  weight: ["400", "700"],
  variable: "--font-istok-web",
  subsets: ["latin"],
});

const appName = "GrowTeens";
// const appUrl = "";
const appMetaTitle = `${appName} - Empowering African Teens for a Brighter Future.`;
const imageAlt = 'GrowTeens Logo';
const appMetaDescription =
  "Empowering African Teens for a Brighter Future. #GrowTeens #Health #Education #Empowerment #Leadership #Mentorship";


export const metadata: Metadata = {
  title: appName,
  description: appMetaTitle,
  openGraph: {
    type: "website",
    title: appMetaTitle,
    description: appMetaDescription,
    images: [
      {
        url: GrowTeensLogoThumbnailImage.src,
        alt: imageAlt,
      },
    ],
  },
  icons: [
    {
      url: GrowTeensLogo.src,
      type: "image/png",
      sizes: "32x32",
    },
  ],
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
