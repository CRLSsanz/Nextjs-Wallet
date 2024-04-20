import type { Metadata } from "next";
import { Inter, Poppins, Raleway } from "next/font/google";
import "./globals.css";
import { Providers } from "@/redux/providers";
import Navbar from "@/components/Navbar";
import { ProvidersAuth } from "./Providers";

const inter = Raleway({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "Wallet App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="bg-[#B48969] bg-cover bg-fixed bg-[49.5%] bg-[url('/images/f-hexagon.jpg')] min-h-screen pr-5">
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
