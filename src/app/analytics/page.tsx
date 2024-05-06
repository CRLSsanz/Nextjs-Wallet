"use client";
import { useGetUsersQuery } from "@/redux/services/userApi";
import { Montserrat } from "next/font/google";
import Link from "next/link";
import { useSession } from "next-auth/react";

const inter = Montserrat({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "600", "700"],
});

const bd = [
  {
    category: "Celular",
    total: 310,
    items: 2,
  },
  {
    category: "Restaurante",
    total: 150,
    items: 13,
  },
  {
    category: "Propina",
    total: 50.9,
    items: 4,
  },
  {
    category: "Alimentos y bebidas",
    total: 89,
    items: 4,
  },
  {
    category: "Cine",
    total: 2,
    items: 8,
  },
  {
    category: "Mascota",
    total: 2,
    items: 1,
  },
];

const barsColor = [
  "bg-red-700",
  "bg-orange-700",
  "bg-pink-700",
  "bg-purple-700",
  "bg-indigo-700",
  "bg-blue-700",
  "bg-cyan-700",
  "bg-teal-700",
];

const AnalyticsPage = () => {
  const { data, error, isLoading, isFetching } = useGetUsersQuery(null);
  const { data: session } = useSession();

  if (isLoading || isFetching) return <p>Cargando...</p>;
  if (error) return <p>Some Error</p>;

  return (
    <section className={inter.className}>
      <div className="min-h-screen text-white">
        <div className="w-full p-5 text-white flex flex-row justify-between items-center mb-5">
          <div className="flex flex-row items-center">
            <Link href={"/"} className="mr-5">
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
            </Link>
            <div className="h-12 flex flex-col justify-end ">
              <h1 className="text-sm text-gray-400">Welcome back</h1>
              <h1 className="-mt-1 text-gray-200 font-medium">
                {session?.user && session.user.name}
              </h1>
            </div>
          </div>
          <div className="flex flex-row items-center gap-3">
            <Link href={session?.user ? "/history" : "#"}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-7 h-7 active:animate-ping hover:scale-110 Xhover:mt-2"
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
            <Link href={session?.user ? "/category#list" : "#"} hidden>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-7 h-7 active:animate-ping hover:scale-110 Xhover:mt-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z"
                />
              </svg>
            </Link>
          </div>
        </div>

        {/** PRESUPUESTO INCOME EXPENSES*/}
        <div className=" px-5 mb-5">
          {/** RESUMEN*/}
          <div className="Xh-64 px-5 py-10 pb-20 bg-gray-500/50 rounded-3xl">
            <div className="w-full flex flex-row justify-between items-center mb-2">
              <h1 className="text-gray-200">Balance General</h1>
              <h1 className="text-white text-lg">$ 5950.00</h1>
            </div>
            <div className="w-full flex flex-row justify-between items-center mb-2">
              <h1 className="text-gray-400">Balance anual 2024</h1>
              <h1 className="text-white text-lg">$ 3950.00</h1>
            </div>
            <div className="w-full flex flex-row justify-between items-center">
              <h1 className="text-gray-400">Balance anual 2023</h1>
              <h1 className="text-white text-lg">$ 1950.00</h1>
            </div>
          </div>

          <div className="mx-4 -mt-16 rounded-2xl bg-gray-900 border border-gray-500/30">
            {/** BALANCE */}
            <div className="py-10 flex flex-col items-center justify-center">
              <h1 className="text-5xl font-thin -tracking-wider mb-5">
                {" 2004 "}
              </h1>
              <div className="flex flex-col justify-center">
                <h1 className="text-center">Total Balance Anual</h1>
                <h1 className="text-green-600 flex justify-center tracking-wider mb-2">
                  <span className="mt-0.5 text-xl"> $ </span>
                  <span className="text-4xl font-light"> 55,590.00 </span>
                </h1>
              </div>
            </div>
            {/** INCOME EXPENCES */}
            <div className=" px-3 pb-10 text-gray-200">
              <div className="flex flex-row justify-between">
                <div className="flex flex-row items-center">
                  <div className="w-8 h-8 flex items-center justify-center bg-gray-900/70 text-indigo-600 -rotate-90 rounded-md">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                      />
                    </svg>
                  </div>
                  <div className="ml-1">
                    <h1 className="text-sm ">Ingresos</h1>
                    <h1 className="flex text-lg text-white">
                      <span className="text-sm pt-0.5 mr-1">$ </span>
                      36000.00
                    </h1>
                  </div>
                </div>

                <div className="flex flex-row items-center">
                  <div className="text-end mr-1">
                    <h1 className="text-sm ">Gastos</h1>
                    <h1 className="flex text-lg text-white">
                      <span className="text-sm pt-0.5 mr-1">$ </span>
                      12900.00
                    </h1>
                  </div>
                  <div className="w-8 h-8 flex items-center justify-center bg-gray-900/70 text-pink-600 rotate-90 rounded-md">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/** GRAFICA */}
        <div className="p-5 mb-5">
          <div className="h-60 border border-gray-500/50 rounded-3xl"> </div>
        </div>
        {/** GRID de 4 */}
        <div className="hidden mx-auto w-[336px] xgrid grid-cols-2 gap-4 items-center py-10">
          <div className="hidden bg-gray-800/50 px-4 py-8 rounded-lg border border-gray-600">
            <h1 className="h-1 w-4/5 bg-indigo-600 mb-5"></h1>
            <h1 className="text-sm ">Income</h1>
            <h1 className="flex text-xl  font-medium">
              <span className="text-sm pt-1 mr-1">$</span>
              5,000.00
            </h1>
          </div>

          <div className=" w-40 h-40 bg-gray-800/50 pl-4 py-8 rounded-lg rounded-tl-[150px] border border-gray-600 flex flex-col justify-end items-center">
            <h1 className="text-sm ">Income</h1>
            <h1 className="flex text-xl  font-medium">
              <span className="text-sm pt-1 mr-1">$</span>
              5,000.00
            </h1>
          </div>

          <div className=" w-40 h-40 bg-gray-800/50 pr-4 py-8 rounded-lg rounded-tr-[150px] border-8 border-pink-600 shadow-lg shadow-pink-600 flex flex-col justify-end items-center">
            <h1 className="text-sm ">Expenses</h1>
            <h1 className="flex text-xl font-medium">
              <span className="text-sm pt-1 mr-1">$ </span>
              3,900.50
            </h1>
          </div>

          <div className=" w-40 h-40 bg-gray-800/50 pl-4 py-8 rounded-lg rounded-bl-[150px] border border-gray-600 flex flex-col Xjustify-end items-center">
            <h1 className="text-sm mb-5">Transacciones</h1>
            <h1 className="flex text-xl font-medium">{bd.length}</h1>
          </div>

          <div className=" w-40 h-40 bg-gray-800/50 pr-4 py-8 rounded-lg rounded-br-[150px] border border-gray-600 flex flex-col Xjustify-end items-center">
            <h1 className="text-sm mb-5">Categorias</h1>
            <h1 className="text-xl font-medium">07</h1>
          </div>
        </div>

        {/** LIST FOR CATEGORY */}
        <div className="bg-black/50 xmx-5 Xrounded-3xl">
          <div className="px-5 py-7 flex flex-row items-center justify-between Xborder-b Xborder-gray-500/30 ">
            <h1 className="h-12 text-teal-500 font-medium flex place-items-center">
              Resumen por categorias
            </h1>
            <h1 className="bg-teal-500 text-white whitespace-nowrap rounded-full px-5 py-2 ">
              septiembre
            </h1>
          </div>
          {bd.map((item, index) => (
            <div
              key={index}
              className="flex flex-row items-center justify-between px-5 py-2 Xbg-white/5 text-white Xborder-t border-gray-500/20"
            >
              <img
                src={`./images/category/${item.category}.png`}
                alt="image"
                className="w-14 h-14 opacity-100 rounded-lg bg-gray-600/50 p-2"
              />
              <div className="w-full ml-4">
                <div className="flex flex-row justify-between">
                  <div>
                    <h1 className="font-medium">{item.category}</h1>
                    <h1 className="text-xs text-gray-400 mb-1">
                      {item.items} transacciones
                    </h1>
                  </div>
                  <h1 className="">
                    <span className="">$</span> {item.total.toFixed(2)}
                  </h1>
                </div>
                <div className="w-full h-1 bg-gray-500/10 rounded-full">
                  <h1
                    className={` w-40 h-1 ${barsColor[index]}  rounded-full `}
                  >
                    {" "}
                  </h1>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full p-5 py-10 grid grid-cols-2 lg:grid-cols-4 gap-5">
        {data?.map((user) => (
          <div key={user.id} className="p-3 py-6 bg-gray-200">
            <p>{user.name}</p>
            <p>{user.username}</p>
            <p className="text-xs">{user.email}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AnalyticsPage;
