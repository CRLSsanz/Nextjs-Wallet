"use client";

import Count from "@/components/Count";
import UserList from "@/components/UserList";
import { useGetUsersQuery } from "@/redux/services/userApi";
import LoginPage from "./login/page";
import Loader from "@/components/Loader";
import { useSession } from "next-auth/react";
import { Barlow, Jost, Montserrat, Outfit, Poiret_One } from "next/font/google";
import Link from "next/link";
import { useAppSelector } from "@/redux/hooks";
import { useGetWalletQuery } from "@/redux/services/walletApi";

const number = Jost({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});
const titulo = Poiret_One({
  subsets: ["latin"],
  weight: ["400"],
});

export default function Home() {
  const {
    data: wallet,
    error,
    isLoading,
    isFetching,
  } = useGetWalletQuery(null);
  const { data: session } = useSession();

  //const wallet = useAppSelector((state) => state.wallet);
  //console.log(wallet.slice(0, 5)); // MUESTRA LOS 5 PRIMEROS REGISTROS

  /* 
  // arreglo inicial (en orden aleatorio)
    var aNumeros=[1, 6, 5, 8, 7, 9, 12, 10];

    // impresion de arreglo inicial
    console.log("aNumeros: " + aNumeros.toString());

    // arreglo ordenado usando function nativas de js
    var arrOrdenado = aNumeros.sort(function(a, b){return a - b});

    // impresion de arr ordenado
    console.log("arrOrdenado: " + arrOrdenado.toString());                
    // uso de la function slice luego del ordenamiento para cortar 

    var aNuevo = arrOrdenado.slice(arrOrdenado.length-5)                
    // impresion del arr que requieres...
    console.log("aNuevo: " + aNuevo.toString());                
    // fin de function ready de jQuery  
  */
  //top2 = array.sort(({ 4: a }, { 4: b }) => b - a).slice(0, 2);
  //var top2 = arr.sort((a, b) => b[4] - a[4]).slice(0, 2);. –
  //var top2 = arr.sort((a, b) => b[4] - a[4]).slice(0, x);

  if (isLoading || isFetching)
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  if (error)
    if ("status" in error) {
      const errMsg =
        "error" in error ? error.error : JSON.stringify(error.data);
      return (
        <div className="max-w-[600px] h-screen flex items-center justify-center">
          <p className="text-white text-lg text-center">
            An error has occurred: {JSON.stringify(error.data)}
          </p>
          <p className="text-white text-lg text-center">Some Error: {errMsg}</p>
        </div>
      );
    }
  // INCOME - EXPENSE del array general WALLET
  const balanceGeneral = (wallet: any) => {
    let totalExpense = 0;
    wallet.forEach(function (value: any) {
      if (value.type === "Expense") totalExpense += value.total;
    });

    let totalIncome = 0;
    wallet.forEach(function (value: any) {
      if (value.type === "Income") totalIncome += value.total;
    });

    //if (totalIncome <= totalExpense) return 0;
    const balance = totalIncome - totalExpense;
    //console.log(totalIncome + " " + totalExpense + " " + balance.toFixed(0));
    return balance.toFixed(2);
  };

  // FILTAR DATOS POR YEAR - retorna un balanceGeneral por year
  const filterData = (byYear: string) => {
    let data = wallet;

    if (byYear) {
      data = data.filter(
        (item: any) =>
          item.date >= `${byYear}-01-01` && item.date <= `${byYear}-12-32`
      );
    }

    let total = balanceGeneral(data);

    return Number(total);
  };

  // AGRUPAR POR YEAR - MONTHS
  const groupByYear = wallet.reduce((accum: any, value: any) => {
    const [year, month] = value["date"].split("-");

    //Buscas el año, si no está en el resultado lo creas
    let existingYear = accum.find((x: any) => x.year === year);
    if (!existingYear) {
      accum.push({ year, months: [] });
      existingYear = accum.find((x: any) => x.year === year);
    }
    /*
    //ahora, dentro de ese año buscas el mes... si no está, lo creas
    const existingMonth = existingYear.months.find(
      (x: any) => x.month === month
    );
    if (existingMonth) {
      existingMonth.data.push(value);
    } else {
      existingYear.months.push({ month, data: [value] }); //Ya con el dato insertado
      //existingYear.months.push({ month }); //Ya con el dato insertado
    }
*/
    return accum;
  }, []);
  //console.log(groupByYear);

  // NAME THE MONTHS
  const MonthName = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  return (
    <main className="">
      {!session?.user ? (
        <LoginPage />
      ) : (
        <div className="flex flex-col text-white">
          <div className="h-[calc(66.667vh)] w-full flex flex-col justify-between p-5 border-b border-gray-500/50">
            {/** BOTON Y FOTO */}
            <div>
              <div className="hidden xflex flex-row">
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
              <div className="flex flex-row items-center gap-3">
                <img
                  src={`${session.user.image}`}
                  alt="Avatar"
                  className="rounded-full w-10 h-10 border-2 border-gray-300"
                />
                <div>
                  <h1 className=" ">Hola {session.user.name} </h1>
                  <h1
                    className={`hidden -mt-1 text-base Xtext-teal-500 ${titulo.className} `}
                  >
                    Let{`'`}s complete text-base 1234567890
                  </h1>
                </div>
              </div>
            </div>
            {/** ULTIMAS TRANSACCIONES */}
            <div className={`px-5 Xbg-black/50`}>
              <div className="flex flex-row justify-between mb-2">
                <h1 className="Xtext-cyan-400">Mas recientes</h1>
                <Link
                  href={"/history"}
                  className="Xborder-b text-cyan-400 flex flex-row items-center"
                >
                  <h1>Ver todo</h1>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
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

              {wallet.slice(0, 3).map((item: any, index: any) => (
                <div
                  key={index}
                  className={` bg-gray-800/80 rounded-sm py-2 px-4 flex flex-row items-center mb-2 `}
                >
                  <div className="">
                    <div className="w-8 h-8 flex justify-center items-center bg-gradient-to-br from-purple-700 to-pink-500 rounded-lg">
                      <img
                        src={`./images/category/${item.category}.png`}
                        className={`w-6 h-6 rounded-full `}
                        alt={item.category}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col w-full ml-3">
                    <h1>{item.category}</h1>
                    <span className="text-xs text-gray-400 -mt-1">
                      <span className={`${number.className}`}>
                        {item.date.substr(8, 2)}
                      </span>
                      {" de " +
                        MonthName[Number(item.date.substr(5, 2)) - 1] +
                        " de "}
                      <span className={`${number.className}`}>
                        {item.date.substr(0, 4)}
                      </span>
                    </span>
                  </div>
                  <div className={`whitespace-nowrap ${number.className}`}>
                    $ {item.total.toFixed(0)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/** BUTTON = ITEM ADD - ANALYTICS - HISTORY - CATEGORY */}
          <div className="hidden p-5 text-gray-200 xflex flex-row justify-between items-center mb-5">
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
                href={session?.user ? "/category#list" : "#"}
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

          {/** PRESUPUESTO GENERAL*/}
          <div
            className={`min-h-[calc(33.333vh)] bg-[#25282F]/50 flex flex-row justify-between ${number.className} `}
          >
            <div className="pt-5">
              <h1 className="px-10 uppercase tracking-widest text-xs text-center font-semibold text-gray-300 mb-2">
                Presupuesto General
              </h1>
              <h1 className="text-center text-white text-4xl mb-5">
                {Number(balanceGeneral(wallet)).toFixed(0)}
              </h1>
            </div>

            <div className="pt-5 Xborder-l-2 Xborder-gray-500/50">
              {groupByYear.map((item: any, index: any) => (
                <div
                  key={index}
                  className="relative py-2 px-5 w-full flex flex-row justify-between items-center  "
                >
                  <div className="absolute top-4 left-0 w-2 h-2 border-b-2 border-gray-500/50 ">
                    {}
                  </div>
                  <div className="flex flex-col mr-10">
                    <span className="text-gray-200">{item.year} </span>
                    <span className="text-gray-400 -mt-1 text-xs">
                      Balance{" "}
                    </span>
                  </div>
                  <h1
                    className={`text-xl whitespace-nowrap ${
                      filterData(item.year) < 0
                        ? "text-yellow-500"
                        : "text-gray-200"
                    } `}
                  >
                    {filterData(item.year).toFixed(0)} $
                  </h1>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="hidden h-screen pt-20 px-5">
        <Count />

        <UserList />
      </div>
    </main>
  );
}
