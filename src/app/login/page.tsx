"use client";

import Image from "next/image";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { useState } from "react";
import Loader from "@/components/Loader";
import { Poiret_One } from "next/font/google";

const titulo = Poiret_One({
  subsets: ["latin"],
  weight: ["400"],
});

const LoginPage = () => {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  //console.log(session);

  type Props = {
    title: string;
    icon: string;
    size: number;
  };

  const LoginComponentButton = ({ title, icon, size }: Props) => {
    const handleLoginProvider = async () => {
      try {
        setIsLoading(true);
        await signIn(icon);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    return (
      <button
        onClick={handleLoginProvider}
        className="w-10 h-10 flex items-center justify-center Xborder border-gray-200 rounded-full bg-black/30 hover:bg-cyan-500/20 cursor-pointer"
      >
        <Image
          src={`/images/${icon}.png`}
          width={size}
          height={size}
          alt={`image ${icon}`}
        />
        {isLoading ? (
          <span className="hidden w-40 animate-pulse">Loading...</span>
        ) : (
          <span className="hidden pl-2">Continuar con {title}</span>
        )}
      </button>
    );
  };

  return (
    <div className="bg-black/80 text-gray-200 w-full h-screen px-5 flex justify-center items-center">
      <div
        className={`w-full md:max-w-[600px] Xbg-white/10 ${titulo.className}`}
      >
        <h1 className="text-end">Continuar con</h1>
        <div className="-mt-4 flex flex-row items-center justify-between">
          {/* LOADER*/}
          <div className="font-bold tracking-widest flex items-center ">
            <h1>WALLET 3.19</h1>
          </div>

          {/* LOGIN CON GOOGLE - FACCEBOOK - GITHUB */}
          {!session?.user ? (
            <div className="flex flex-row items-center space-x-2">
              <div className="text-gray-400 h-20 w-20">
                {isLoading ? <Loader /> : <span> </span>}
              </div>
              <LoginComponentButton title="Github" icon="github" size={30} />
              <LoginComponentButton
                title="Facebook"
                icon="facebook"
                size={30}
              />
              <LoginComponentButton title="Google" icon="google" size={27} />
            </div>
          ) : (
            <Link
              href="/analytics"
              className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 shadow-lg shadow-cyan-500/50 font-medium rounded-full text-sm px-5 py-2.5 text-center"
            >
              Get started
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
