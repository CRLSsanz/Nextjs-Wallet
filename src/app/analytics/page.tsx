"use client";
import { useGetUsersQuery } from "@/redux/services/userApi";
import { Montserrat } from "next/font/google";

const inter = Montserrat({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "600", "700"],
});

const AnalyticsPage = () => {
  const { data, error, isLoading, isFetching } = useGetUsersQuery(null);

  if (isLoading || isFetching) return <p>Cargando...</p>;
  if (error) return <p>Some Error</p>;

  return (
    <section className={inter.className}>
      <div className="min-h-screen">
        <div className=" p-5 pb-10 text-gray-200 border-b border-gray-500">
          <div className="flex flex-row justify-between mb-10">
            <h1 className="text-5xl font-thin -tracking-wider">Analisis</h1>
            <h1 className="text-5xl font-thin -tracking-wider">2024</h1>
          </div>

          <div className="w-full flex flex-col items-center mb-5">
            <h1 className="text-xs uppercase">Saldo Actual</h1>
            <h1 className="flex justify-center text-4xl text-green-400">
              <span className="text-sm pt-1 mr-1">$ </span>
              48,002.50
            </h1>
          </div>

          <div className="flex flex-row">
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
