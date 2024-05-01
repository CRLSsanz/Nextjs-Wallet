"use client";
import { Montserrat } from "next/font/google";
import { useState } from "react";

const inter = Montserrat({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

const HistoryRow = ({ item }: any) => {
  const [isOpen, setIsOpen] = useState(false);
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

  const handleDelete = (id: string) => {
    let isDelete = window.confirm(
      //`Estas seguro de eliminar la transaccion con el id: ${id} ?`
      `UNA VEZ ELIMINADO, No podra recuperar el registro!`
    );
    if (isDelete) {
      alert("ELEMENTO CON EL ID: " + id + " ELIMINADO");
    }
  };

  return (
    <>
      <div
        onClick={() => setIsOpen((prev) => !prev)}
        className={` xhidden w-full px-2 mb-2 flex flex-row justify-between text-gray-400 cursor-pointer ${inter.className} `}
      >
        {/* DATE - DIA */}
        <div
          className={` Xhidden relative min-w-12 pt-4 Xpx-2 text-center Xborder-r border-gray-500 
                    ${isOpen && " text-yellow-400 "}
                    `}
        >
          {item.date.substr(5, 5) === "groupDate" ? (
            <></>
          ) : (
            <>
              <h1 className="text-2xl font-extralight">
                {item.date.substr(8, 2)}
              </h1>
              <h1 className="uppercase text-xs -mt-2">
                {nameDiaxFecha(item.date)}
              </h1>
              <div
                className={` hidden absolute top-10 -left-1.5 w-3 h-3 bg-gray-700 border-2 border-gray-500 rounded-full ${
                  isOpen && " border-pink-600 "
                } `}
              >
                {" "}
              </div>
            </>
          )}
        </div>

        {/* INFO */}
        <div
          className={` w-full relative ${
            item.type === "Expense" ? " pr-2 pb-2 " : " pr-2 pb-2 "
          } `}
        >
          <div
            className={` absolute bottom-0 rounded-b-3xl
          ${
            item.type === "Expense"
              ? " right-0 w-40 h-16 bg-gradient-to-tl from-pink-600/90 via-transparent Xbg-pink-600/90 "
              : " right-0 w-40 h-16 bg-gradient-to-tl from-indigo-600/90 via-transparent  Xbg-indigo-600/90 "
          }`}
          ></div>

          <div
            className={` w-full relative py-5 px-3 rounded-2xl flex flex-col  ${
              isOpen ? "bg-gray-600/50 " : "bg-gradient-to-tl from-gray-800/70"
            }`}
          >
            <div className="w-full flex flex-row justify-between items-center">
              <div className="flex flex-row items-center">
                <div className="pr-3 ">
                  <img
                    src={`./images/category/${item.category}.png`}
                    className={`w-8 h-8 rounded-md transform transition-all duration-500 ${
                      isOpen
                        ? " bg-gray-300 scale-110 p-[2px] "
                        : ` p-1 bg-slate-600`
                    } 
          `}
                    alt={item.category}
                  />
                </div>
                <div>
                  <h1
                    className={`   ${
                      isOpen
                        ? " text-gray-400 "
                        : " text-gray-200 Xfont-medium "
                    } `}
                  >
                    {item.category}
                  </h1>

                  <div
                    className={` -mt-1 w-40 text-xs truncate "} `}
                    hidden={isOpen}
                  >
                    {item.comment}
                  </div>
                </div>
              </div>

              <div>
                <h1
                  className={`flex text-base tracking-wider  ${
                    item.type === "Expense"
                      ? " text-gray-200 "
                      : " text-gray-200 Xfont-medium "
                  }`}
                >
                  <span className={` m-[3px] text-xs Xfont-bold `}>
                    {item.type === "Income" ? "$ " : "$ "}
                  </span>
                  {item.total.toFixed(2)}
                </h1>
              </div>
            </div>
            {/** NOTA */}
            <div
              className={` pt-2 w-[calc(100vw-130px)] text-sm ${
                !isOpen && " truncate "
              } `}
              hidden={!isOpen}
            >
              <span
                className={` font-semibold ${
                  isOpen
                    ? " text-white "
                    : item.type === "Expense"
                    ? " Xborder-b border-pink-600 "
                    : " Xborder-b border-indigo-600 "
                }   
              `}
              >
                Nota:{" "}
              </span>
              <span className={` ${isOpen && " text-gray-200 "} `}>
                {item.comment}
              </span>
            </div>
            {/** DELETE */}
            <div
              onClick={() => handleDelete(item._id)}
              className=" hidden absolute text-white bg-red-600/50 Xrounded-2xl top-0 right-0 p-0.5"
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
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 12h14"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div
        onClick={() => setIsOpen((prev) => !prev)}
        className={`hidden w-full xflex flex-row justify-between text-gray-400 cursor-pointer ${inter.className} `}
      >
        {/* TIME LINE */}
        <div className={` relative min-w-12 flex justify-center `}>
          <div className="w-0.5 bg-gray-600 h-full "> </div>
          <div
            className={`absolute top-5 left-4  bg-gray-700 border-2 rounded-full transition-all duration-500
                ${
                  !isOpen
                    ? " border-gray-500 w-4 h-4 "
                    : ` w-6 h-6 ${
                        item.type === "Expense"
                          ? " -ml-1 border-pink-600 "
                          : " -ml-1 border-indigo-600 "
                      }`
                } `}
          >
            <span
              onClick={() => handleDelete(item._id)}
              className="flex justify-center items-center"
            >
              {isOpen && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2.5"
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 12h14"
                  />
                </svg>
              )}
            </span>
          </div>
        </div>

        {/* ICONO */}
        <div className=" hidden w-20 pl-4 py-6 ">
          <img
            src={`./images/category/${item.category}.png`}
            className={`w-2.5 rounded-full transform transition-all duration-500 ${
              isOpen
                ? " bg-gray-800 mt-3 scale-[3.0] p-[1px] "
                : ` mt-1 p-1 ${
                    item.type === "Expense"
                      ? " bg-pink-600 "
                      : " bg-indigo-600 "
                  }`
            } 
          `}
            alt={item.category}
          />
        </div>

        <div className="hidden px-4 pt-6 ">
          <div
            className={` flex items-center justify-center w-6 h-6 rounded-md bg-gray-800/50 
        ${
          item.type === "Expense"
            ? " rotate-[45deg] text-pink-600"
            : " -rotate-[45deg] text-indigo-600 "
        }
        `}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="3.0"
              stroke="currentColor"
              className="w-3 h-3"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                //d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
              />
            </svg>
          </div>
        </div>

        {/* INFO */}
        <div
          className={` w-full relative p-5 mr-5 mb-5 flex flex-col bg-gray-800/50 border 
        ${
          !isOpen
            ? " border-gray-400/30 "
            : ` border-gray-400  ${
                item.type === "Expense"
                  ? " bg-pink-600/90 "
                  : " bg-indigo-600/90 "
              }`
        } 
        `}
        >
          <div className="flex flex-row justify-between">
            <h1 className="text-base text-gray-300">{item.category}</h1>
            <h1
              className={`X-mt-1 text-base tracking-wider  ${
                item.type === "Expense"
                  ? " text-white "
                  : " text-gray-200 Xfont-medium "
              }`}
            >
              <span className={` Xtext-sm Xfont-bold `}>
                {item.type === "Income" ? "+ € " : "- € "}
              </span>
              {item.total.toFixed(2)}
            </h1>
          </div>

          <div
            className={` w-[calc(100vw-120px)] text-sm  py-1 ${
              !isOpen && " truncate "
            } `}
          >
            <span
              className={` font-semibold ${
                isOpen
                  ? " text-white "
                  : item.type === "Expense"
                  ? " text-pink-600 "
                  : " text-indigo-600 "
              }   
              `}
            >
              Nota:{" "}
            </span>
            <span className={` ${isOpen && " text-gray-200 "} `}>
              {item.comment}
            </span>
          </div>

          <div
            onClick={() => handleDelete(item._id)}
            className="hidden absolute text-gray-600 bottom-4 right-3"
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
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
              />
            </svg>
          </div>
        </div>
      </div>

      <div
        onClick={() => setIsOpen((prev) => !prev)}
        className={` hidden w-full xflex flex-row justify-between text-gray-400 cursor-pointer ${inter.className} `}
      >
        {/* ICONO */}
        <div className=" w-20 pl-4 py-6 ">
          <img
            src={`./images/category/${item.category}.png`}
            className={`w-2.5 rounded-full transform transition-all duration-500 ${
              isOpen
                ? " bg-gray-800 mt-3 scale-[3.0] p-[1px] "
                : ` mt-1 p-1 ${
                    item.type === "Expense"
                      ? " bg-pink-600 "
                      : " bg-indigo-600 "
                  }`
            } 
          `}
            alt={item.category}
          />
        </div>

        <div className="hidden px-4 pt-6 ">
          <div
            className={` flex items-center justify-center w-6 h-6 rounded-md bg-gray-800/50 
        ${
          item.type === "Expense"
            ? " rotate-[45deg] text-pink-600"
            : " -rotate-[45deg] text-indigo-600 "
        }
        `}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="3.0"
              stroke="currentColor"
              className="w-3 h-3"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                //d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
              />
            </svg>
          </div>
        </div>
        {/* INFO */}
        <div className="w-full relative mr-5 py-5 flex flex-col border-b border-gray-500">
          <div className="Xtext-end">
            <h1
              className={`X-mt-1 text-base tracking-wider  ${
                item.type === "Expense"
                  ? " text-white "
                  : " text-gray-200 Xfont-medium "
              }`}
            >
              <span className={` Xtext-sm Xfont-bold `}>
                {item.type === "Income" ? "+ € " : "- € "}
              </span>
              {item.total.toFixed(2)}
            </h1>
            <h1 className="text-base text-gray-300">{item.category}</h1>
          </div>

          <div
            className={` Xbg-gradient-to-l Xfrom-pink-700 Xvia-transparent text-sm Xtext-justify py-1 `}
            hidden={!isOpen}
          >
            <span
              className={` font-semibold ${
                item.type === "Expense"
                  ? " text-pink-600 "
                  : " text-indigo-600 "
              }`}
            >
              Nota: <br />{" "}
            </span>{" "}
            <p className="w-[calc(100vw-160px)] Xpl-5 truncate">
              {item.comment}
            </p>
          </div>

          <div
            onClick={() => handleDelete(item._id)}
            className="absolute text-gray-600 top-6 right-1"
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
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
              />
            </svg>
          </div>
        </div>

        {/* DATE - DIA */}
        <div
          className={` relative min-w-20 pt-3 px-5 text-center border-l border-gray-500 
                    ${isOpen && " text-yellow-400 "}
                    `}
        >
          {item.date.substr(5, 5) === "groupDate" ? (
            <></>
          ) : (
            <>
              <h1 className="text-3xl font-extralight">
                {item.date.substr(8, 2)}
              </h1>
              <h1 className="uppercase text-sm">{nameDiaxFecha(item.date)}</h1>
              <div
                className={`absolute top-10 -left-1.5 w-3 h-3 bg-gray-700 border-2 border-gray-500 rounded-full ${
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
