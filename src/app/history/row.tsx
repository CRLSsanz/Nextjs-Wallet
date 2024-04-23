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
    <div
      onClick={() => setIsOpen((prev) => !prev)}
      className={`flex flex-row text-gray-400 cursor-pointer ${inter.className} `}
    >
      {/* DATE - DIA */}
      <div
        className={` w-20 pt-5 pr-4 text-center border-r border-gray-500 
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
          </>
        )}
      </div>

      {/* INFO */}
      <div className="relative w-full ml-5 py-5 flex flex-col border-b border-gray-500">
        <div className="flex flex-row">
          {/* ICONO */}
          <div className="w-10 pl-3 Xpy-6 ">
            <img
              src={`./images/category/${item.category}.png`}
              className={`w-2.5 rounded-full transform transition-all duration-500 ${
                isOpen
                  ? " bg-gray-200 mt-3.5 scale-[3.0] p-[1px] "
                  : ` mt-2 p-1 ${
                      item.type === "Expense"
                        ? " bg-pink-600 "
                        : " bg-indigo-600 "
                    }`
              } 
          `}
              alt={item.category}
            />
          </div>

          <div className="w-full text-end">
            <h1 className="Xtext-xl text-gray-300">{item.category}</h1>
            <h1
              className={`-mt-1 text-xl tracking-wider  ${
                item.type === "Expense"
                  ? " text-white "
                  : " text-indigo-500 font-medium "
              }`}
            >
              <span className={` Xtext-sm Xfont-bold `}>
                {item.type === "Income" ? "$ " : "-$ "}
              </span>
              {item.total.toFixed(2)}
            </h1>
          </div>
        </div>
        <h1 className={` text-sm Xtext-justify py-1 pr-8`} hidden={!isOpen}>
          <span className="font-semibold">
            Nota: <br />{" "}
          </span>{" "}
          {item.comment}
        </h1>

        <div
          onClick={() => handleDelete(item._id)}
          className="absolute text-gray-600 bottom-6 right-1"
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
  );
};

export default HistoryRow;
