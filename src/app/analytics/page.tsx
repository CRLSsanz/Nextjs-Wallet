"use client";
import { useGetUsersQuery } from "@/redux/services/userApi";
import { Montserrat } from "next/font/google";

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
