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
      <div className="w-10 pr-3 py-6 ">
        <img
          src={`./images/category/${item.category}.png`}
          className={`w-2.5 bg-gray-200 rounded-full transform transition-all duration-500 ${
            isOpen ? " mt-2.5 scale-[3.0] p-[1px] " : " mt-0.5 p-1 "
          } `}
          alt={item.category}
        />
      </div>

      <div className="relative w-full mr-5 py-5 flex flex-col border-b border-gray-500">
        <h1 className="text-base text-gray-300">{item.category}</h1>
        <h1
          className={`-mt-1 text-xl  ${
            item.type === "Expense"
              ? " text-pink-600 font-medium "
              : " text-indigo-600 font-medium "
          }`}
        >
          <span className={` text-sm Xfont-bold`}>
            $ {/*item.type === "Income" ? " + " : " - "*/}
          </span>
          {item.total.toFixed(2)}
        </h1>
        <h1
          className={` text-sm text-justify h-auto transform transition-all duration-1000 `}
          hidden={!isOpen}
        >
          {item.comment}
        </h1>
        <div
          onClick={() => handleDelete(item._id)}
          className="absolute text-gray-300 top-10 -right-8 rounded-full bg-gray-600 p-0.5"
          hidden={!isOpen}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
          </svg>
        </div>
      </div>
      {/* DATE - DIA */}
      <div
        className={` w-20 pt-5 pl-4 text-center border-l border-gray-500 
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
    </div>
  );
};

export default HistoryRow;
