"use client";
import { useGetUsersQuery } from "@/redux/services/userApi";
import {
  Albert_Sans,
  Barlow,
  Comfortaa,
  Jost,
  Lato,
  Montserrat,
  Outfit,
  Plus_Jakarta_Sans,
  Reddit_Mono,
  Roboto,
  Rubik,
  Urbanist,
} from "next/font/google";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import {
  filterByYear,
  filterByMonth,
  filterByType,
} from "@/redux/features/filterAnalyticsSlice";
import Reddit from "next-auth/providers/reddit";

const number = Jost({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  //weight: ["400"], // Poiret_One
});
const albert_Sans = Albert_Sans({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});
const barlow = Barlow({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});
const comfortaa = Comfortaa({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});
const jost = Jost({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});
const lato = Lato({
  subsets: ["latin"],
  weight: ["400"],
});
const outfit = Outfit({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});
const plus_Jakarta_Sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
});
const reddit_Mono = Reddit_Mono({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
});
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400"],
});
const rubik = Rubik({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});
const urbanist = Urbanist({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

const barsColor = [
  "bg-green-500",
  "bg-cyan-500",
  "bg-purple-500",
  "bg-red-500",
  "bg-yellow-500",
  "bg-indigo-500",
  "bg-pink-500",

  "bg-green-500",
  "bg-cyan-500",
  "bg-purple-500",
  "bg-red-500",
  "bg-yellow-500",
  "bg-indigo-500",
  "bg-pink-500",
];
const circleColor = [
  "to-green-500/50",
  "to-cyan-500/50",
  "to-purple-500/50",
  "to-red-500/50",
  "to-yellow-500/50",
  "to-indigo-500/50",
  "to-pink-500/50",

  "to-green-500",
  "to-cyan-500",
  "to-purple-500",
  "to-red-500",
  "to-yellow-500",
  "to-indigo-500",
  "to-pink-500",
];

const AnalyticsPage = () => {
  const [show, setShow] = useState(true);
  const { data, error, isLoading, isFetching } = useGetUsersQuery(null);
  const { data: session } = useSession();
  const wallet = useAppSelector((state) => state.wallet);
  const dispatch = useAppDispatch();
  const { byYear, byMonth } = useAppSelector((state) => state.filterAnalytics);

  if (isLoading || isFetching)
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <p className="text-white text-lg">Cargando...</p>
      </div>
    );

  if (error)
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <p className="text-white text-lg">Some Error</p>
      </div>
    );

  /** BALANCE GENERAL */
  const BalanceGeneral = (wallet: any) => {
    let totalExpense = 0;
    wallet.forEach(function (value: any) {
      if (value.type === "Expense") totalExpense += value.total;
    });

    let totalIncome = 0;
    wallet.forEach(function (value: any) {
      if (value.type === "Income") totalIncome += value.total;
    });

    if (totalIncome <= totalExpense) return 0;
    const balance = totalIncome - totalExpense;
    //console.log(totalIncome + " " + totalExpense + " " + balance.toFixed(0));
    return balance.toFixed(2);
  };
  const transformData = (byYear: string) => {
    let data = wallet;

    if (byYear) {
      data = data.filter(
        (item) =>
          item.date >= `${byYear}-01-01` && item.date <= `${byYear}-12-32`
      );
    }

    let total = BalanceGeneral(data);

    return Number(total);
  };

  // BALANCE ANUAL
  const transformData2 = (byYear: string) => {
    let data = wallet;

    if (byYear) {
      data = data.filter(
        (item) =>
          item.date >= `${byYear}-01-01` && item.date <= `${byYear}-12-32`
      );
    }
    return data;
  };

  const totalExpense = () => {
    let total = 0;
    filterByYearMonth("Expense").forEach(function (value: any) {
      if (value.type === "Expense") total += value.total;
    });
    return total;
  };

  const totalIncome = () => {
    let total = 0;
    filterByYearMonth("Income").forEach(function (value: any) {
      if (value.type === "Income") total += value.total;
    });
    return total;
  };

  // WALLET FILTRADO
  const filterByYearMonth = (byType: string) => {
    let data = wallet;

    if (byYear) {
      data = data.filter(
        (item) =>
          item.date >= `${byYear}-01-01` && item.date <= `${byYear}-12-32`
      );
    }

    if (byMonth) {
      data = data.filter(
        (item) =>
          item.date >= `${byYear}-${byMonth}-01` &&
          item.date < `${byYear}-${byMonth}-32`
      );
    }

    if (byType) {
      data = data.filter((item) => item.type === byType);
    }

    return data;
  };

  // DATOS POR CATEGORIAS
  const dataCategoryX = filterByYearMonth("Expense").reduce(
    (prev: any, cur) => (
      (prev[cur.category] = prev[cur.category] + cur.total || cur.total), prev
    ),
    {}
  );
  const dataCategory = filterByYearMonth("Expense").reduce(
    (acum: any, item) => {
      return !acum[item.category]
        ? { ...acum, [item.category]: item.total, ["count"]: 1 }
        : {
            ...acum,
            [item.category]: acum[item.category] + item.total,
          };
    },
    []
  );
  //console.log(dataCategory);

  // CREAR NUEVO ARRAY - PIDE UNS LISTA: WALLET
  function groupByCategory(array: any) {
    return array.reduce((acc: any, current: any) => {
      const foundItem = acc.find((it: any) => it.category === current.category);

      if (foundItem) {
        foundItem.count = foundItem.count + 1;
        foundItem.total = foundItem.total + current.total;
      } else {
        acc.push({
          type: current.type,
          category: current.category,
          total: current.total,
          count: 1,
          //'nombre': current.nombre,
          //'data': [{ 'fecha': current.fecha, 'observacion': current.observacion }]
        });
      }
      return acc;
    }, []);
  }
  //console.log(groupByCategory(filterByYearMonth()));

  // MAYOR VALOR TOTAL - ARRAY ORDENADOS POR TOTAL
  const progress = (num: number, type: string) => {
    // MAYOR VALOR TOTAL - ARRAY ORDENADOS POR TOTAL
    const resultadosOrdenados = groupByCategory(filterByYearMonth(type)).sort(
      (a: any, b: any) => {
        return Number.parseInt(b.total) - Number.parseInt(a.total);
      }
    );
    //console.log("Array Ordenado: ", resultadosOrdenados);
    //console.log("Mayor Valor: ", resultadosOrdenados[0]);

    const valor = (num * 100) / resultadosOrdenados[0].total;
    //console.log(num, valor);
    return valor;
  };

  return (
    <section className={""}>
      <div className="max-w-[600px] min-h-screen text-white lg:grid lg:grid-cols-2 lg:gap-5 ">
        {/** BOTON MENU Y INFO NAME - BOTONES*/}
        <div className=" hidden p-5 text-white bg-card Xflex flex-row justify-between items-center mb-5">
          <div className="flex flex-row items-center">
            <Link href={"/"} className="mr-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.0"
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
                strokeWidth="1"
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
            <Link href={session?.user ? "/category#list" : "#"}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.0"
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

        {/** GRAFICA */}
        <div className="bg-[#1B1C21]/80 h-[33.333vh] p-5 border-b border-gray-800">
          <h1 className="uppercase tracking-widest text-xs font-semibold text-gray-400 mb-7 ">
            Statement graph
          </h1>
          <div className="h-32 border border-gray-500/20 rounded-xl"> </div>
        </div>

        {/** FILTER */}
        <div className="bg-gradient-to-b from-[#1B1C21]/80 to-[#1B1C21] p-5 lg:col-span-2 lg:-mb-5 Xshadow-lg Xshadow-black/50">
          <div className="flex flex-row items-center justify-end gap-3">
            <div className="relative text-gray-300 Xborder-l Sborder-white/30 py-1.5">
              <div className="absolute pointer-events-none top-3 right-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m19.5 8.25-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </div>
              <select
                defaultValue={byMonth}
                onChange={(e) => dispatch(filterByMonth(e.target.value))}
                className="text-center focus:outline-none appearance-none bg-transparent pl-2 pr-7"
              >
                <option value="">Todo los meses</option>
                <option value="01">Enero</option>
                <option value="02">Febrero</option>
                <option value="03">Marzo</option>
                <option value="04">Abril</option>
                <option value="05">Mayo</option>
                <option value="06">Junio</option>
                <option value="07">Julio</option>
                <option value="08">Agosto</option>
                <option value="09">Septiembre</option>
                <option value="10">Octubre</option>
                <option value="11">Noviembre</option>
                <option value="12">Diciembre</option>
              </select>
            </div>

            <div className="relative text-gray-300 Cborder-l Cborder-white/30 py-1.5">
              <div className="absolute pointer-events-none top-3 right-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m19.5 8.25-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </div>
              <select
                defaultValue={byYear}
                onChange={(e) => dispatch(filterByYear(e.target.value))}
                className={`focus:outline-none appearance-none bg-transparent pl-2 pr-7 ${number.className} `}
              >
                <option value="2023">2023</option>
                <option value="2024">2024</option>
                <option value="2025">2025</option>
              </select>
            </div>
          </div>
        </div>

        {/** PRUEBA - Barlow, Jost, Outfit, Poiret_One, Rubik*/}
        <div className="hidden bg-gray-800 /20 min-h-screen py-20 px-5 text-gray-400 xflex flex-col gap-5">
          <div className={` ${albert_Sans.className} `}>
            <div className="w-full bg-gray-700/60 flex flex-row ">
              <div className="w-2/5 p-5 border-r border-gray-500/50">
                <h1 className="mb-2 text">Balance total</h1>
                <h1 className="text-4xl text-gray-100">$52.90</h1>
              </div>
              <div className="w-3/5 flex flex-col">
                <div className="flex flex-row justify-between border-b border-gray-500/50 p-5">
                  <h1 className="">Ingreso</h1>
                  <h1 className="text-cyan-500">+ $6748.0</h1>
                </div>
                <div className="flex flex-row justify-between p-5">
                  <h1 className="">Gastos</h1>
                  <h1 className="text-pink-400">- €213,95</h1>
                </div>
              </div>
            </div>
          </div>
          <div className={` ${barlow.className} `}>
            <div className="w-full bg-gray-700/60 flex flex-row ">
              <div className="w-2/5 p-5 border-r border-gray-500/50">
                <h1 className="mb-2 text">Balance total</h1>
                <h1 className="text-4xl text-gray-100">$52.90</h1>
              </div>
              <div className="w-3/5 flex flex-col">
                <div className="flex flex-row justify-between border-b border-gray-500/50 p-5">
                  <h1 className="">Ingreso</h1>
                  <h1 className="text-cyan-500">+ $6748.0</h1>
                </div>
                <div className="flex flex-row justify-between p-5">
                  <h1 className="">Gastos</h1>
                  <h1 className="text-pink-400">- €213,95</h1>
                </div>
              </div>
            </div>
          </div>
          <div className={` ${lato.className} `}>
            <div className="w-full bg-gray-700/60 flex flex-row ">
              <div className="w-2/5 p-5 border-r border-gray-500/50">
                <h1 className="mb-2 text">Balance total</h1>
                <h1 className="text-4xl text-gray-100">$52.90</h1>
              </div>
              <div className="w-3/5 flex flex-col">
                <div className="flex flex-row justify-between border-b border-gray-500/50 p-5">
                  <h1 className="">Ingreso</h1>
                  <h1 className="text-cyan-500">+ $6748.0</h1>
                </div>
                <div className="flex flex-row justify-between p-5">
                  <h1 className="">Gastos</h1>
                  <h1 className="text-pink-400">- €213,95</h1>
                </div>
              </div>
            </div>
          </div>
          <div className={` ${comfortaa.className} `}>
            <div className="w-full bg-gray-700/60 flex flex-row ">
              <div className="w-2/5 p-5 border-r border-gray-500/50">
                <h1 className="mb-2 text">Balance total</h1>
                <h1 className="text-4xl text-gray-100">$52.90</h1>
              </div>
              <div className="w-3/5 flex flex-col">
                <div className="flex flex-row justify-between border-b border-gray-500/50 p-5">
                  <h1 className="">Ingreso</h1>
                  <h1 className="text-cyan-500">+ $6748.0</h1>
                </div>
                <div className="flex flex-row justify-between p-5">
                  <h1 className="">Gastos</h1>
                  <h1 className="text-pink-400">- €213,95</h1>
                </div>
              </div>
            </div>
          </div>
          <div className={` ${jost.className} `}>
            <div className="w-full bg-gray-700/60 flex flex-row ">
              <div className="w-2/5 p-5 border-r border-gray-500/50">
                <h1 className="mb-2 text">Balance total</h1>
                <h1 className="text-4xl text-gray-100">$52.90</h1>
              </div>
              <div className="w-3/5 flex flex-col">
                <div className="flex flex-row justify-between border-b border-gray-500/50 p-5">
                  <h1 className="">Ingreso</h1>
                  <h1 className="text-cyan-500">+ $6748.0</h1>
                </div>
                <div className="flex flex-row justify-between p-5">
                  <h1 className="">Gastos</h1>
                  <h1 className="text-pink-400">- €213,95</h1>
                </div>
              </div>
            </div>
          </div>
          <br />
          <div className={` ${montserrat.className} `}>
            <div className="w-full bg-gray-700/60 flex flex-row ">
              <div className="w-2/5 p-5 border-r border-gray-500/50">
                <h1 className="mb-2 text">Balance total</h1>
                <h1 className="text-4xl text-gray-100">$52.90</h1>
              </div>
              <div className="w-3/5 flex flex-col">
                <div className="flex flex-row justify-between border-b border-gray-500/50 p-5">
                  <h1 className="">Ingreso</h1>
                  <h1 className="text-cyan-500">+ $6748.0</h1>
                </div>
                <div className="flex flex-row justify-between p-5">
                  <h1 className="">Gastos</h1>
                  <h1 className="text-pink-400">- €213,95</h1>
                </div>
              </div>
            </div>
          </div>
          <div className={` ${outfit.className} `}>
            <div className="w-full bg-gray-700/60 flex flex-row ">
              <div className="w-2/5 p-5 border-r border-gray-500/50">
                <h1 className="mb-2 text">Balance total</h1>
                <h1 className="text-4xl text-gray-100">$52.90</h1>
              </div>
              <div className="w-3/5 flex flex-col">
                <div className="flex flex-row justify-between border-b border-gray-500/50 p-5">
                  <h1 className="">Ingreso</h1>
                  <h1 className="text-cyan-500">+ $6748.0</h1>
                </div>
                <div className="flex flex-row justify-between p-5">
                  <h1 className="">Gastos</h1>
                  <h1 className="text-pink-400">- €213,95</h1>
                </div>
              </div>
            </div>
          </div>
          <div className={` ${plus_Jakarta_Sans.className} `}>
            <div className="w-full bg-gray-700/60 flex flex-row ">
              <div className="w-2/5 p-5 border-r border-gray-500/50">
                <h1 className="mb-2 text">Balance total</h1>
                <h1 className="text-4xl text-gray-100">$52.90</h1>
              </div>
              <div className="w-3/5 flex flex-col">
                <div className="flex flex-row justify-between border-b border-gray-500/50 p-5">
                  <h1 className="">Ingreso</h1>
                  <h1 className="text-cyan-500">+ $6748.0</h1>
                </div>
                <div className="flex flex-row justify-between p-5">
                  <h1 className="">Gastos</h1>
                  <h1 className="text-pink-400">- €213,95</h1>
                </div>
              </div>
            </div>
          </div>
          <div className={` ${reddit_Mono.className} `}>
            <div className="w-full bg-gray-700/60 flex flex-row ">
              <div className="w-2/5 p-5 border-r border-gray-500/50">
                <h1 className="mb-2 text">Balance total</h1>
                <h1 className="text-4xl text-gray-100">$52.90</h1>
              </div>
              <div className="w-3/5 flex flex-col">
                <div className="flex flex-row justify-between border-b border-gray-500/50 p-5">
                  <h1 className="">Ingreso</h1>
                  <h1 className="text-cyan-500">+ $6748.0</h1>
                </div>
                <div className="flex flex-row justify-between p-5">
                  <h1 className="">Gastos</h1>
                  <h1 className="text-pink-400">- €213,95</h1>
                </div>
              </div>
            </div>
          </div>
          <div className={` ${roboto.className} `}>
            <div className="w-full bg-gray-700/60 flex flex-row ">
              <div className="w-2/5 p-5 border-r border-gray-500/50">
                <h1 className="mb-2 text">Balance total</h1>
                <h1 className="text-4xl text-gray-100">$52.90</h1>
              </div>
              <div className="w-3/5 flex flex-col">
                <div className="flex flex-row justify-between border-b border-gray-500/50 p-5">
                  <h1 className="">Ingreso</h1>
                  <h1 className="text-cyan-500">+ $6748.0</h1>
                </div>
                <div className="flex flex-row justify-between p-5">
                  <h1 className="">Gastos</h1>
                  <h1 className="text-pink-400">- €213,95</h1>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div className={` ${rubik.className} `}>
            <div className="w-full bg-gray-700/60 flex flex-row ">
              <div className="w-2/5 p-5 border-r border-gray-500/50">
                <h1 className="mb-2 text">Balance total</h1>
                <h1 className="text-4xl text-gray-100">$52.90</h1>
              </div>
              <div className="w-3/5 flex flex-col">
                <div className="flex flex-row justify-between border-b border-gray-500/50 p-5">
                  <h1 className="">Ingreso</h1>
                  <h1 className="text-cyan-500">+ $6748.0</h1>
                </div>
                <div className="flex flex-row justify-between p-5">
                  <h1 className="">Gastos</h1>
                  <h1 className="text-pink-400">- €213,95</h1>
                </div>
              </div>
            </div>
          </div>
          <div className={` ${urbanist.className} `}>
            <div className="w-full bg-gray-700/60 flex flex-row ">
              <div className="w-2/5 p-5 border-r border-gray-500/50">
                <h1 className="mb-2 text">Balance total</h1>
                <h1 className="text-4xl text-gray-100">$52.90</h1>
              </div>
              <div className="w-3/5 flex flex-col">
                <div className="flex flex-row justify-between border-b border-gray-500/50 p-5">
                  <h1 className="">Ingreso</h1>
                  <h1 className="text-cyan-500">+ $6748.0</h1>
                </div>
                <div className="flex flex-row justify-between p-5">
                  <h1 className="">Gastos</h1>
                  <h1 className="text-pink-400">- €213,95</h1>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/** LIST FOR CATEGORY */}
        <div className="bg-card Xbg-[#25282F]/90 min-h-[66.667vh] lg:col-span-2 border-b border-gray-500">
          <div
            className={`mx-5 h-8 flex flex-row items-center justify-between border-b border-gray-700 mb-5 ${number.className}`}
          >
            <h1 className="uppercase text-xs tracking-wider">Ingresos</h1>
            <h1 className="whitespace-nowrap text-cyan-500">
              $ {totalIncome()} /{" "}
              <span className="text-gray-300">
                {" "}
                $ {totalIncome() - totalExpense()}{" "}
              </span>{" "}
            </h1>
          </div>
          <div className="w-full grid grid-cols-4 gap-1 lg:grid-cols-3 ">
            {groupByCategory(filterByYearMonth("Income")).map(
              (item: any, index: any) => (
                <div
                  key={index}
                  onClick={() => setShow(!show)}
                  className="xbg-card flex flex-col items-center justify-center text-gray-500 rounded-sm Xshadow-lg Xshadow-black/50"
                >
                  <div
                    className={`relative w-14 h-14 p-0.5 rounded-full mb-2 bg-gradient-to-br from-indigo-500/50
                  ${circleColor[index]}
                  `}
                  >
                    <div className="w-full h-full rounded-full bg-fondo flex items-center justify-center">
                      <img
                        src={`./images/category/${item.category}.png`}
                        alt="image"
                        className="w-8 h-8"
                      />
                    </div>
                  </div>

                  <div
                    className={` text-white flex flex-row items-center ${number.className} `}
                  >
                    <span className="text-lg font-light ">
                      {item.total.toFixed(0)}
                    </span>
                    <span className="text-sm ml-0.5"> $</span>
                  </div>

                  <div
                    hidden={show}
                    className="px-2 w-full text-xs text-center truncate"
                  >
                    {item.category}
                  </div>

                  <h1
                    hidden={show}
                    className={`text-xs mb-2
                      ${
                        item.type === "Expense"
                          ? " Xbg-pink -600"
                          : " Xbg-cyan-600"
                      }
                      ${number.className} `}
                  >
                    <span>{item.count} item</span>
                  </h1>

                  <div className="w-full flex justify-center mb-5">
                    <div className="w-16 h-2 pb-1 px-2 Xbg-fondo rounded-b-lg">
                      <div className="h-1 bg-fondo">
                        <h1
                          className={` Xw-[75%] h-1 ${
                            barsColor[index]
                          } Xrounded-full $
                      ${
                        item.type === "Expense"
                          ? " Xbg-pink-700/70 Xshadow-md Xshadow-white/50"
                          : " Xbg-cyan-600/70 Xshadow-md Xshadow-white/50"
                      } `}
                          //style={{ width: progress() }}
                          style={{
                            width: `${progress(item.total, "Income")}%`,
                          }}
                        >
                          {" "}
                        </h1>
                      </div>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>

          <div
            className={`mx-5 h-10 flex flex-row items-center justify-between border-b border-gray-700 mb-5 ${number.className}`}
          >
            <h1 className="uppercase text-xs tracking-wider">Gastos</h1>
            <h1 className="text-pink-500">$ {totalExpense()}</h1>
          </div>
          <div className="w-full grid grid-cols-4 gap-1 lg:grid-cols-3 ">
            {groupByCategory(filterByYearMonth("Expense")).map(
              (item: any, index: any) => (
                <div
                  key={index}
                  onClick={() => setShow(!show)}
                  className="xbg-card flex flex-col items-center justify-center text-gray-500 rounded-sm Xshadow-lg Xshadow-black/50"
                >
                  <div
                    className={`relative w-14 h-14 p-0.5 rounded-full mb-2 bg-gradient-to-br from-red-500/50
                  ${circleColor[index]}
                  `}
                  >
                    <div className="w-full h-full rounded-full bg-fondo flex items-center justify-center">
                      <img
                        src={`./images/category/${item.category}.png`}
                        alt="image"
                        className="w-8 h-8"
                      />
                    </div>
                  </div>

                  <div
                    className={` text-white flex flex-row items-center ${number.className} `}
                  >
                    <span className="text-lg font-light ">
                      {item.total.toFixed(0)}
                    </span>
                    <span className="text-sm ml-0.5"> $</span>
                  </div>

                  <div
                    hidden={show}
                    className="px-2 w-full text-xs text-center truncate"
                  >
                    {item.category}
                  </div>

                  <h1
                    hidden={show}
                    className={`text-xs mb-2
                      ${
                        item.type === "Expense"
                          ? " Xbg-pink -600"
                          : " Xbg-cyan-600"
                      }
                      ${number.className} `}
                  >
                    <span>{item.count} item</span>
                  </h1>

                  <div className="w-full flex justify-center mb-5">
                    <div className="w-16 h-2 pb-1 px-2 Xbg-fondo rounded-b-lg">
                      <div className="h-1 bg-fondo">
                        <h1
                          className={` Xw-[75%] h-1 ${
                            barsColor[index]
                          } Xrounded-full $
                      ${
                        item.type === "Expense"
                          ? " Xbg-pink-700/70 Xshadow-md Xshadow-white/50"
                          : " Xbg-cyan-600/70 Xshadow-md Xshadow-white/50"
                      } `}
                          //style={{ width: progress() }}
                          style={{
                            width: `${progress(item.total, "Expense")}%`,
                          }}
                        >
                          {" "}
                        </h1>
                      </div>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </div>

        <div className="h-[calc(33.333vh)] bg-[#25282F]/80 border-b border-gray-500">
          {/** FILTER */}
          <div className=" p-5 lg:col-span-2 lg:-mb-5 Xshadow-lg Xshadow-black/50">
            <div className="flex flex-row items-center justify-end gap-3">
              <div className="relative text-gray-300 border-l border-white/30 py-1.5">
                <div className="absolute pointer-events-none top-3 right-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m19.5 8.25-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </div>
                <select
                  defaultValue={byMonth}
                  onChange={(e) => dispatch(filterByMonth(e.target.value))}
                  className="text-center focus:outline-none appearance-none bg-transparent pl-2 pr-7"
                >
                  <option value="">Todo los meses</option>
                  <option value="01">Enero</option>
                  <option value="02">Febrero</option>
                  <option value="03">Marzo</option>
                  <option value="04">Abril</option>
                  <option value="05">Mayo</option>
                  <option value="06">Junio</option>
                  <option value="07">Julio</option>
                  <option value="08">Agosto</option>
                  <option value="09">Septiembre</option>
                  <option value="10">Octubre</option>
                  <option value="11">Noviembre</option>
                  <option value="12">Diciembre</option>
                </select>
              </div>

              <div className="relative text-gray-300 border-l border-white/30 py-1.5">
                <div className="absolute pointer-events-none top-3 right-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m19.5 8.25-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </div>
                <select
                  defaultValue={byYear}
                  onChange={(e) => dispatch(filterByYear(e.target.value))}
                  className="focus:outline-none appearance-none bg-transparent pl-2 pr-7"
                >
                  <option value="2023">2023</option>
                  <option value="2024">2024</option>
                  <option value="2025">2025</option>
                </select>
              </div>
            </div>
          </div>
          {/** BALANCE - INCOME EXPENSES */}
          <div className=" Xbg-gradient-to-t Xfrom-transparent Xvia-[#25282F]/80 Xto-[#25282F] p-5 ">
            <div className="px-10 flex flex-row justify-between">
              <div className="flex flex-row mb-5">
                <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                <div className="ml-4 ">
                  <h1 className="text-sm text-gray-200">Balance:</h1>
                  <h1
                    className={`-mt-1 text-2xl font-light text-gray-100 ${number.className} `}
                  >
                    1200
                  </h1>
                </div>
              </div>

              <div className="flex flex-col items-end">
                <div className="flex flex-row items-center">
                  <div className={`text-cyan-500 -rotate-45`}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                      />
                    </svg>
                  </div>
                  <h1 className={` ml-2 ${number.className}`}>2100 $</h1>
                </div>

                <div className="flex flex-row items-center">
                  <div className={`text-pink-500 rotate-45`}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                      />
                    </svg>
                  </div>
                  <h1 className={` ml-2 ${number.className}`}>600 $</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden w-full p-5 py-10 xgrid grid-cols-2 lg:grid-cols-4 gap-5">
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
