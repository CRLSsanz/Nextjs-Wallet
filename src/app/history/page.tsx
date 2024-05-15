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
        {/** VOLVER - MES - ANO */}
        <div className="w-full p-5 text-white  flex flex-row justify-between items-center mb-5">
          <div className="flex flex-row items-center">
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

          <div className="text-gray-300 rounded-full border border-gray-500/30 px-5 py-2">
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
          </div>

          <div className="h-12 text-xl font-extralight flex items-center">
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
          <h1 className="hidden py-5 text-xl">Presupuesto de Abril v</h1>
          <div className="w-full p-7 flex flex-row justify-between rounded-2xl bg-black/10 items-center mb-10">
            <div className="flex flex-col">
              <h1 className="text-gray-400">Total Balance</h1>
              <h1
                className={`text-4xl Xfont-light mb-2 ${
                  totalBalance() === 0 ? "text-yellow-500" : " "
                }  `}
              >
                $ {(totalIncome() - totalExpense()).toFixed(2)}
              </h1>
              <div className="text-gray-300 flex flex-row items-center">
                <h1 className="text-sm text-teal-500 font-medium mr-3">
                  +$ {totalIncome().toFixed(2)}{" "}
                  <span className="hidden">Ingresos</span>
                </h1>
                <h1 className="text-sm text-pink-500 font-medium">
                  -$ {totalExpense().toFixed(2)}{" "}
                  <span className="hidden">Gastos</span>
                </h1>
              </div>
            </div>
            <Link
              href={"/form"}
              className="Xhidden w-14 h-14 flex items-center justify-center rounded-full bg-white/20 mb-2 transform transition-all duration-1000"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6 active:animate-ping hover:scale-125 hover:rotate-90 "
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </Link>
          </div>
          <div className="flex flex-row">
            <div className="flex flex-col mr-3">
              <h1 className="text-gray-400">Transacciones</h1>
              <h1>23</h1>
            </div>
            <div className="flex flex-col border-l pl-3">
              <h1 className="text-gray-400">Mes</h1>
              <div className="flex flex-row">
                <span className="mr-5">Abril</span>
                <span className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m19.5 8.25-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/** PRESUPUESTO INCOME EXPENSES*/}
        <div className="hidden px-5 mb-20">
          <div className="h-64 bg-gray-500/50 rounded-3xl"> </div>
          <div className="mx-4 -mt-60 rounded-2xl bg-gray-900 border border-gray-500/30">
            {/** BALANCE */}
            <div className="py-10 flex flex-col items-center justify-center">
              <div className="flex flex-col justify-center">
                <h1 className="text-center">Balance mensual</h1>
                <h1 className="text-green-600 flex justify-center tracking-wider mb-2">
                  <span className="mt-0.5 text-xl"> $ </span>
                  <span className="text-4xl font-light">
                    {(totalIncome() - totalExpense()).toFixed(2)}
                  </span>
                </h1>
              </div>
              <div className="text-white/20">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-24 h-24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7.5 3.75H6A2.25 2.25 0 0 0 3.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0 1 20.25 6v1.5m0 9V18A2.25 2.25 0 0 1 18 20.25h-1.5m-9 0H6A2.25 2.25 0 0 1 3.75 18v-1.5M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              </div>
            </div>
            {/** INCOME EXPENCES */}
            <div className=" px-3 pb-10 text-gray-200">
              <div className="flex flex-row justify-between">
                <div className="flex flex-row items-center">
                  <div className="w-8 h-8 flex items-center justify-center bg-gray-900/70 text-indigo-600 -rotate-90 rounded-md">
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
                  <div className="ml-1">
                    <h1 className="text-sm ">Ingresos</h1>
                    <h1 className="flex text-lg text-white">
                      <span className="text-sm pt-0.5 mr-1">$ </span>
                      {totalIncome().toFixed(2)}
                    </h1>
                  </div>
                </div>

                <div className="flex flex-row items-center">
                  <div className="text-end mr-1">
                    <h1 className="text-sm ">Gastos</h1>
                    <h1 className="flex text-lg text-white">
                      <span className="text-sm pt-0.5 mr-1">$ </span>
                      {totalExpense().toFixed(2)}
                    </h1>
                  </div>
                  <div className="w-8 h-8 flex items-center justify-center bg-gray-900/70 text-pink-600 rotate-90 rounded-md">
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
          </div>
        </div>

        {/** TRANSACCIONES */}
        <div className=" Xbg-black/30 Xp-2">
          <div className="hidden xflex flex-row justify-between py-5">
            <h1 className="font-semibold">Transacciones</h1>
            <Link
              href={"#list"}
              className="text-gray-300 flex flex-row items-center"
            >
              <h1>Ver mas</h1>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-4 h-4 ml-1 rotate-90"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m8.25 4.5 7.5 7.5-7.5 7.5"
                />
              </svg>
            </Link>
          </div>

          {/** ADD*/}
          <div className="hidden xgrid grid-cols-5 gap-2 mb-5">
            <div className="flex items-center justify-center rounded-xl text-white bg-gray-500/5 border border-gray-500/30 mb-5">
              <Link
                href={session?.user ? "/form" : "#"}
                className=" flex items-center justify-center mb-2"
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
            <div className="col-span-2 py-5 text-white rounded-xl bg-gray-500/5 border border-gray-500/30 flex flex-col justify-between items-center mb-5">
              <h1 className="text-gray-400 text-sm mb-2">Cantidad</h1>
              <h1 className="text-xl"> {transformData().length}</h1>
            </div>
            <div className="col-span-2 py-5 text-white rounded-xl bg-gray-500/5 border border-gray-500/30 flex flex-col justify-between items-center mb-5">
              <h1 className="text-gray-400 text-sm mb-2">Categorias</h1>
              <h1 className="text-xl"> 23 </h1>
            </div>
          </div>

          {/** LLAMAR A LAS FILAS*/}
          <div id="list" className="bg-black/50 py-7 X-mx-5 Xrounded-3xl">
            {/** LLAMAR A LAS FILAS*/}
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
                      <p className="Xhidden bg-transparent text-teal-600 py-2 px-3 text-sm">
                        {nameDiaxFecha(item.date) + ", "}{" "}
                        <span className="">{item.date.substr(8, 2)} </span>
                        {" de " + cmeses[Number(item.date.substr(5, 2)) - 1]}
                      </p>
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
