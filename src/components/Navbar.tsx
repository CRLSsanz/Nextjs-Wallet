"use client";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Jost } from "next/font/google";
import { useGetWalletQuery } from "@/redux/services/walletApi";
import { Span } from "next/dist/trace";

const number = Jost({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

const hoy = new Date().toISOString();
const year = hoy.substr(0, 4);
const month = hoy.substr(5, 2);

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
/*const menuItems = [
  {
    title: "History",
    link: "/history",
    svg: "history.svg",
  },
];
*/
const Navbar = () => {
  const { data: session } = useSession();
  const [navbar, setNavbar] = useState(false);
  const [maxim, setMaxim] = useState(false);
  const {
    data: wallet,
    error,
    isLoading,
  } = useGetWalletQuery(session?.user?.email);
  //const wallet = useAppSelector((state) => state.wallet);

  const handleNavbarClose = () => {
    setNavbar(!navbar);
    setMaxim(false);
  };

  //console.log(session);
  // const size = "righ-0 ";

  // INCOME menos EXPENSE del array general WALLET
  const balanceAnual = (wallet: any) => {
    let data = wallet;

    if (year) {
      data = data?.filter(
        (item: any) =>
          item.date >= `${year}-01-01` && item.date <= `${year}-12-32`
      );
    }

    let totalExpense = 0;
    data?.forEach(function (value: any) {
      if (value.type === "Expense") totalExpense += value.total;
    });

    let totalIncome = 0;
    data?.forEach(function (value: any) {
      if (value.type === "Income") totalIncome += value.total;
    });

    if (totalIncome <= totalExpense) return 0;
    const balance = totalIncome - totalExpense;
    //console.log(totalIncome + " " + totalExpense + " " + balance.toFixed(0));
    return balance.toFixed(2);
  };

  const filterByYearMonth = () => {
    let data = wallet;

    if (month) {
      data = data?.filter(
        (item: any) =>
          item.date >= `${year}-${month}-01` &&
          item.date < `${year}-${month}-32`
      );
    }

    return data;
  };

  const totalExpense = () => {
    let total = 0;
    filterByYearMonth()?.forEach(function (value: any) {
      if (value.type === "Expense") total += value.total;
    });
    return total;
  };

  const totalIncome = () => {
    let total = 0;
    filterByYearMonth()?.forEach(function (value: any) {
      if (value.type === "Income") total += value.total;
    });
    return total;
  };

  const handleDelete = async () => {
    let isDelete = window.confirm(`CERRAR SESION`);
    if (isDelete) {
      //dispatch(deleteWallet(id));
      await signOut({ callbackUrl: "/" });
    }
  };

  return (
    <div>
      <nav
        className={`fixed z-50 w-16 h-16 p-2 pr-0 right-0 bottom-4 Xbackdrop-blur-2xl flex flex-col justify-center rounded-l-full text-white 
      ${
        navbar
          ? " bg-gradient-to-b from-[#111] to-[#555] "
          : " bg-gradient-to-t from-[#111] to-[#555] "
      }      
      `}
      >
        {session?.user ? (
          <div className="hidden h-40 Xflex flex-col justify-between">
            <Link
              href="/"
              className="flex flex-col justify-center items-center Xhover:rotate-6 hover:scale-[1.30] transition-transform duration-200 active:animate-ping"
            >
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
                  d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                />
              </svg>

              <h1 className="text-sm hidden">Home</h1>
            </Link>

            <Link
              href="/analytics"
              className="flex flex-col justify-center items-center Xhover:rotate-6 hover:scale-[1.30] transition-transform duration-200 active:animate-ping"
              hidden={true}
            >
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
                  d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z"
                />
              </svg>
              <h1 className="text-sm hidden">Analytics</h1>
            </Link>

            <Link
              href="/form"
              className="flex flex-col justify-center items-center Xhover:rotate-6 hover:scale-[1.30] transition-transform duration-200 active:animate-ping"
            >
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
                  d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 0 0 2.25-2.25V6a2.25 2.25 0 0 0-2.25-2.25H6A2.25 2.25 0 0 0 3.75 6v2.25A2.25 2.25 0 0 0 6 10.5Zm0 9.75h2.25A2.25 2.25 0 0 0 10.5 18v-2.25a2.25 2.25 0 0 0-2.25-2.25H6a2.25 2.25 0 0 0-2.25 2.25V18A2.25 2.25 0 0 0 6 20.25Zm9.75-9.75H18a2.25 2.25 0 0 0 2.25-2.25V6A2.25 2.25 0 0 0 18 3.75h-2.25A2.25 2.25 0 0 0 13.5 6v2.25a2.25 2.25 0 0 0 2.25 2.25Z"
                />
              </svg>
              <h1 className="text-sm hidden">Add</h1>
            </Link>

            <Link
              href="/history"
              className="flex flex-col justify-center items-center Xhover:rotate-6 hover:scale-[1.30] transition-transform duration-200 active:animate-ping"
            >
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
                  d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              <h1 className="text-sm hidden">History</h1>
            </Link>
          </div>
        ) : (
          <></>
        )}
        <div
          className={`w-full h-full flex items-center rounded-l-full
        ${navbar ? "bg-[#222] " : "bg-[#222]"} `}
        >
          {/** BOTOM MENU */}
          <div
            className={`w-12 h-10 flex items-center justify-center active:rotate-180 Xhover:scale-[1.30] transition-transform duration-200 active:animate-ping cursor-pointer rounded-full Xbg-red-400
        `}
          >
            <div onClick={handleNavbarClose} className="">
              {navbar ? (
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
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              ) : (
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
                    d="M3.75 9h16.5m-16.5 6.75h16.5"
                  />
                </svg>
              )}
            </div>
          </div>
        </div>
      </nav>

      <ul
        className={`fixed top-0 z-20 text-gray-100 bg-indigo-600/10 h-screen w-2/5 transform transition-all duration-500 backdrop-blur-md border-l flex flex-col
        ${
          navbar
            ? " right-0 pointer-events-auto opacity-100 "
            : " -right-20 pointer-events-none opacity-0 "
        }  `}
      >
        {/** LOGOUT Y IMAGEN USER */}
        <div className=" basis-1/3 py-5 px-3 flex flex-col justify-between border-b border-gray-500">
          <div className="flex flex-row items-center justify-end">
            <h1 className="text-end leading-none mr-2">
              {session?.user?.name}
            </h1>
            {session?.user ? (
              <img
                src={`${session?.user?.image}`}
                alt="Avatar"
                className="rounded-full w-10 h-10 border-2 border-gray-300"
              />
            ) : (
              <div className="rounded-full border-2 border-gray-300 p-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                  />
                </svg>
              </div>
            )}
          </div>

          {session?.user ? (
            <div className="text-gray-300 flex flex-row items-center space-x-1">
              <div
                onClick={() => handleDelete()}
                //onClick={async () => await signOut({ callbackUrl: "/" })}
                className=""
              >
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
                    d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
                  />
                </svg>
              </div>
              <h4 className="text-sm">Cerrar sesion</h4>
            </div>
          ) : (
            <div className="">
              <button
                onClick={() => signIn()}
                className="bg-gradient-to-br from-sky-500 to-sky-700 px-5 py-2 text-sm"
              >
                Sign In
              </button>
            </div>
          )}
        </div>

        {/** MENU */}
        <div className="basis-1/3 py-5 px-3 bg-indigo-600/60 border-b border-gray-500">
          {session?.user && (
            <div className="h-full flex flex-col justify-between">
              <div className="flex flex-col items-end">
                <h1 className="uppercase text-sm text-gray-300 tracking-wider">
                  {MonthName[Number(month) - 1]}
                </h1>
                <h1
                  className={`text-3xl font-light text-gray-100 flex items-start ${number.className}  `}
                >
                  {totalIncome() - totalExpense()}
                  <span className="text-lg">$</span>
                </h1>

                <div className="flex flex-row justify-end mb-5 -mt-1">
                  <div className="flex flex-row items-center justify-between text-cyan-500 mr-2">
                    <div className={`mr-0 -rotate-90`}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-3"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                        />
                      </svg>
                    </div>
                    <h1 className={` text-sm ${number.className}`}>
                      $ {totalIncome()}{" "}
                    </h1>
                  </div>

                  <div className="flex flex-row items-center justify-between text-pink-500">
                    <div className={`mr-0 rotate-90`}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-3"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                        />
                      </svg>
                    </div>
                    <h1 className={` text-sm ${number.className}`}>
                      $ {totalExpense()}
                    </h1>
                  </div>
                </div>
              </div>

              <div className={`flex flex-col Xitems-end ${number.className}`}>
                <h1 className={` text-2xl font-light flex items-start`}>
                  <span className="text-lg text-gray-100">$ </span>
                  {Number(balanceAnual(wallet)).toFixed(0)}
                </h1>
                <h1 className="-mt-1 text-xs uppercase text-gray-300">
                  Saldo Actual {year}
                </h1>
              </div>
            </div>
          )}
        </div>

        {/** BOTON ITEMS */}
        <div className="basis-1/3 p-5 py-8">
          <div className="grid grid-cols-2 items-center gap-x-2 gap-y-8 transform transition-all duration-1000 ">
            <Link
              href={session?.user ? "/" : "#"}
              onClick={() => setNavbar(false)}
              className="flex justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5 active:animate-ping hover:scale-125"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                />
              </svg>
              <h1 className="text-sm pl-4" hidden={!maxim}>
                Home
              </h1>
            </Link>

            <Link
              href={session?.user ? "/analytics" : "#"}
              onClick={() => setNavbar(false)}
              className="flex flex-row items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-5 active:animate-ping hover:scale-125"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605"
                />
              </svg>

              <h1 className="text-sm pl-4" hidden={!maxim}>
                Analytics
              </h1>
            </Link>

            <Link
              href={session?.user ? "/form" : "#"}
              onClick={() => setNavbar(false)}
              className="flex flex-row items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5 active:animate-ping hover:scale-125"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>

              <h1 className="text-sm pl-4" hidden={!maxim}>
                Add
              </h1>
            </Link>

            <Link
              href={session?.user ? "/history" : "#"}
              onClick={() => setNavbar(false)}
              className="flex flex-row items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-5 active:animate-ping hover:scale-125"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
              </svg>

              <h1 className="text-sm pl-4" hidden={!maxim}>
                History
              </h1>
            </Link>

            <Link
              href={session?.user ? "/category#list" : "#"}
              onClick={() => setNavbar(false)}
              className="flex flex-row items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5 active:animate-ping hover:scale-125"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 0 0 2.25-2.25V6a2.25 2.25 0 0 0-2.25-2.25H6A2.25 2.25 0 0 0 3.75 6v2.25A2.25 2.25 0 0 0 6 10.5Zm0 9.75h2.25A2.25 2.25 0 0 0 10.5 18v-2.25a2.25 2.25 0 0 0-2.25-2.25H6a2.25 2.25 0 0 0-2.25 2.25V18A2.25 2.25 0 0 0 6 20.25Zm9.75-9.75H18a2.25 2.25 0 0 0 2.25-2.25V6A2.25 2.25 0 0 0 18 3.75h-2.25A2.25 2.25 0 0 0 13.5 6v2.25a2.25 2.25 0 0 0 2.25 2.25Z"
                />
              </svg>
              <h1 className="text-sm pl-4" hidden={!maxim}>
                Category
              </h1>
            </Link>
          </div>
        </div>
      </ul>

      <ul
        className={`hidden lg:block Xfixed Xtop-0 Xz-20 text-gray-100 bg-transparent Xw-full w-[300px] Xw-[calc(100vw-160px)] h-[calc(100vh-0px)] Xh-screen transform transition-all border-l border-gray-500/20 duration-500 xflex flex-col rounded-b-md text-center
        ${
          navbar
            ? ` ${
                maxim
                  ? " right-0 bg-cover bg-fixed bg-[50%] bg-[url('/images/f-city.jpg')] "
                  : " -right-60 Xbg-gradient-to-r Xfrom-zinc-200 backdrop-blur-md "
              } `
            : " -right-[320px] "
        }`}
      >
        {/** MENU */}
        <div className="h-full py-10 pr-5 flex flex-col justify-between">
          {/** ITEMS */}
          <div className="flex flex-col space-y-5 transform transition-all duration-1000 text-gray-400">
            {/** EXPANDIR * /}
            <div className="hidden Xflex flex-row justify-between">
              <button
                onClick={() => setMaxim(!maxim)}
                className="active:bg-none focus:outline-none flex items-center"
              >
                {maxim ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6 active:animate-ping"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m8.25 4.5 7.5 7.5-7.5 7.5"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6 active:animate-ping"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 19.5 8.25 12l7.5-7.5"
                    />
                  </svg>
                )}
              </button>

              <div className="flex flex-row items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6 active:animate-ping"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.398.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
                <h4 className="hidden text-sm pl-4">Configurar</h4>
              </div>
            </div> 
            */}

            {session?.user ? (
              <div className="flex flex-row items-center mt-2">
                <img
                  onClick={() => setMaxim(!maxim)}
                  src={`${session.user.image}`}
                  alt="User image"
                  className={`rounded-sm border-gray-800/80 cursor-pointer 
                  ${
                    maxim
                      ? " w-12 h-12 "
                      : " w-12 h-12 ml-2 Xactive:animate-ping"
                  }
                  `}
                />
                <div className="pl-5 text-left">
                  <p className="uppercase tracking-widest text-xs font-semibold text-gray-100">
                    {session.user.name}
                  </p>
                  <p className="text-xs text-gray-400">{session.user.email}</p>
                </div>
                <div className="hidden w-full Xflex justify-center space-x-5 pb-5 mb-5 border-b border-gray-500/30">
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
                      d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z"
                    />
                  </svg>

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
                      d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
                    />
                  </svg>

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
                      d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                    />
                  </svg>
                </div>
              </div>
            ) : (
              <>
                <div className="flex flex-row items-center">
                  <div
                    className={` flex items-center justify-center rounded-full border-2 border-gray-500  cursor-pointer text-gray-500
                  ${maxim ? " w-20 h-20 " : " w-20 h-20 "}
                  `}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-10 h-10"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                      />
                    </svg>
                  </div>
                  <div className="pl-5 text-left">
                    <p className="text-xl text-gray-200">
                      No ha iniciado session
                    </p>
                  </div>
                </div>
                <div className="w-full text-gray-500 flex justify-center space-x-5 pb-5 mb-5">
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
                      d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z"
                    />
                  </svg>

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
                      d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
                    />
                  </svg>

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
                      d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                    />
                  </svg>
                </div>
              </>
            )}

            <div className="mb-5"> </div>
            <br />
            <Link
              href={session?.user ? "/" : "#"}
              onClick={() => setMaxim(false)}
              className="flex flex-row items-center text-gray-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2.5"
                stroke="currentColor"
                className="w-6 h-6 active:animate-ping hover:scale-125 Xhover:-ml-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                />
              </svg>
              <h1
                className="uppercase tracking-widest text-xs font-semibold pl-4"
                hidden={!maxim}
              >
                Home
              </h1>
            </Link>

            <Link
              href={session?.user ? "/analytics" : "#"}
              onClick={() => setMaxim(false)}
              className="flex flex-row items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2.5"
                stroke="currentColor"
                className="w-6 h-6 active:animate-ping hover:scale-125 hover:-ml-2"
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
              <h1
                className="uppercase tracking-widest text-xs font-semibold pl-4"
                hidden={!maxim}
              >
                Analytics
              </h1>
            </Link>

            <Link
              href={session?.user ? "/form" : "#"}
              onClick={() => setMaxim(false)}
              className="flex flex-row items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2.5"
                stroke="currentColor"
                className="w-6 h-6 active:animate-ping hover:scale-125 hover:-ml-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>

              <h1
                className="uppercase tracking-widest text-xs font-semibold pl-4"
                hidden={!maxim}
              >
                Add
              </h1>
            </Link>

            <Link
              href={session?.user ? "/history" : "#"}
              onClick={() => setMaxim(false)}
              className="flex flex-row items-center active:animate-pulse"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2.5"
                stroke="currentColor"
                className="w-6 h-6 active:animate-ping hover:scale-125 hover:-ml-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              <h1
                className="uppercase tracking-widest text-xs font-semibold pl-4"
                hidden={!maxim}
              >
                History
              </h1>
            </Link>

            <Link
              href={session?.user ? "/category#list" : "#"}
              onClick={() => setMaxim(false)}
              className="flex flex-row items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2.5"
                stroke="currentColor"
                className="w-6 h-6 active:animate-ping hover:scale-125 hover:-ml-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 0 0 2.25-2.25V6a2.25 2.25 0 0 0-2.25-2.25H6A2.25 2.25 0 0 0 3.75 6v2.25A2.25 2.25 0 0 0 6 10.5Zm0 9.75h2.25A2.25 2.25 0 0 0 10.5 18v-2.25a2.25 2.25 0 0 0-2.25-2.25H6a2.25 2.25 0 0 0-2.25 2.25V18A2.25 2.25 0 0 0 6 20.25Zm9.75-9.75H18a2.25 2.25 0 0 0 2.25-2.25V6A2.25 2.25 0 0 0 18 3.75h-2.25A2.25 2.25 0 0 0 13.5 6v2.25a2.25 2.25 0 0 0 2.25 2.25Z"
                />
              </svg>
              <h1
                className="uppercase tracking-widest text-xs font-semibold pl-4"
                hidden={!maxim}
              >
                Category
              </h1>
            </Link>
          </div>

          {/** LOGOUT EN EL SVG */}
          {maxim && session?.user && (
            <div className="flex flex-row items-center cursor-pointer">
              <svg
                onClick={async () => await signOut({ callbackUrl: "/" })}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-7 h-7 active:animate-ping"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
                />
              </svg>
              <h4 className="text-sm pl-4">Cerrar sesion</h4>
            </div>
          )}
        </div>

        {/** INFO DEL USUARIO */}
        <div className="hidden bg-gradient-to-tl from-gray-900 to-red-900/90 h-full">
          {session?.user ? (
            <div className="flex flex-col items-center">
              <div className="bg-gray-900/20 w-full h-32"> </div>
              <img
                src={`${session.user.image}`}
                alt="user image"
                className="w-32 h-32 rounded-full border-4 border-gray-800/80 cursor-pointer -mt-14 mb-5"
              />
              <p className="">{session.user.name}</p>
              <p className="text-xs mb-5">{session.user.email}</p>
              <div className="w-full flex justify-center space-x-5 pb-5 mb-5 border-b border-gray-500/30">
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
                    d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z"
                  />
                </svg>

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
                    d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
                  />
                </svg>

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
                    d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                  />
                </svg>
              </div>
              <div className="w-full px-7 flex flex-row space-x-2">
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
                    d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.398.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
                <h4>Configurar</h4>
              </div>
              {/** LOGOUT Y CERRAR VENTANA */}
              <div className="w-full text-white flex flex-row items-center justify-between px-7 py-4 text-center">
                <div
                  onClick={async () => await signOut({ callbackUrl: "/" })}
                  className="cursor-pointer"
                >
                  <div className="flex flex-row space-x-2">
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
                        d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
                      />
                    </svg>
                    <h4>Cerrar sesion</h4>
                  </div>
                </div>

                <button
                  onClick={() => setNavbar(!navbar)}
                  className="w-8 h-8 text-gray-200 active:bg-none active:animate-ping focus:outline-none flex justify-center items-center"
                >
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
                      d="m19.5 8.25-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 bg-cyan-600 flex items-center justify-center rounded-full border-4 border-gray-100 cursor-pointer -mt-10 mb-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-10 h-10"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                  />
                </svg>
              </div>
              <p className="text-lg mb-5">
                No has <br /> iniciado sesion
              </p>
              <div className="w-full flex justify-center space-x-5 pb-5 mb-10 border-b border-gray-500/30 text-gray-400">
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
                    d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z"
                  />
                </svg>

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
                    d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
                  />
                </svg>

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
                    d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                  />
                </svg>
              </div>
              {/** LOGIN Y CERRAR VENTANA */}
              <div className="w-full text-white flex flex-row items-center justify-between px-7 py-4 text-center">
                <div onClick={() => signIn()} className="cursor-pointer">
                  <div className="flex flex-row space-x-2">
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
                        d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25"
                      />
                    </svg>
                    <h4>Iniciar sesion</h4>
                  </div>
                </div>

                <button
                  onClick={() => setNavbar(!navbar)}
                  className="w-8 h-8 text-gray-200 active:bg-none active:animate-ping focus:outline-none flex justify-center items-center"
                >
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
                      d="m19.5 8.25-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>
        {/** LOGOUT Y CERRAR VENTANA */}
        <div className="hidden bg-gray-700/70 text-white Xflex flex-row items-center justify-between px-7 py-4 text-center">
          {session?.user ? (
            <div
              onClick={async () => await signOut({ callbackUrl: "/" })}
              className=""
            >
              <div className="flex flex-row space-x-2">
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
                    d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
                  />
                </svg>
                <h4>Cerrar sesion</h4>
              </div>
            </div>
          ) : (
            <div className="">
              <button
                onClick={() => signIn()}
                className="bg-sky-400 px-5 py-2 rounded"
              >
                Sign In
              </button>
            </div>
          )}
          <button
            onClick={() => setNavbar(!navbar)}
            className="w-8 h-8 text-gray-200 active:bg-none active:animate-ping focus:outline-none flex justify-center items-center"
          >
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
                d="m19.5 8.25-7.5 7.5-7.5-7.5"
              />
            </svg>
          </button>
        </div>
      </ul>
    </div>
  );
};

export default Navbar;
