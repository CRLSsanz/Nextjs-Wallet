"use client";
import React, { useState } from "react";
import { Barlow, Montserrat } from "next/font/google";
import Link from "next/link";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { addWallet } from "@/redux/features/walletSlice";

const inter = Montserrat({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "600", "700"],
});

const accounts = [
  "Efectivo", // 	FLF - fondo de libertad financiera, dinero para multiplicar invertir
  "Cuenta Bancaria", //	NEC - nececidades, todos los gastos basicos, fijos, responsabiloidad para vivir
  "Tarjeta de credito", // JUE - para pasarla bien
  "Caja fuerte", //	EDU - comprar libro, cursos online
  "Otros", //		ALP - ahorro a largo plazo, compras de aqui a 10 anos
  "Otros", //		DAR - caja del dar, regalar
];

const expensesCategory = [
  "Alimentos y bebidas", // compras en el supermercado
  "Automovil", // gasolina, reparaciones, labado, otros
  "Bebe", // compras para bebe.
  "Belleza e higiene", // gym, spa, peluqueria, accesorios, productos de limpieza otros
  "Casa o vivienda", // muebles, alquiler, reparaciones.
  "Celular", // accesorios o pago de linea,
  "Cine", // cine, transporte y comida,
  "Computadora", // computadora laptop o accesorios,
  "Dulces", // Dulces helados chocolate etc,
  "Entretenimiento", // divercion salidas juegos mecanicos,
  "Equipos electronicos", //artefactos, pc,
  "Estudios formacion", // libros, cursos, etc
  "Facturas y pagos", //luz, gas, agua, celu, tv, inter, otros
  "Mascota", // veterinaria, comida, otros
  "Propina", // Propinas,
  "Regalos", // cumpleanos, obsequios, otros
  "Restaurante", // comida fuera de casa
  "Ropa y calzado", //ropa, calzado, accesorios
  "Salud", // dentista, medicos, farmacia, otros.
  "Transporte", // pasajes, taxi, carne de pasaje, otros
  "Vacaciones", // paseos, playas, viajes.
  "Video juegos", // paseos, playas, viajes.
  "Otros gastos",
];

const hoy = new Date().toISOString();
//console.log(hoy);

interface Registro {
  //name: String;
  //age: number;
  //gender?: "Male" | "Female"; // interrogante es para opcional
  date: String;
  account: String;
  total: number;
  category: String;
  comment: String;
  type: String;
}

const initailForm = {
  //_id: null,
  //date: new Date(),
  date: hoy.substr(0, 10),
  account: "Efectivo" || "Ahorro",
  total: 34,
  category: "",
  comment: "",
  type: "Expense" || "Income",
  //status: "",
};

const FormPage = () => {
  const [form, setForm] = useState(initailForm);
  const dispatch = useAppDispatch();

  const handleChange = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    /*
    const type = "Expense";
    const account = e.target.elements.account.value;
    const category = e.target.elements.category.value;
    const total = e.target.elements.total.value;
    const date = e.target.elements.date.value;
    const description = e.target.elements.description.value;
    
    //console.log(type, account, category, date, description, total);
    */

    dispatch(addWallet(form));

    //refComment.current.value = "";
    //refTotal.current.value = "";
    //refNewFecha.current.value = hoy.substr(0, 10);

    setForm(initailForm);

    //window.location = "/transactions";
    //navigate("/transactions");
    alert("DATA SEND: " + JSON.stringify(form.category));
  };

  return (
    <section className={inter.className}>
      <div className="w-full p-5 text-white  flex flex-row justify-between items-center mb-5">
        <div className="flex flex-row items-center">
          <Link href={"/history"} className="mr-3">
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
        <h1 className="text-gray-300">Nuevo registro</h1>
        <h1 className="h-12"> </h1>
      </div>

      <div className="p-5 text-gray-100 Xmb-5">
        <h1 className="hidden text-5xl font-thin -tracking-wider mb-5">
          Nuevo registro
        </h1>
        <p className="text-lg">Completa el formulario</p>
        <p className="text-gray-400">Todos los campos son obligatorios *</p>
      </div>

      <div className="pb-10">
        <form
          onSubmit={handleSubmit}
          className="w-full text-gray-200 Xborder-2 p-5"
        >
          {/** TYPE */}
          <div className="flex flex-row mb-10">
            <div className="hidden bg-gray-800/50 py-3 w-14 Xflex justify-center">
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
                  d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3"
                />
              </svg>
            </div>
            <div className="w-full flex flex-row text-center">
              <span className="w-1/2 p-3 bg-pink-600/90 focus:outline-none">
                Gastos
              </span>
              <span className="w-1/2 p-3 bg-indigo-600/90 cyan-600 /70 focus:outline-none">
                Ingreso
              </span>
            </div>
          </div>
          {/** ACCOUNT */}
          <div className="hidden Xflex flex-row mb-5">
            <div className="bg-gray-800/50 py-3 w-14 flex justify-center">
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
                  d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3"
                />
              </svg>
            </div>
            <div className="w-full relative">
              <select
                name="account"
                onChange={handleChange}
                className="w-full p-3 bg-gray-600/50 appearance-none focus:outline-none"
                //value={form.account}
              >
                <option>Cuenta</option>
                {accounts.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </select>

              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
          {/** CATEGORY */}
          <div className="flex flex-row mb-5">
            <div className="bg-gray-800/50 py-3 w-14 flex justify-center">
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
                  d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
              </svg>
            </div>
            <div className="w-full relative">
              <select
                name="category"
                onChange={handleChange}
                className="w-full p-3 bg-gray-600/50 appearance-none focus:outline-none"
                //value={form.account}
              >
                <option className="text-gray-600">Categoria</option>
                {expensesCategory.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </select>

              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
          {/** TOTAL */}
          <div className="flex flex-row mb-5">
            <div className="bg-gray-800/50 py-3 w-14 flex justify-center">
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
                  d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </div>
            <input
              type="number"
              name="XXXtotal"
              onChange={handleChange}
              className="w-full p-3 bg-gray-600/50 focus:outline-none"
              placeholder="Precio, monto, saldo"
            />
          </div>
          {/** DATE */}
          <div className="flex flex-row mb-5">
            <div className="bg-gray-800/50 py-3 w-14 flex justify-center">
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
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
                />
              </svg>
            </div>
            <div className="w-full relative">
              <input
                type="date"
                name="date"
                onChange={handleChange}
                className="w-full p-3 bg-gray-600/50 appearance-none focus:outline-none"
                placeholder="Fecha"
                defaultValue={hoy.substr(0, 10)}
              />
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
          {/** DESCRIPTION */}
          <div className="flex flex-row items-start mb-10">
            <div className="bg-gray-800/50 py-3 w-14 flex justify-center">
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
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                />
              </svg>
            </div>
            <textarea
              name="comment"
              onChange={handleChange}
              rows={3}
              className="w-full p-3 bg-gray-600/50 focus:outline-none"
              placeholder="Descripcion, detalle, nota"
            />
          </div>
          {/** BUTTON SAVE */}
          <div className="flex flex-row mb-5">
            <Link
              href={"/"}
              className="bg-red-600/90 py-3 w-14 flex justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                />
              </svg>
            </Link>
            <button className="w-full p-3 bg-gray-400/60 focus:outline-none">
              Guardar
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default FormPage;
