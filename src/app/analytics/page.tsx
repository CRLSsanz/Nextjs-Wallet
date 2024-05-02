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
            <h1 className="text-gray-400">Balance General</h1>
            <h1 className="text-white text-xl">$ 1950.00</h1>
          </div>
          <h1 className="text-5xl font-thin -tracking-wider"> {`<2024>`} </h1>
        </div>

        <div className="w-full px-5 text-center">
          <h1 className="text-gray-400">Total Balance Anual</h1>
          <h1 className="text-white text-5xl">$ 164000.00</h1>
          <h1 className="hidden text-white text-lg"> $850.00 | $691.00 </h1>
        </div>

        {/** INCOME EXPENCES */}
        <div className=" p-5 text-gray-200">
          <div className="flex flex-row">
            <div className="w-1/2 flex flex-row items-center justify-end border-r border-gray-500/30">
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
              <div className="px-3">
                <h1 className="text-sm text-end">Income</h1>
                <h1 className="flex text-lg text-white font-medium">
                  <span className="text-sm pt-1 mr-1">$ </span>
                  850.000.00
                </h1>
              </div>
            </div>

            <div className="w-1/2 flex flex-row items-center">
              <div className="px-3">
                <h1 className="text-sm ">Expenses</h1>
                <h1 className="flex text-lg text-white font-medium">
                  <span className="text-sm pt-1 mr-1">$ </span>
                  691.000.00
                </h1>
              </div>
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
            </div>
          </div>
        </div>

        <div className="flex h-60 border border-gray-500/30 mx-2 mb-10"> </div>

        {/** GRID de 4 */}
        <div className="hidden mx-auto w-[336px] xgrid grid-cols-2 gap-4 items-center ">
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

        <h1 className="text-white text-lg p-5 ">Resumen por categorias</h1>
        <div className="bg-gray-800/50 mx-2 rounded-lg">
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
                className="flex flex-row items-center justify-between p-5 Xbg-white/5 text-white Xborder-t border-gray-500/20"
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
                        5 transacciones
                      </h1>
                    </div>
                    <h1 className="">
                      <span className="">$</span> {item.total.toFixed(2)}
                    </h1>
                  </div>
                  <div className="w-full h-2.5 bg-gray-500/10 rounded-full">
                    <h1 className="w-60 h-2.5 bg-gradient-to-r from-pink-700 to-red-500 rounded-full">
                      {" "}
                    </h1>
                  </div>
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
