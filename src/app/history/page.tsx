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
        className={`Xpx-2 lg:px-0 text-white lg:grid lg:grid-cols-2 lg:gap-5 `}
      >
        <div className="h-[calc(33.333vh)] flex flex-col justify-between">
          {/** BOTON MES - VOLVER - titulo - blanco */}
          <div className="Xbg-card w-full pt-5 px-5 lg:px-0 text-gray-100 col-span-2 text-end flex flex-col items-end ">
            <h1 className="hidden uppercase tracking-widest Xtext-xs font-semibold">
              Transactions
            </h1>
            <p className=" hidden text-gray-500 mb-10">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque ad
              repellen
            </p>

            <div className="hidden h-12 xflex flex-row items-center">
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

            <div className="w-full py-1.5 bg-white/30 rounded-full text-center mb-3">
              <h1>Search</h1>
            </div>

            {/** FILTER */}
            <div className="w-full flex flex-row gap-3">
              <h1 className="w-full py-1.5 px-3 text-center Xborder bg-white/30 rounded-full text-gray-300 whitespace-nowrap">
                {transformData().length} items
              </h1>

              <div className="relative text-gray-300 rounded-full Xborder bg-white/30 p-1.5">
                <div className="hidden absolute pointer-events-none top-3 right-2">
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
                  className="text-center focus:outline-none appearance-none bg-transparent px-4"
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

              <div className="rounded-full bg-white/30 text-gray-300">
                <select
                  defaultValue={byYear}
                  onChange={(e) => dispatch(filterByYear(e.target.value))}
                  className="focus:outline-none appearance-none bg-transparent p-1.5 px-4 "
                >
                  <option value="2023">2023</option>
                  <option value="2024">2024</option>
                  <option value="2025">2025</option>
                </select>
              </div>
            </div>
          </div>

          {/** SEARCH - BALANCE - INCOME EXPENSES */}
          <div className="bg-gradient-to-b from-transparent via-[#25282F]/80 to-[#25282F] p-5 border-b border-gray-500 ">
            <div className="px-10 flex flex-row justify-between">
              <div className="flex flex-row">
                <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                <div className="ml-4 ">
                  <h1 className="text-sm text-gray-200">Balance:</h1>
                  <h1
                    className={`-mt-1 text-2xl font-light text-gray-100 ${
                      number.className
                    } ${totalBalance() === 0 ? "text-yellow-500" : " "} `}
                  >
                    {(totalIncome() - totalExpense()).toFixed(2)}
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
                  <h1 className={` ml-2 ${number.className}`}>
                    {totalIncome().toFixed(2)}
                    {" $"}
                  </h1>
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
                  <h1 className={` ml-2 ${number.className}`}>
                    {totalExpense().toFixed(2)}
                    {" $"}
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/** TRANSACCIONES */}
        <div className="hidden relative bg-fondo p-5">
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

          <p className="hidden lg:flex text-sm text-gray-500 mb-10">
            Cantidad total de transacciones realizadas en este mes.
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

        <div className="min-h-[calc(66.667vh)] bg-fondo flex flex-col justify-between">
          {/** LLAMAR A LAS FILAS*/}
          <div id="list" className="bg-fondo px-2 lg:py-5 lg:-mt-5">
            <h1 className="hidden uppercase tracking-widest text-xs font-semibold text-gray-400 mb-7">
              Historial
            </h1>

            <div className="w-full pb-10">
              {transformData().map((item, index) => (
                <div key={index}>
                  {item.date.substr(5, 5) === groupDate ? (
                    <p className="hidden">no mostrar</p>
                  ) : (
                    <div className="px-5 flex flex-row">
                      {/* TIME LINE */}
                      <div
                        className={`hidden relative min-w-12 Xflex justify-center `}
                      >
                        <div className="w-0.5 bg-gray-600 h-full "> </div>
                      </div>
                      {/** FECHA VISIBLE */}
                      <div className="Xhidden flex flex-row items-center bg-transparent text-gray-400 pt-4 pb-2 text-sm">
                        <h1
                          className={`text-3xl font-light mr-3 ${number.className}`}
                        >
                          {item.date.substr(8, 2)}
                        </h1>
                        <div className="flex flex-col text-xs">
                          <span className="-mb-1 uppercase">
                            {nameDiaxFecha(item.date) + " "}
                          </span>{" "}
                          <span className="">
                            {cmeses[Number(item.date.substr(5, 2)) - 1] +
                              " del "}
                            <span className={`${number.className}`}>
                              {item.date.substr(0, 4)}
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                  <p className="hidden">
                    {(groupDate = item.date.substr(5, 5))}
                  </p>

                  <HistoryRow item={item} />
                </div>
              ))}
            </div>
          </div>
          {/** FOOTER */}
          <div className="bg-card py-10 text-sm text-center text-gray-400 flex flex-row justify-center items-center ">
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
        </div>
      </section>

      <div className="hidden">
        <UserList />
      </div>
    </>
  );
};

export default HistoryPage;
