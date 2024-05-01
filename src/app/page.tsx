"use client";

import Count from "@/components/Count";
import UserList from "@/components/UserList";
import { useGetUsersQuery } from "@/redux/services/userApi";
import LoginPage from "./login/page";
import Loader from "@/components/Loader";
import { useSession } from "next-auth/react";
import { Montserrat } from "next/font/google";

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
          <div className="w-full px-5 py-10 flex flex-row justify-between items-center">
            <div>
              <h1 className="text-gray-400">Bienvenido</h1>
              <h1 className="text-white text-lg font-semibold">
                {session.user.name}
              </h1>
            </div>
            <img
              src={`${session.user.image}`}
              alt="Avatar"
              className="rounded-full w-12 h-12 shadow-gray-300"
            />
          </div>

          <div className=" px-10">
            <div className="w-full h-40 p-4 rounded-3xl bg-gradient-to-br from-indigo-600/80 to-pink-600 text-gray-50/20">
              Avalieve Balance
            </div>
          </div>
          <div className={` p-5 -mt-36 ${number.className} `}>
            <div className="w-full p-5 rounded-3xl bg-gray-500/10 backdrop-blur-xl ">
              <h1>Balance disponible</h1>
              <h1 className="text-2xl tracking-wider mt-2 mb-8">
                $<span className="">20150.00</span>
              </h1>
              <h1 className="tracking-[0.2em]">**** **** **** 7856</h1>
              <h1 className="">01/05</h1>
            </div>
          </div>

          <div className="p-5 text-gray-400 flex flex-row justify-between items-center">
            <div className="flex flex-col items-center">
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
                    d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              </div>
              <div className=""> Add </div>
            </div>
            <div className="flex flex-col items-center">
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
                    d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z"
                  />
                </svg>
              </div>
              <div className=""> Category </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 flex items-center justify-center  rounded-full bg-black/20 mb-2">
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
                    d="M6 13.5V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 9.75V10.5"
                  />
                </svg>
              </div>
              <div className=""> Balance </div>
            </div>
            <div className="flex flex-col items-center">
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

          <div className=" p-5 ">
            <h1 className="font-semibold mb-5">Ultimas Transacciones</h1>
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
