"use client";

import UserList from "@/components/UserList";
import { Montserrat } from "next/font/google";
//provar texto new-hero - https://www.fireload.com/error?errco=320&ref=download&e=File+has+been+removed.
import { useState } from "react";
import HistoryRow from "./row";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { filterByYear, filterByMonth } from "@/redux/features/filterSlice";

const inter = Montserrat({
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
      <section className={` text-white ${inter.className} `}>
        {/** VOLVER - titulo - blanco */}
        <div className="w-full p-5 text-white  flex flex-row justify-between items-center">
          <div className="h-12 flex flex-row items-center">
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
          <div className="font-extralight flex items-center">
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

        {/** SALDO ACTUAL CON INCOME EXPENSES - VISIBLE */}
        <div className="px-5 mb-10">
          <div className="rounded-2xl Xbg-black/30 items-center mb-10">
            <div className="flex flex-col justify-between gap-2">
              <h1 className="text-gray-400">Presupuesto mensual</h1>
              <h1
                className={`text-5xl text-gray-200 ${
                  totalBalance() === 0 ? "text-yellow-500" : " "
                }  `}
              >
                $ {(totalIncome() - totalExpense()).toFixed(2)}
              </h1>
              <div className="text-gray-300 flex flex-row items-center">
                <h1 className="text-sm bg-cyan-600 font-medium rounded-md px-2 mr-4">
                  +$ {totalIncome().toFixed(2)}{" "}
                  <span className="hidden">Ingresos</span>
                </h1>
                <h1 className="text-sm bg-pink-500 font-medium rounded-md px-2">
                  -$ {totalExpense().toFixed(2)}{" "}
                  <span className="hidden">Gastos</span>
                </h1>
              </div>
            </div>
          </div>
        </div>

        {/** TRANSACCIONES */}
        <div className=" bg-black/30 Xp-2">
          <div className="flex flex-row">
            {/** MES Y CANTIDAD */}
            <div className="w-full flex flex-row-reverse justify-between items-center px-3">
              <div className="flex flex-col items-center mr-3">
                <h1 className="text-sm text-gray-400">Transacciones</h1>
                <p>{transformData().length} </p>
              </div>
              <div className="flex flex-col items-center">
                <h1 className="text-sm text-gray-400">Mes</h1>
                <div className="text-gray-300 flex flex-row items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4 rotate-180"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m8.25 4.5 7.5 7.5-7.5 7.5"
                    />
                  </svg>

                  <select
                    defaultValue={byMonth}
                    onChange={(e) => dispatch(filterByMonth(e.target.value))}
                    className="text-center focus:outline-none appearance-none bg-transparent px-2"
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

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m8.25 4.5 7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </div>
              </div>
            </div>
            {/** ADD*/}
            <div className="py-8 border-l border-gray-50/30 min-w-[76px]">
              <Link
                href={session?.user ? "/form" : "#"}
                className=" flex items-center justify-center"
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
            </div>{" "}
          </div>
        </div>
        {/** LLAMAR A LAS FILAS*/}
        <div id="list" className="bg-black/20 pb-7 X-mx-5 Xrounded-3xl">
          <div className="w-full px-3 pb-10">
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
                    <p className="hidden bg-transparent text-teal-600 py-2 px-3 text-sm">
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
      </section>

      <div className="hidden">
        <UserList />
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
    </>
  );
};

export default HistoryPage;
