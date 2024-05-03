"use client";

import Count from "@/components/Count";
import UserList from "@/components/UserList";
import { useGetUsersQuery } from "@/redux/services/userApi";
import LoginPage from "./login/page";
import Loader from "@/components/Loader";
import { useSession } from "next-auth/react";
import { Montserrat } from "next/font/google";
import Link from "next/link";

const number = Montserrat({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "600", "700"],
});

export default function Home() {
  const { data, error, isLoading, isFetching } = useGetUsersQuery(null);
  const { data: session } = useSession();

  if (isLoading || isFetching)
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  if (error) return <p>Some Error</p>;

  return (
    <main className="text-white">
      {!session?.user ? (
        <LoginPage />
      ) : (
        <>
          {/** BOTON Y FOTO */}
          <div className="w-full p-5 text-white flex flex-row justify-between items-center">
            <div className="flex flex-row">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-7 h-7"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  //d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"
                  d="M12 6.75h8.25M3.75 12h16.5m-16.5 5.25H12"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="hidden w-7 h-7"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  //d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25"
                  d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25"
                />
              </svg>

              <div className="hidden">
                <h1 className="text-gray-300">Hola! Bienvenido</h1>
                <h1 className="-mt-1 text-lg font-medium">
                  {session.user.name}
                </h1>
              </div>
            </div>
            <img
              src={`${session.user.image}`}
              alt="Avatar"
              className="rounded-full w-12 h-12 shadow-gray-300"
            />
          </div>

          {/** INFO DE USER */}
          <div className="px-5 mb-10">
            <h1 className="text-lg font-medium text-teal-500">
              Hola {session.user.name}{" "}
            </h1>
            <h1 className=" text-4xl">
              Let{`'`}s complete your current balance
            </h1>
          </div>

          {/** CARD */}
          <div className=" px-10">
            <div className="w-full h-40 p-4 rounded-3xl bg-gradient-to-br from-indigo-600/80 to-pink-600 text-black/50">
              Avalieve Balance
            </div>
          </div>
          <div className={` p-5 -mt-36 mb-5 ${number.className} `}>
            <div className="w-full p-5 rounded-3xl bg-gray-800/30 backdrop-blur-xl border border-gray-500/30">
              <h1>Saldo Disponible</h1>
              <h1 className="text-2xl tracking-wider mt-2 mb-12">
                $ <span className="">20150.00</span>
              </h1>
              <h1 className="tracking-[0.2em]">**** **** **** 7856</h1>
              <h1 className="">01/05</h1>
            </div>
          </div>

          {/** ITEM ADD - ANALYTICS - HISTORY - CATEGORY */}
          <div className="p-5 text-gray-200 flex flex-row justify-between items-center mb-5">
            <div className="flex flex-col items-center">
              <Link
                href={session?.user ? "/form" : "#"}
                className="w-16 h-16 flex items-center justify-center rounded-full bg-black/20 mb-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-7 h-7 active:animate-ping hover:scale-125 Xhover:-ml-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              </Link>
              <div className=""> Add </div>
            </div>
            <div className="flex flex-col items-center">
              <Link
                href={session?.user ? "/analytics" : "#"}
                className="w-16 h-16 flex items-center justify-center rounded-full bg-black/20 mb-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-7 h-7 active:animate-ping hover:scale-125 Xhover:-ml-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
                  />
                </svg>
              </Link>
              <div className=""> Analisis </div>
            </div>
            <div className="flex flex-col items-center">
              <Link
                href={session?.user ? "/history" : "#"}
                className="w-16 h-16 flex items-center justify-center  rounded-full bg-black/20 mb-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-7 h-7 active:animate-ping hover:scale-125 Xhover:-ml-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z"
                  />
                </svg>
              </Link>
              <div className=""> Balance </div>
            </div>
            <div className="flex flex-col items-center">
              <Link
                href={session?.user ? "/category" : "#"}
                className="w-16 h-16 flex items-center justify-center rounded-full bg-black/20 mb-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-7 h-7 active:animate-ping hover:scale-125 Xhover:-ml-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z"
                  />
                </svg>
              </Link>
              <div className=""> Category </div>
            </div>

            <div className="hidden xflex flex-col items-center">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-black/20 mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                  />
                </svg>
              </div>
              <div className=""> Mas </div>
            </div>
          </div>

          {/** ULTIMAS TRANSACCIONES */}
          <div className=" p-5 ">
            <div className="flex flex-row justify-between mb-5">
              <h1 className="font-semibold">Ultimas Transacciones</h1>
              <Link
                href={"/history"}
                className="text-gray-300 flex flex-row items-center"
              >
                <h1>Ver mas</h1>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-4 h-4 ml-1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m8.25 4.5 7.5 7.5-7.5 7.5"
                  />
                </svg>
              </Link>
            </div>

            <div
              className={`bg-gray-800/50 rounded-xl p-2 flex flex-row items-center mb-3 ${number.className} `}
            >
              <div className="">
                <h1 className="w-10 h-10 bg-purple-700 rounded-lg"></h1>{" "}
              </div>
              <div className="w-full ml-3">
                <h1>Paypal</h1>
                <h1 className="text-gray-400 text-sm">20 de Abril del 2024</h1>
              </div>
              <div className="">$459.00</div>
            </div>

            <div
              className={`bg-gray-800/50 rounded-xl p-2 flex flex-row items-center mb-3 ${number.className} `}
            >
              <div className="">
                <h1 className="w-10 h-10 bg-purple-700 rounded-lg"></h1>{" "}
              </div>
              <div className="w-full ml-3">
                <h1>Netflix</h1>
                <h1 className="text-gray-400 text-sm">16 de Abril del 2024</h1>
              </div>
              <div className="">$159.00</div>
            </div>

            <div
              className={`bg-gray-800/50 rounded-xl p-2 flex flex-row items-center ${number.className} `}
            >
              <div className="">
                <h1 className="w-10 h-10 bg-purple-700 rounded-lg"></h1>{" "}
              </div>
              <div className="w-full ml-3">
                <h1>Servicios</h1>
                <h1 className="text-gray-400 text-sm">05 de Abril del 2024</h1>
              </div>
              <div className="">$599.00</div>
            </div>
          </div>
        </>
      )}

      <div className="h-screen pt-20 px-5">
        <Count />

        <UserList />
      </div>
    </main>
  );
}
