"use client";

import UserList from "@/components/UserList";
import { Montserrat, Barlow, Outfit, Jost } from "next/font/google";
//provar texto new-hero - https://www.fireload.com/error?errco=320&ref=download&e=File+has+been+removed.
import { useState } from "react";
import HistoryRow from "./row";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { filterByYear, filterByMonth } from "@/redux/features/filterSlice";

const inter = Outfit({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  //weight: ["400", "500", "600", "700"],
});

const number = Jost({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

const HistoryPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();
  const wallet = useAppSelector((state) => state.wallet);
  const dispatch = useAppDispatch();
  const { byYear, byMonth } = useAppSelector((state) => state.filter);
  //console.log(byMonth, byYear);

  let groupDate = ""; //para agrupar las fechas repetidas
  const nameDiaxFecha = (fecha: any) =>
    [
      "Domingo",
      "Lunes",
      "Martes",
      "Miércoles",
      "Jueves",
      "Viernes",
      "Sábado",
      //"Dom","Lun","Mar","Mié","Jue","Vie","Sáb",
    ][new Date(fecha).getDay()];

  const cmeses = [
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

  const transformData = () => {
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

    return data;
  };

  const totalExpense = () => {
    let total = 0;
    transformData().forEach(function (value: any) {
      if (value.type === "Expense") total += value.total;
    });
    return total;
  };

  const totalIncome = () => {
    let total = 0;
    transformData().forEach(function (value: any) {
      if (value.type === "Income") total += value.total;
    });
    return total;
  };

  const totalBalance = () => {
    //const balance;
    if (totalIncome() <= totalExpense()) return 0;
    const balance = ((totalIncome() - totalExpense()) * 100) / totalIncome();
    //console.log(balance.toFixed(0));
    return balance.toFixed(0);
  };

  return (
    <>
      <section
        className={`px-5 py-10 lg:px-0 text-white lg:grid lg:grid-cols-2 lg:gap-5 `}
      >
        {/** VOLVER - titulo - blanco */}
        <div className="Xbg-[#333333] w-full pt-5 px-5 lg:px-0 text-gray-100 mb-5 col-span-2 text-end flex flex-col items-end ">
          <h1 className="uppercase tracking-widest Xtext-xs font-semibold">
            Transactions
          </h1>
          <p className=" text-gray-500 mb-10">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque ad
            repellen
          </p>

          <div className="lg:hidden h-12 flex flex-row items-center">
            <Link href={"/analytics"} className="mr-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5 active:animate-ping"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                />
              </svg>
            </Link>
          </div>

          <div className="flex flex-row gap-4">
            <div className="border border-gray-500 text-gray-400">
              <select
                defaultValue={byMonth}
                onChange={(e) => dispatch(filterByMonth(e.target.value))}
                className="text-center focus:outline-none appearance-none bg-transparent p-2 pl-4 pr-8"
              >
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
                className="focus:outline-none appearance-none bg-transparent p-2 pl-4 pr-8"
              >
                <option value="2023">2023</option>
                <option value="2024">2024</option>
                <option value="2025">2025</option>
              </select>
            </div>
          </div>
        </div>
        {/** SALDO ACTUAL CON INCOME EXPENSES */}
        <div className="bg-[#333333] p-5 mb-5 lg:mb-0">
          <h1 className="uppercase tracking-widest text-xs font-semibold text-gray-400 mb-7">
            estadisticas
          </h1>
          <h1
            className={`font-numero text-4xl text-gray-100 mb-2 ${
              number.className
            } ${totalBalance() === 0 ? "text-yellow-500" : " "}  `}
          >
            {(totalIncome() - totalExpense()).toFixed(2)}
          </h1>
          <p className=" text-gray-500 mb-10">
            Resumen del mes de Mayo del 2024, monto total de gastos e ingresos.
          </p>
          <div className="text-gray-100 flex flex-row mb-2">
            <div className="basis-1/2">
              <h1 className={` text-lg ${number.className}`}>
                $ {totalIncome().toFixed(2)}{" "}
              </h1>
              <h1 className=" text-cyan-600 font-medium">Total ingresos</h1>
            </div>
            <div className="basis-1/2">
              <h1 className={` text-lg ${number.className} `}>
                $ {totalExpense().toFixed(2)}{" "}
              </h1>
              <h1 className=" text-pink-500 font-medium ">Gastos totales</h1>
            </div>
          </div>
        </div>
        {/** TRANSACCIONES */}
        <div className="relative bg-[#333333] p-5 border-b lg:border-0 border-gray-500/30">
          <h1 className="hidden lg:flex uppercase tracking-widest text-xs font-semibold text-gray-400 mb-7">
            Transacciones
          </h1>
          <h1
            className={`font-numero text-4xl text-gray-100 mb-2 ${
              number.className
            } ${transformData().length === 0 ? "text-yellow-500" : " "}  `}
          >
            {transformData().length}
            <span className="lg:hidden uppercase tracking-widest text-xs font-semibold text-gray-400 mb-7">
              {" "}
              Transacciones
            </span>
          </h1>

          <p className="hidden lg:flex text-gray-500 mb-10">
            Total de transacciones realizadas en el mes de Mayo.
          </p>
          <div className="hidden lg:flex lg:flex-col">
            <h1 className={` text-purple-500 text-lg ${number.className}`}>
              2
            </h1>
            <h1 className="text-gray-500">Agregados recientemente</h1>
          </div>
          <div className=" absolute bottom-6 lg:bottom-8 right-5 text-gray-400 flex items-center justify-center">
            <Link
              href={session?.user ? "/form" : "#"}
              className=" bg-gray-700/30 p-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 active:animate-ping hover:scale-125 Xhover:-ml-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </Link>
          </div>
        </div>
        {/** LLAMAR A LAS FILAS*/}
        <div id="list" className="Xbg-[#333333] lg:py-5 lg:-mt-5">
          <h1 className="hidden uppercase tracking-widest text-xs font-semibold text-gray-400 mb-7">
            Historial
          </h1>

          <div className="w-full pb-10">
            {transformData().map((item, index) => (
              <div key={index}>
                {item.date.substr(5, 5) === groupDate ? (
                  <p className="hidden">no mostrar</p>
                ) : (
                  <div className="px-2 flex flex-row">
                    {/* TIME LINE */}
                    <div
                      className={`hidden relative min-w-12 Xflex justify-center `}
                    >
                      <div className="w-0.5 bg-gray-600 h-full "> </div>
                    </div>
                    {/** FECHA VISIBLE */}
                    <p className="hidden bg-transparent text-yellow-500 py-2 text-sm">
                      {nameDiaxFecha(item.date) + ", "}{" "}
                      <span className="">{item.date.substr(8, 2)} </span>
                      {" de " + cmeses[Number(item.date.substr(5, 2)) - 1]}
                    </p>
                  </div>
                )}
                <p className="hidden">{(groupDate = item.date.substr(5, 5))}</p>

                <HistoryRow item={item} />
              </div>
            ))}
          </div>
        </div>
        {/** FOOTER */}
        <div className="Xbg-gray-800/50 py-10 mt-5 text-sm text-center text-gray-400 flex flex-row justify-center items-center ">
          <h1>
            <span className={inter.className}>@ 2024 </span> Wall
            <span className={inter.className}>3</span>t. All rights reserved.{" "}
          </h1>
          <img
            src="./images/dino.png"
            alt="Dino"
            className="w-5 h-5 ml-2 hover:-rotate-12"
          />
        </div>
      </section>

      <div className="hidden">
        <UserList />
      </div>
    </>
  );
};

export default HistoryPage;
