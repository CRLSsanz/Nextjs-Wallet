"use client";
import { useGetUsersQuery } from "@/redux/services/userApi";
import { Montserrat } from "next/font/google";
import Link from "next/link";

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

const AnalyticsPage = () => {
  const { data, error, isLoading, isFetching } = useGetUsersQuery(null);

  if (isLoading || isFetching) return <p>Cargando...</p>;
  if (error) return <p>Some Error</p>;

  return (
    <section className={inter.className}>
      <div className="min-h-screen text-white">
        <div className="w-full px-5 py-10 flex flex-row justify-between items-center">
          <div>
            <h1 className="text-gray-400">Detalle Mensual</h1>
            <h1 className="text-white text-xl"> {" < Marzo > "} </h1>
          </div>
          <h1 className="text-5xl font-thin -tracking-wider">2024</h1>
        </div>

        <div className="mx-2 py-5 rounded-xl border border-gray-500/30 mb-5">
          {/** BALANCE */}
          <div className="py-5 flex flex-row items-center justify-center">
            <div className="mr-10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-16 h-16"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7.5 3.75H6A2.25 2.25 0 0 0 3.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0 1 20.25 6v1.5m0 9V18A2.25 2.25 0 0 1 18 20.25h-1.5m-9 0H6A2.25 2.25 0 0 1 3.75 18v-1.5M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
            </div>

            <div className="flex flex-col justify-center">
              <h1 className="text-center">Balance</h1>
              <h1 className="text-green-600 flex justify-center tracking-wider mb-2">
                <span className="mt-0.5 text-xl"> $ </span>
                <span className="text-4xl font-light"> 1359.00 </span>
              </h1>
            </div>
          </div>
          {/** INCOME EXPENCES */}
          <div className=" p-5 text-gray-200">
            <div className="flex flex-row">
              <div className="w-1/2 flex flex-row items-center">
                <div className="w-8 h-8 flex items-center justify-center bg-gray-800/50 text-indigo-600 -rotate-45 rounded-md">
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
                <div className="ml-3">
                  <h1 className="text-sm ">Income</h1>
                  <h1 className="flex text-lg text-white font-medium">
                    <span className="text-sm pt-1 mr-1">$ </span>
                    180,000.00
                  </h1>
                </div>
              </div>

              <div className="w-1/2 flex flex-row items-center">
                <div className="w-8 h-8 flex items-center justify-center bg-gray-700/50 text-pink-600 rotate-45 rounded-md">
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
                <div className="ml-3">
                  <h1 className="text-sm ">Expenses</h1>
                  <h1 className="flex text-lg text-white font-medium">
                    <span className="text-sm pt-1 mr-1">$ </span>
                    68,982.57
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl px-3 mx-2 flex flex-row justify-between items-center text-white font-medium bg-gradient-to-r from-indigo-600 to-pink-600 mb-3">
          <div className=" py-5 Xtext-lg Xfont-light ">
            Transacciones
            <span className=""> ({bd.length} items) </span>
          </div>

          <Link
            href="/form"
            className={`w-10 h-10 flex items-center justify-center cursor-pointer active:animate-ping bg-gray-800/50 rounded-lg `}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5 "
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </Link>
        </div>

        <div className="w-full px-5 py-10 flex flex-row justify-between items-center">
          <div>
            <h1 className="text-gray-400">Total Balance</h1>
            <h1 className="text-white text-xl">$3900.00</h1>
          </div>
          <h1 className="text-5xl font-thin -tracking-wider">2024</h1>
        </div>

        <div className="w-full px-5 flex flex-row justify-between items-center">
          <h1 className="text-gray-400">Balance ano actual</h1>
          <h1 className="text-white text-lg">$2300.00</h1>
        </div>
        <div className="w-full px-5 flex flex-row justify-between items-center">
          <h1 className="text-gray-400">Balance mes actual</h1>
          <h1 className="text-white text-lg">$300.00</h1>
        </div>

        <div className=" p-5 pb-10 text-gray-200 border-b border-gray-500">
          <div className="flex flex-row justify-between mb-10">
            <h1 className="text-5xl font-thin -tracking-wider">Analisis</h1>
            <h1 className="text-5xl font-thin -tracking-wider">2024</h1>
          </div>

          <div className="flex flex-row mb-5">
            <div className="w-1/2">
              <h1 className="text-sm uppercase">Expenses</h1>
              <h1 className="flex text-xl">
                <span className="text-sm pt-1 mr-1">$ </span>68,982.57
              </h1>
              <h1 className="h-2 bg-gradient-to-r from-pink-600 to-purple-600">
                {" "}
              </h1>
            </div>

            <div className="w-1/2">
              <h1 className="text-end text-sm uppercase">Income</h1>
              <h1 className="flex justify-end text-xl">
                <span className="text-sm pt-1 mr-1">$</span>180,000.00
              </h1>
              <h1 className="h-2 bg-gradient-to-r from-purple-600 to-cyan-600">
                {" "}
              </h1>
            </div>
          </div>

          <div className="w-full flex flex-col items-end mb-5">
            <h1 className="text-sm uppercase">Saldo Actual</h1>
            <h1 className="flex justify-center text-4xl text-green-400">
              <span className="text-sm pt-1 mr-1">$ </span>
              48,002.50
            </h1>
          </div>
        </div>

        {/** GRID de 4 */}
        <div className="px-5 grid grid-cols-2 gap-4 ">
          <div className="hidden bg-gray-800/50 px-4 py-8 rounded-lg border border-gray-600">
            <h1 className="h-1 w-4/5 bg-indigo-600 mb-5"></h1>
            <h1 className="text-sm ">Income</h1>
            <h1 className="flex text-xl  font-medium">
              <span className="text-sm pt-1 mr-1">$</span>
              5,000.00
            </h1>
          </div>

          <div className=" bg-gray-800/50 pl-4 py-8 rounded-lg rounded-tl-[120px] border border-gray-600 flex flex-col justify-end items-center">
            <h1 className="text-sm ">Income</h1>
            <h1 className="flex text-xl  font-medium">
              <span className="text-sm pt-1 mr-1">$</span>
              5,000.00
            </h1>
          </div>

          <div className=" bg-gray-800/50 pr-4 py-8 rounded-lg rounded-tr-[120px] border-8 border-pink-600 shadow-lg shadow-pink-600 flex flex-col justify-end items-center">
            <h1 className="text-sm ">Expenses</h1>
            <h1 className="flex text-xl font-medium">
              <span className="text-sm pt-1 mr-1">$ </span>
              3,900.50
            </h1>
          </div>

          <div className=" bg-gray-800/50 pl-4 py-8 rounded-lg rounded-bl-[120px] border border-gray-600 flex flex-col justify-end items-center">
            <h1 className="text-sm ">Transacciones</h1>
            <h1 className="flex text-xl font-medium">{bd.length}</h1>
          </div>

          <div className=" bg-gray-800/50 pr-4 py-8 rounded-lg rounded-br-[120px] border border-gray-600 flex flex-col justify-end items-center">
            <h1 className="text-sm ">Categorias</h1>
            <h1 className="text-xl font-medium">07</h1>
          </div>
        </div>

        <h1 className="text-gray-200 text-lg mb-5 p-5">
          Resumen por categorias
        </h1>
        <div className="flex flex-wrap Xgrid Xgrid-cols-3 px-2 gap-2">
          {bd.map((item, index) => (
            <>
              <div
                key={index}
                className="hidden Xflex flex-col justify-between text-sm p-3 bg-white/5 text-gray-300 rounded-3xl border border-gray-600"
              >
                <div className="mb-5">
                  <h1 className="text-lg text-white">
                    <span className="text-sm">$</span> {item.total.toFixed(2)}
                  </h1>
                  <h1 className="text-xs">{item.category}</h1>
                </div>
                <img
                  src={`./images/category/${item.category}.png`}
                  alt="image"
                  className="-ml-3 w-14 opacity-30"
                />
              </div>

              <div
                key={index}
                className="hidden relative Xflex flex-col justify-between p-5 Xbg-white/5 text-gray-300 rounded-3xl Xborder Xborder-gray-600"
              >
                <img
                  src={`./images/category/${item.category}.png`}
                  alt="image"
                  className="absolute top-3 -left-3 -ml-3 w-10 opacity-30"
                />
                <div className="flex flex-row justify-between">
                  <h1 className="text-base">{item.category}</h1>
                  <h1 className="text-lg text-white">
                    <span className="text-sm">$</span> {item.total.toFixed(2)}
                  </h1>
                </div>
                <div className="w-full h-2 bg-gray-500">
                  <h1 className="w-60 h-2 bg-red-500"> </h1>
                </div>
              </div>

              <div
                key={index}
                className="px-3 py-2 bg-pink bg-cyan-600 text-white rounded-lg "
              >
                <div className="">
                  <span className="text-base mr-2">{item.category} </span>
                  <span className="text-sm">-$</span> {item.total.toFixed(2)}
                </div>
                <div className="hidden h-1 bg-gray-500">
                  <h1 className="h-1 bg-red-500"> </h1>
                </div>
              </div>
            </>
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
