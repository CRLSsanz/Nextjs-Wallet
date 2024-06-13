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
  "bg-green-600",
  "bg-cyan-600",
  "bg-purple-600",
  "bg-red-600",
  "bg-yellow-600",
  "bg-indigo-600",
  "bg-pink-600",

  "bg-green-600",
  "bg-cyan-600",
  "bg-purple-600",
  "bg-red-600",
  "bg-yellow-600",
  "bg-indigo-600",
  "bg-pink-600",
];

const AnalyticsPage = () => {
  const { data, error, isLoading, isFetching } = useGetUsersQuery(null);
  const { data: session } = useSession();
  const wallet = useAppSelector((state) => state.wallet);
  const dispatch = useAppDispatch();
  const { byYear, byMonth, byType } = useAppSelector(
    (state) => state.filterAnalytics
  );

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

  {
    /** BALANCE GENERAL */
  }
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
    transformData2(byYear).forEach(function (value: any) {
      if (value.type === "Expense") total += value.total;
    });
    return total;
  };

  const totalIncome = () => {
    let total = 0;
    transformData2(byYear).forEach(function (value: any) {
      if (value.type === "Income") total += value.total;
    });
    return total;
  };

  // WALLET FILTRADO

  const walletFiltrado = () => {
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
  const dataCategoryX = walletFiltrado().reduce(
    (prev: any, cur) => (
      (prev[cur.category] = prev[cur.category] + cur.total || cur.total), prev
    ),
    {}
  );
  const dataCategory = walletFiltrado().reduce((acum: any, item) => {
    return !acum[item.category]
      ? { ...acum, [item.category]: item.total, ["count"]: 1 }
      : {
          ...acum,
          [item.category]: acum[item.category] + item.total,
        };
  }, []);
  //console.log(dataCategory);

  function groupById(array: any) {
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
  //console.log(groupById(walletFiltrado()));

  // MAYOR VALOR TOTAL - ARRAY ORDENADOS POR TOTAL
  const resultadosOrdenados = groupById(walletFiltrado()).sort(
    (a: any, b: any) => {
      return Number.parseInt(b.total) - Number.parseInt(a.total);
    }
  );
  //console.log("Array Ordenado: ", resultadosOrdenados);
  //console.log("Mayor Valor: ", resultadosOrdenados[0]);

  const progress = (num: number) => {
    const valor = (num * 100) / resultadosOrdenados[0].total;
    //console.log(num, valor);
    return valor;
  };

  return (
    <section className={""}>
      <div className="px-2 max-w-[600px] min-h-screen py-10 text-white lg:grid lg:grid-cols-2 lg:gap-5 ">
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
        <div className="bg-card p-5 mb-5 lg:mb-0 lg:col-span-2">
          <h1 className="uppercase tracking-widest text-xs font-semibold text-gray-400 mb-7">
            Statement graph
          </h1>
          <div className="h-60 border border-gray-500/20 rounded-3xl"> </div>
        </div>

        {/** PRESUPUESTO GENERAL*/}
        <div className={`bg-card p-5 mb-5 lg:mb-0 ${number.className} `}>
          <h1 className="uppercase tracking-widest text-xs font-semibold text-gray-400 mb-7">
            Resumen
          </h1>
          <h1 className="text-start text-white text-4xl mb-5">
            {BalanceGeneral(wallet)}
          </h1>

          <div className="w-full flex flex-row-reverse justify-between items-center mb-2">
            <h1 className="text-gray-300 font-light">Balance 2023</h1>
            <h1 className="text-white text-lg">
              $ {transformData("2024").toFixed(2)}
            </h1>
          </div>
          <div className="w-full flex flex-row-reverse justify-between items-center">
            <h1 className="text-gray-300 font-extralight">Balance 2024</h1>
            <h1 className="text-white text-lg">
              $ {transformData("2023").toFixed(2)}
            </h1>
          </div>
        </div>

        {/** SELECT ANO - INCOME EXPENCES */}
        <div>
          <div className="bg-card p-5 mb-5">
            <h1 className="uppercase tracking-widest text-xs font-semibold text-gray-400 mb-7">
              Total Balance
            </h1>
            <div className="flex flex-row justify-between">
              <h1 className="text-4xl text-green-500 font-light">
                {(totalIncome() - totalExpense()).toFixed(2)}
              </h1>

              <div className="border border-gray-500 text-gray-400">
                <select
                  defaultValue={byYear}
                  onChange={(e) => dispatch(filterByYear(e.target.value))}
                  className="focus:outline-none appearance-none bg-transparent p-2"
                >
                  <option value="2023">2023</option>
                  <option value="2024">2024</option>
                  <option value="2025">2025</option>
                </select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div className={`bg-card p-5 mb-5 lg:mb-0 ${number.className} `}>
              <div className="w-8 h-8 flex items-center justify-center bg-[#444] text-cyan-500 -rotate-90 rounded-md mb-4">
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

              <h1 className="flex text-2xl text-white mb-1">
                {totalIncome().toFixed(2)}
              </h1>
              <h1 className="uppercase tracking-widest text-xs font-semibold text-cyan-500/70">
                Ingresos
              </h1>
            </div>

            <div className={`bg-card p-5 mb-5 lg:mb-0 ${number.className} `}>
              <div className="w-8 h-8 flex items-center justify-center bg-[#444] text-pink-500 rotate-90 rounded-md mb-4">
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
              <h1 className="flex text-2xl text-white mb-1">
                {totalExpense().toFixed(2)}
              </h1>
              <h1 className="uppercase tracking-widest text-xs font-semibold text-pink-500/70 ">
                Gastos
              </h1>
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

        {/** RESUMEN POR CATEGORY */}

        <div className="bg-card p-5 lg:col-span-2 lg:-mb-5 Xshadow-lg Xshadow-black/50">
          <h1 className="uppercase tracking-widest text-xs font-semibold text-gray-400 mb-7">
            Resumen por categorias
          </h1>
          <div className="flex flex-row items-center justify-end gap-5 mb-5">
            <div
              className={` text-white whitespace-nowrap px-5 py-2 
            ${
              byType === "Income"
                ? " bg-indigo-600 "
                : ` ${
                    byType === "Expense"
                      ? " bg-pink-500 "
                      : " border border-gray-500/30 "
                  } `
            }
            `}
            >
              <select
                //defaultValue={byType}
                onChange={(e) => dispatch(filterByType(e.target.value))}
                className="text-center focus:outline-none appearance-none bg-transparent px-2"
              >
                <option value="">Ver todo</option>
                <option value="Income">Ingresos</option>
                <option value="Expense">Gastos</option>
              </select>
            </div>

            <div className="text-gray-300 border border-gray-500/30 px-5 py-2">
              <select
                //defaultValue={byMonth}
                onChange={(e) => dispatch(filterByMonth(e.target.value))}
                className="text-center focus:outline-none appearance-none bg-transparent px-2"
              >
                <option value="">Todos los meses</option>
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

            <div className="border border-gray-500 text-gray-400">
              <select
                defaultValue={byYear}
                onChange={(e) => dispatch(filterByYear(e.target.value))}
                className="focus:outline-none appearance-none bg-transparent p-2"
              >
                <option value="2023">2023</option>
                <option value="2024">2024</option>
                <option value="2025">2025</option>
              </select>
            </div>
          </div>
        </div>

        {/** LIST FOR CATEGORY */}
        <div className="Xbg-card min-h-screen Xp-5 lg:col-span-2">
          <div className="w-full grid grid-cols-2 gap-3 lg:grid-cols-3 lg:gap-0 ">
            {groupById(walletFiltrado()).map((item: any, index: any) => (
              <div
                key={index}
                className="bg-card p-5 flex flex-col text-gray-500 rounded-sm shadow-lg shadow-black/50"
              >
                <div className="w-full flex flex-row-reverse items-center justify-between">
                  <div
                    className={`relative w-6 h-6 flex items-center justify-center rounded-lg
                  ${barsColor[index]}
                  `}
                  >
                    <img
                      src={`./images/category/${item.category}.png`}
                      alt="image"
                      className="w-5 h-5"
                    />
                  </div>

                  <h1 className="text-xs truncate">{item.category}</h1>
                </div>

                <h1
                  className={`text-xl font-light text-gray-200 mb-2 ${number.className} `}
                >
                  ${item.total.toFixed(2)}
                </h1>

                <div
                  className={`text-xs
                      ${
                        item.type === "Expense"
                          ? " Xbg-pink-600"
                          : " Xbg-cyan-600"
                      }
                      ${number.className} `}
                >
                  <span>Cantidad de items: {item.count}</span>
                </div>

                <div className="w-full flex justify-center mb-2">
                  <div className="w-full h-1.5 bg-[#111]">
                    <h1
                      className={` Xw-[75%] h-1.5 ${
                        barsColor[index]
                      } Xrounded-full $
                      ${
                        item.type === "Expense"
                          ? " Xbg-pink-700/70 shadow-md shadow-white/50"
                          : " Xbg-cyan-600/70 shadow-md shadow-white/50"
                      } `}
                      //style={{ width: progress() }}
                      style={{ width: `${progress(item.total)}%` }}
                    >
                      {" "}
                    </h1>
                  </div>
                </div>
              </div>
            ))}
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
