"use client";
import React, { useState } from "react";

const HistoryRow = (item: any) => {
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
    alert("eliminar doc con el id: " + id);
    //transactionDelete(id);
  };

  return (
    <>
      <div
        onClick={() => setIsOpen((prev) => !prev)}
        className=" flex flex-row text-gray-400 cursor-pointer"
      >
        <div className="mr-3 py-5 flex flex-col justify-between items-center">
          <img
            src={`./images/category/${item.category}.png`}
            className="w-20 bg-gray-500/50 rounded-md p-0.5"
            style={{ width: "35px" }}
            alt={item.category}
          />
          <div> </div>
        </div>
        <div className="relative w-full mr-3 py-5 flex flex-col border-b border-gray-500">
          <h1
            className={` ${
              item.type === "Income" ? " text-cyan-400 " : " text-white "
            } `}
          >
            $ {item.total.toFixed(2)}
          </h1>
          <h1 className="text-xl text-gray-300">{item.category}</h1>
          <h1 className="text-sm text-justify" hidden={isOpen}>
            {item.comment}
          </h1>
          <div
            onClick={() => handleDelete(item._id)}
            className="absolute text-gray-400 top-12 -right-3.5"
            hidden={isOpen}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.0"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9.75 14.25 12m0 0 2.25 2.25M14.25 12l2.25-2.25M14.25 12 12 14.25m-2.58 4.92-6.374-6.375a1.125 1.125 0 0 1 0-1.59L9.42 4.83c.21-.211.497-.33.795-.33H19.5a2.25 2.25 0 0 1 2.25 2.25v10.5a2.25 2.25 0 0 1-2.25 2.25h-9.284c-.298 0-.585-.119-.795-.33Z"
              />
            </svg>
          </div>
        </div>
        <div
          className={` w-20 pt-5 pl-4 text-center border-l border-gray-500 
            ${isOpen ? " " : " text-yellow-400 "}

            `}
        >
          <h1 className="text-3xl font-extralight">{item.date.substr(8, 2)}</h1>
          <h1 className="uppercase text-sm">{nameDiaxFecha(item.date)}</h1>
        </div>
      </div>
    </>
  );
};

export default HistoryRow;
