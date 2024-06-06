"use client";
import { Jost } from "next/font/google";
import { useState } from "react";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { deleteWallet } from "@/redux/features/walletSlice";
import ModalEdit from "./edit";
import Link from "next/link";

const number = Jost({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

const HistoryRow = ({ item }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const dispatch = useAppDispatch();

  const nameDiaxFecha = (fecha: any) =>
    [
      //"Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"
      "Dom",
      "Lun",
      "Mar",
      "Mié",
      "Jue",
      "Vie",
      "Sáb",
    ][new Date(fecha).getDay()];
  let groupDate = "";

  const handleOnClose = () => setIsEdit(false);

  const handleDelete = (id: string) => {
    let isDelete = window.confirm(
      //`Estas seguro de eliminar la transaccion con el id: ${id} ?`
      `UNA VEZ ELIMINADO, No podra recuperar el registro!`
    );
    if (isDelete) {
      dispatch(deleteWallet(id));
      alert("ELEMENTO CON EL ID: " + id + " ELIMINADO");
    }
  };

  return (
    <>
      <div className="hidden bg-[#333333] py-5 mb-2 ">
        <div
          className={` px-4 border-l-4 ${
            item.type === "Income" ? "border-cyan-600" : "border-pink-500"
          } `}
        >
          <div className="pb-1 flex flex-row justify-between">
            <h1 className="text-gray-200 text-lg">{item.category} </h1>
            <h1 className={`text-lg ${number.className} `}>
              -$ {item.total.toFixed(2)}{" "}
            </h1>
          </div>

          <div className="relative flex flex-row pt-1 border-t border-gray-700/30">
            {/** IMAGENES */}
            <div className="mr-3">
              <div
                className={` w-6 h-6 rounded-md transform transition-all duration-1000 ${
                  isOpen ? " bg-slate-600 rotate-90 " : ` bg-slate-600/30`
                } `}
              >
                {" "}
              </div>
              <img
                src={`./images/category/${item.category}.png`}
                className={`min-w-6 h-6 -mt-6 p-1 rounded-md transform transition-all duration-500 ${
                  isOpen ? " Xscale-110 xp-[2px] " : ` xp-1 bg-transparent`
                } 
          `}
                alt={item.category}
              />
            </div>
            {/** BUTTON COMMENT */}
            <div
              className={`mr-10 pt-1 transform transition-all duration-1000 ${
                !isOpen
                  ? " text-gray-500 text-xs w-44 truncate Xh-0.5"
                  : " text-gray-300 text-sm Xh-auto"
              } `}
            >
              {item.comment}
              {/**BOTONES  */}
              <span
                className={` ${isOpen && " text-gray-200 "} `}
                hidden={!isOpen}
              >
                {/** ADD EDIT DELET CLOSE */}
                <div className="flex text-gray-400 pt-3 justify-start gap-x-7">
                  <Link
                    href={"/form"}
                    //className="bg-red-700 rounded-md px-1 pb-0.5 text-xs"
                    className="xborder border-gray-700 rounded-md"
                  >
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
                        d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                  </Link>

                  <span
                    onClick={() => setIsEdit(true)}
                    //className="bg-red-700 rounded-md px-1 pb-0.5 text-xs"
                    className="xborder border-indigo-700 rounded-md"
                  >
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
                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                      />
                    </svg>
                  </span>

                  <span
                    onClick={() => handleDelete(item._id)}
                    //className="bg-red-700 rounded-md px-1 pb-0.5 text-xs"
                    className="xborder border-red-700 rounded-md"
                  >
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
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
                  </span>

                  <span
                    onClick={() => setIsOpen((prev) => !prev)}
                    //className="bg-red-700 rounded-md px-1 pb-0.5 text-xs"
                    className="xborder border-gray-700 rounded-md"
                  >
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
                        d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
                      />
                    </svg>
                  </span>
                </div>
              </span>
            </div>
            {/** BUTTON MAS INFO */}
            <div
              onClick={() => setIsOpen((prev) => !prev)}
              //hidden={isOpen}
              className="absolute top-2 right-0 text-gray-500 active:animate-ping"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className={`w-4 h-4 transform transition-all duration-300 ${
                  isOpen ? " rotate-180 " : " rotate-0 "
                }`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m19.5 8.25-7.5 7.5-7.5-7.5"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div
        //onClick={() => setIsOpen((prev) => !prev)}
        className={` hidden w-full Xflex flex-row justify-between Xborder-b border-gray-500/40 cursor-pointer ${number.className} `}
      >
        {/* INFO */}
        <div
          className={` w-full bg-gradient-to-br from-gray-800/40 to-gray-900/40 flex flex-col `}
        >
          <div className="w-full flex flex-row items-start">
            {/** IMAGENES */}
            <div className="relative h-full w-5 border-r border-gray-500/40  mr-5 ">
              <div
                className={` absolute top-7 -right-1.5 opacity-50 w-3 h-3 rounded-full transform transition-all duration-500 ${
                  isOpen
                    ? " bg-gray-300 scale-110 p-[2px] "
                    : ` p-1 bg-slate-600`
                } 
          `}
              />
            </div>

            <div className="p-5 w-full flex flex-col">
              <div className="w-full flex flex-row justify-between mb-1">
                {/** CATEGORY - BUTTON ISOPEN*/}
                <div
                  className={`flex flex-row  ${
                    isOpen ? " text-gray-300 " : " text-gray-200 "
                  } `}
                >
                  <span className="mr-5">{item.category}</span>
                  <span
                    className="flex text-gray-600 items-center ml-1"
                    onClick={() => setIsOpen((prev) => !prev)}
                  >
                    {!isOpen ? (
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
                    ) : (
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
                          d="m4.5 15.75 7.5-7.5 7.5 7.5"
                        />
                      </svg>
                    )}
                  </span>
                </div>
                {/** TOTAL */}
                <h1
                  className={`font-medium  ${
                    item.type === "Expense"
                      ? " text-pink-500"
                      : " text-teal-500"
                  }`}
                >
                  <span className={` Xm-[3px] Xtext-xs Xfont-bold `}>
                    {item.type === "Income" ? "+$ " : "-$ "}
                  </span>
                  {item.total.toFixed(2)}
                </h1>
              </div>

              <div className="relative">
                {/** COMMENT */}
                <div
                  className={` pr-5 transform transition-all duration-1000 ${
                    !isOpen
                      ? " text-gray-400 text-xs w-44 truncate "
                      : " text-gray-200 text-sm mt-3 "
                  } `}
                >
                  <span hidden={!isOpen}></span>
                  {item.comment}
                  {/**BOTONES  */}
                  <span
                    className={` ${isOpen && " text-gray-200 "} `}
                    hidden={!isOpen}
                  >
                    {/** ADD EDIT DELET CLOSE */}
                    <div className="flex text-gray-400 pt-3 justify-start gap-x-7">
                      <Link
                        href={"/form"}
                        //className="bg-red-700 rounded-md px-1 pb-0.5 text-xs"
                        className="xborder border-gray-700 rounded-md"
                      >
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
                            d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                          />
                        </svg>
                      </Link>

                      <span
                        onClick={() => setIsEdit(true)}
                        //className="bg-red-700 rounded-md px-1 pb-0.5 text-xs"
                        className="xborder border-indigo-700 rounded-md"
                      >
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
                            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                          />
                        </svg>
                      </span>

                      <span
                        onClick={() => handleDelete(item._id)}
                        //className="bg-red-700 rounded-md px-1 pb-0.5 text-xs"
                        className="xborder border-red-700 rounded-md"
                      >
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
                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                          />
                        </svg>
                      </span>

                      <span
                        onClick={() => setIsOpen((prev) => !prev)}
                        //className="bg-red-700 rounded-md px-1 pb-0.5 text-xs"
                        className="xborder border-gray-700 rounded-md"
                      >
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
                            d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
                          />
                        </svg>
                      </span>
                    </div>
                  </span>
                </div>
                {/* DATE - DIA */}
                <div className="absolute top-0 right-0 text-xs text-gray-400 whitespace-nowrap">
                  <span className="">{nameDiaxFecha(item.date)} </span>
                  <span className="">{item.date.substr(8, 2)} </span>
                  Abr 2024
                </div>
              </div>
            </div>
          </div>

          {/** MODAL EDIT */}
          <div className="hidden w-full h-screen fixed z-50 top-0 left-0 bg-white/50">
            <div className="flex bg-gray-400 text-black items-center justify-center">
              <div className="px-5">
                <h1 className="py-5 border-b">Modal Edit Wallet</h1>
                <h1>ID: {item._id}</h1>
                <h1>Date: {item.category}</h1>
                <h1>Total:</h1>
                <input type="text" defaultValue={item.total} className="p-3" />
                <h1>Descripcion:</h1>
                <textarea rows={3} defaultValue={item.comment} />
              </div>

              <div className="py-5">
                <div onClick={() => setIsEdit(false)}>cerrar</div>
              </div>
            </div>
          </div>
          <div className="hidden w-full h-screen p-5 fixed z-50 top-0 left-0 bg-white/50 xflex items-center justify-center">
            {" "}
          </div>
          <ModalEdit item={item} onClose={handleOnClose} visible={isEdit} />
          {/** DELETE */}
          <div
            onClick={() => handleDelete(item._id)}
            className=" hidden absolute text-white bg-red-500/50 xrounded-xl bottom-0 left-14 px-1"
            hidden={!isOpen}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
            </svg>
          </div>
        </div>
      </div>

      <div
        //onClick={() => setIsOpen((prev) => !prev)}
        className={` Xhidden w-full flex flex-row bg-[#333333] text-gray-400 cursor-pointer $ {inter.className} `}
      >
        {/** IMAGENES */}
        <div className="px-3 pt-7">
          <div
            className={` w-6 h-6 rounded-md transform transition-all duration-1000 ${
              isOpen ? " bg-gray-300 rotate-90 " : ` bg-gray-700/50`
            } `}
          >
            {" "}
          </div>
          <img
            src={`./images/category/${item.category}.png`}
            className={`min-w-6 h-6 -mt-6 p-1 rounded-md transform transition-all duration-500 ${
              isOpen ? " Xscale-110 xp-[2px] " : ` xp-1 bg-transparent`
            } 
          `}
            alt={item.category}
          />
        </div>

        {/* INFO */}
        <div className="w-full relative mr-5 py-7 flex flex-col border-b border-gray-500/20">
          <div className="relative w-full flex flex-row justify-between items-start">
            {/** CATEGORY - COMMENT - BUTTON */}
            <div className="w-full">
              <div
                className={` ${
                  isOpen ? " text-gray-500 " : " text-gray-200 Xfont-medium "
                } `}
              >
                {item.category}
              </div>

              <h1
                onClick={() => setIsOpen(true)}
                className={` relative -mt-1 transform transition-all duration-1000 ${
                  !isOpen
                    ? " text-xs text-gray-500 w-44 truncate "
                    : " text-gray-200 text-sm mt-3 "
                } `}
              >
                <span className="relative">
                  {item.comment}

                  <span
                    onClick={() => setIsOpen((prev) => !prev)}
                    className="text-gray-400 absolute top-1 -right-5"
                    hidden={isOpen}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-3 h-3"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m19.5 8.25-7.5 7.5-7.5-7.5"
                      />
                    </svg>
                  </span>
                </span>
              </h1>

              {/**BOTONES  */}
              <div
                className={` ${isOpen && " text-gray-200 "} `}
                hidden={!isOpen}
              >
                {/** ADD EDIT DELET CLOSE */}
                <div className="w-full flex text-gray-400 pt-4 justify-between">
                  <Link
                    href={"/form"}
                    //className="bg-red-700 rounded-md px-1 pb-0.5 text-xs"
                    className="py-1 px-3 bg-gray-700/50 rounded-sm"
                  >
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
                        d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                  </Link>

                  <span
                    onClick={() => setIsEdit(true)}
                    //className="bg-red-700 rounded-md px-1 pb-0.5 text-xs"
                    className="py-1 px-3 bg-gray-700/50 rounded-sm"
                  >
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
                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                      />
                    </svg>
                  </span>

                  <span
                    onClick={() => handleDelete(item._id)}
                    //className="bg-red-700 rounded-md px-1 pb-0.5 text-xs"
                    className="py-1 px-3 bg-gray-700/50 rounded-sm"
                  >
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
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
                  </span>

                  <span
                    onClick={() => setIsOpen((prev) => !prev)}
                    //className="bg-red-700 rounded-md px-1 pb-0.5 text-xs"
                    className="py-1 px-3 bg-gray-700/50 rounded-sm"
                  >
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
                        d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
            {/** BOTTON MAS INFO */}
            <span
              onClick={() => setIsOpen((prev) => !prev)}
              className="hidden absolute top-6 right-0"
              hidden={isOpen}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-3 h-3"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m19.5 8.25-7.5 7.5-7.5-7.5"
                />
              </svg>
            </span>

            {/** TOTAL */}
            <div className="absolute top-0 right-0">
              <h1
                className={`flex tracking-wider Xfont-medium ${
                  number.className
                } ${
                  item.type === "Expense" ? " text-pink-500" : " text-cyan-600"
                }`}
              >
                <span className={` Xm-[3px] Xtext-xs Xfont-bold `}>
                  {item.type === "Income" ? "$ " : "-$ "}
                </span>
                {item.total.toFixed(2)}
              </h1>
            </div>
            {/** MODAL EDIT */}
          </div>
        </div>

        {/* DATE - DIA */}
        <div
          className={` relative min-w-16 pt-6 text-center border-l border-gray-500/30 
                    ${isOpen && " text-gray-100 font-medium "}           `}
        >
          {item.date.substr(5, 5) === "groupDate" ? (
            <></>
          ) : (
            <>
              <h1 className={`text-2xl font-extralight ${number.className}`}>
                {item.date.substr(8, 2)}
              </h1>
              <h1 className="uppercase text-xs -mt-1">
                {nameDiaxFecha(item.date)}
              </h1>
              <div
                className={`hidden absolute top-10 -left-1.5 w-3 h-3 bg-gray-700 border-2 border-gray-500 rounded-full ${
                  isOpen && " border-pink-600 "
                } `}
              >
                {" "}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default HistoryRow;
