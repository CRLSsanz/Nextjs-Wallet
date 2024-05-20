import type { Metadata } from "next";
import { Inter, Raleway } from "next/font/google";
import "./globals.css";
import { Providers } from "@/redux/providers";
import Navbar from "@/components/Navbar";
import { ProvidersAuth } from "./Providers";

const inter = Raleway({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"], //Josefin_Sans
  //weight: ["400"], // Poiret_One
});

export const metadata: Metadata = {
  title: "Wallet App",
  description: "Generated by create next app",
  //name = "theme-color" content = "#000000",
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className=" bg-[#252932] Xbg-cover Xbg-fixed Xbg-[50%] Xbg-[url('/images/degra-blue.jpg')] min-h-screen Xpr-10">
          <Providers>
            <ProvidersAuth>
              <Navbar />
              {children}
            </ProvidersAuth>
          </Providers>
        </div>
      </body>
    </html>
  );
}
