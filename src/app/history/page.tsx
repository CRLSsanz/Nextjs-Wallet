"use client";

import UserList from "@/components/UserList";
import { Montserrat } from "next/font/google";
import { useState } from "react";
import HistoryRow from "./row";
import Link from "next/link";

const inter = Montserrat({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

const bd = [
  /*{
    "_id": "6615e2c6821f539ff31ceb5b",
    "category": "Celular",
    "comment": "Linea de celular en Wintre ",
    "date": "2024-04-19T00:00:00.000Z",
    "total": 10,
    "type": "Expense",
    "account": "Efectivo",
    "createdAt": "2024-04-10T00:52:22.492Z",
    "updatedAt": "2024-04-10T00:52:22.492Z",
    "__v": 0
  },
  {
    "_id": "66220bf68707b8496983c27c",
    "category": "Restaurante",
    "comment": "Pizza kebab ",
    "date": "2024-04-17T00:00:00.000Z",
    "total": 1,
    "type": "Expense",
    "account": "Efectivo",
    "createdAt": "2024-04-19T06:15:18.233Z",
    "updatedAt": "2024-04-19T06:15:18.233Z",
    "__v": 0
  },
  {
    "_id": "66220c1c8707b8496983c27f",
    "category": "Propina",
    "comment": "Para Zoé compra de un cuaderno ",
    "date": "2024-04-16T00:00:00.000Z",
    "total": 1,
    "type": "Expense",
    "account": "Efectivo",
    "createdAt": "2024-04-19T06:15:56.799Z",
    "updatedAt": "2024-04-19T06:15:56.799Z",
    "__v": 0
  },
  {
    "_id": "661cd447db828b5fc96a799d",
    "category": "Alimentos y bebidas",
    "comment": "acqua x6 y uova x18",
    "date": "2024-04-15T00:00:00.000Z",
    "total": 4,
    "type": "Expense",
    "account": "Efectivo",
    "createdAt": "2024-04-15T07:16:23.463Z",
    "updatedAt": "2024-04-15T07:16:23.463Z",
    "__v": 0
  },
  {
    "_id": "66195eee9292acdd9e0d815e",
    "category": "Alimentos y bebidas",
    "comment": "Para preparar chaufa: Salsa de soya 1€ y cebolla china 1€",
    "date": "2024-04-12T00:00:00.000Z",
    "total": 2,
    "type": "Expense",
    "account": "Efectivo",
    "createdAt": "2024-04-12T16:18:54.613Z",
    "updatedAt": "2024-04-12T16:18:54.613Z",
    "__v": 0
  },
  {
    "_id": "6615e141edd51a8a031ccb82",
    "category": "Propina",
    "comment": "Para Zoé ",
    "date": "2024-04-07T00:00:00.000Z",
    "total": 2,
    "type": "Expense",
    "account": "Efectivo",
    "createdAt": "2024-04-10T00:45:53.314Z",
    "updatedAt": "2024-04-10T00:45:53.314Z",
    "__v": 0
  },
  {
    "_id": "6610713856d0d1f365a0a913",
    "category": "Alimentos y bebidas",
    "comment": "Huevo, agua, macarrones y como de helado x6",
    "date": "2024-04-05T00:00:00.000Z",
    "total": 8,
    "type": "Expense",
    "account": "Efectivo",
    "createdAt": "2024-04-05T21:46:32.519Z",
    "updatedAt": "2024-04-05T21:46:32.519Z",
    "__v": 0
  },
  {
    "_id": "6610716456d0d1f365a0a918",
    "category": "Salario",
    "comment": "Cero ingreso ",
    "date": "2024-04-01T00:00:00.000Z",
    "total": 0,
    "type": "Income",
    "account": "Efectivo",
    "createdAt": "2024-04-05T21:47:16.956Z",
    "updatedAt": "2024-04-05T21:47:16.956Z",
    "__v": 0
  },
  {
    "_id": "6600c39cfa39083035e84bea",
    "category": "Alimentos y bebidas",
    "comment": "Kion de stazione un frasco ",
    "date": "2024-03-24T00:00:00.000Z",
    "total": 2,
    "type": "Expense",
    "account": "Efectivo",
    "createdAt": "2024-03-25T00:21:49.000Z",
    "updatedAt": "2024-03-25T00:21:49.000Z",
    "__v": 0
  },
  {
    "_id": "6600c36cfa39083035e84be7",
    "category": "Servicios",
    "comment": "Mudanza en 5to piso de los raros",
    "date": "2024-03-23T00:00:00.000Z",
    "total": 20,
    "type": "Income",
    "account": "Efectivo",
    "createdAt": "2024-03-25T00:21:00.364Z",
    "updatedAt": "2024-03-25T00:21:00.364Z",
    "__v": 0
  },
  {
    "_id": "65fc802da01cdabf45dfa890",
    "category": "Belleza e higiene",
    "comment": "Desodorante roll-on 3€ y senzodine 3.5€",
    "date": "2024-03-21T00:00:00.000Z",
    "total": 6,
    "type": "Expense",
    "account": "Efectivo",
    "createdAt": "2024-03-21T18:45:01.479Z",
    "updatedAt": "2024-03-21T18:45:01.479Z",
    "__v": 0
  },
  {
    "_id": "65fc80a2a01cdabf45dfa894",
    "category": "Facturas y pagos",
    "comment": "Recibo Wintre ",
    "date": "2024-03-19T00:00:00.000Z",
    "total": 10,
    "type": "Expense",
    "account": "Efectivo",
    "createdAt": "2024-03-21T18:46:58.469Z",
    "updatedAt": "2024-03-21T18:46:58.469Z",
    "__v": 0
  },
  {
    "_id": "65f660e2e4b6e0d6c9856f83",
    "category": "Alimentos y bebidas",
    "comment": "Agua x6 y fideo macarrones ",
    "date": "2024-03-10T00:00:00.000Z",
    "total": 3,
    "type": "Expense",
    "account": "Efectivo",
    "createdAt": "2024-03-17T03:17:54.915Z",
    "updatedAt": "2024-03-17T03:17:54.915Z",
    "__v": 0
  },
  {
    "_id": "65f66090e4b6e0d6c9856f80",
    "category": "Restaurante",
    "comment": "Pizza kebab ",
    "date": "2024-03-02T00:00:00.000Z",
    "total": 11,
    "type": "Expense",
    "account": "Efectivo",
    "createdAt": "2024-03-17T03:16:32.172Z",
    "updatedAt": "2024-03-17T03:16:32.172Z",
    "__v": 0
  },
  {
    "_id": "65de5d4d64b5e8a6cf936612",
    "category": "Estudios formacion",
    "comment": "Cuadernos uno rallado y uno cuadrículado. Y una Agenda 2.8€",
    "date": "2024-02-26T00:00:00.000Z",
    "total": 5,
    "type": "Expense",
    "account": "Efectivo",
    "createdAt": "2024-02-27T22:08:13.204Z",
    "updatedAt": "2024-02-27T22:08:13.204Z",
    "__v": 0
  },
  {
    "_id": "65de5cf964b5e8a6cf93660f",
    "category": "Alimentos y bebidas",
    "comment": "Cumple de Zoé para el domingo lomo saltado. Arroz 2.8 cebolla 0.5 comino 0.5 y sublime 1.2€",
    "date": "2024-02-24T00:00:00.000Z",
    "total": 3,
    "type": "Expense",
    "account": "Efectivo",
    "createdAt": "2024-02-27T22:06:49.847Z",
    "updatedAt": "2024-02-27T22:06:49.847Z",
    "__v": 0
  },
  {
    "_id": "65d4f4b318c000f00df159a2",
    "category": "Alimentos y bebidas",
    "comment": "Huova x16 y agua x6 a €1.25",
    "date": "2024-02-20T00:00:00.000Z",
    "total": 4,
    "type": "Expense",
    "account": "Efectivo",
    "createdAt": "2024-02-20T18:51:31.543Z",
    "updatedAt": "2024-02-20T18:51:31.543Z",
    "__v": 0
  },
  {
    "_id": "65d3199716de5f16465cdeff",
    "category": "Facturas y pagos",
    "comment": "Recarga Wintre ",
    "date": "2024-02-19T00:00:00.000Z",
    "total": 15,
    "type": "Expense",
    "account": "Efectivo",
    "createdAt": "2024-02-19T09:04:23.788Z",
    "updatedAt": "2024-02-19T09:04:23.788Z",
    "__v": 0
  },
  {
    "_id": "65d3197516de5f16465cdefc",
    "category": "Restaurante",
    "comment": "Pizza kebab con Zoé para la Cena",
    "date": "2024-02-18T00:00:00.000Z",
    "total": 10,
    "type": "Expense",
    "account": "Efectivo",
    "createdAt": "2024-02-19T09:03:49.784Z",
    "updatedAt": "2024-02-19T09:03:49.784Z",
    "__v": 0
  },
  {
    "_id": "65d09766682c0c009b3e051c",
    "category": "Regalos",
    "comment": "Juego mecánico para Zoé en parque ",
    "date": "2024-02-16T00:00:00.000Z",
    "total": 3,
    "type": "Expense",
    "account": "Efectivo",
    "createdAt": "2024-02-17T11:24:22.942Z",
    "updatedAt": "2024-02-17T11:24:22.942Z",
    "__v": 0
  },
  {
    "_id": "65ccc6fcd8aaf037f215872d",
    "category": "Servicios",
    "comment": "Romi estante de fierro y poner cuadros.",
    "date": "2024-02-14T00:00:00.000Z",
    "total": 27,
    "type": "Income",
    "account": "Efectivo",
    "createdAt": "2024-02-14T13:58:20.945Z",
    "updatedAt": "2024-02-14T13:58:20.945Z",
    "__v": 0
  },
  {
    "_id": "65ccc738d8aaf037f2158730",
    "category": "Servicios",
    "comment": "Cuidar a Favio medio día de 9am a 2pm 5h pero invito almuerzo pizza ",
    "date": "2024-02-14T00:00:00.000Z",
    "total": 15,
    "type": "Income",
    "account": "Efectivo",
    "createdAt": "2024-02-14T13:59:20.778Z",
    "updatedAt": "2024-02-14T13:59:20.778Z",
    "__v": 0
  },
  {
    "_id": "65ccc779d8aaf037f2158733",
    "category": "Alimentos y bebidas",
    "comment": "Cebolla china 1€ y ajos 1.5€ para preparar chaufa ",
    "date": "2024-02-14T00:00:00.000Z",
    "total": 3,
    "type": "Expense",
    "account": "Efectivo",
    "createdAt": "2024-02-14T14:00:25.954Z",
    "updatedAt": "2024-02-14T14:00:25.954Z",
    "__v": 0
  },
  {
    "_id": "65d097bb682c0c009b3e051f",
    "category": "Regalos",
    "comment": "Juego salta salta para Zoé por San Valentín ",
    "date": "2024-02-14T00:00:00.000Z",
    "total": 10,
    "type": "Expense",
    "account": "Efectivo",
    "createdAt": "2024-02-17T11:25:47.252Z",
    "updatedAt": "2024-02-17T11:25:47.252Z",
    "__v": 0
  },
  {
    "_id": "65ca60e441e7a6965a0df511",
    "category": "Regalos",
    "comment": "Golosina para Zoé. Chetos de Indiano",
    "date": "2024-02-12T00:00:00.000Z",
    "total": 2,
    "type": "Expense",
    "account": "Efectivo",
    "createdAt": "2024-02-12T18:18:12.410Z",
    "updatedAt": "2024-02-12T18:18:12.410Z",
    "__v": 0
  },
  {
    "_id": "65c96cfc1d7e71490782dacf",
    "category": "Alimentos y bebidas",
    "comment": "Acqua y Uova ",
    "date": "2024-02-11T00:00:00.000Z",
    "total": 4,
    "type": "Expense",
    "account": "Efectivo",
    "createdAt": "2024-02-12T00:57:32.977Z",
    "updatedAt": "2024-02-12T00:57:32.977Z",
    "__v": 0
  },
  {
    "_id": "65c96d1f1d7e71490782dad2",
    "category": "Restaurante",
    "comment": "Pollo grande en mercato Parri ",
    "date": "2024-02-10T00:00:00.000Z",
    "total": 2,
    "type": "Expense",
    "account": "Efectivo",
    "createdAt": "2024-02-12T00:58:07.524Z",
    "updatedAt": "2024-02-12T00:58:07.524Z",
    "__v": 0
  },
  {
    "_id": "65c15e027d3ba185e8cbde6b",
    "category": "Alimentos y bebidas",
    "comment": "Carote 1.5 y Doritos 2.5",
    "date": "2024-02-05T00:00:00.000Z",
    "total": 4,
    "type": "Expense",
    "account": "Efectivo",
    "createdAt": "2024-02-05T22:15:30.570Z",
    "updatedAt": "2024-02-05T22:15:30.570Z",
    "__v": 0
  },
  {
    "_id": "65c15e757d3ba185e8cbde6e",
    "category": "Regalos",
    "comment": "Entretenimiento con Zoé en el Saltasalta",
    "date": "2024-02-05T00:00:00.000Z",
    "total": 6,
    "type": "Expense",
    "account": "Efectivo",
    "createdAt": "2024-02-05T22:17:25.656Z",
    "updatedAt": "2024-02-05T22:17:25.656Z",
    "__v": 0
  },
  {
    "_id": "65be3145ffd42cbde5603db5",
    "category": "Servicios",
    "comment": "Casa de Davide. Limpieza jardinería ambos. 2h",
    "date": "2024-02-03T00:00:00.000Z",
    "total": 15,
    "type": "Income",
    "account": "Efectivo",
    "createdAt": "2024-02-03T12:27:49.380Z",
    "updatedAt": "2024-02-03T12:27:49.380Z",
    "__v": 0
  },
  {
    "_id": "65be31e3ffd42cbde5603dbc",
    "category": "Estudios formacion",
    "comment": "Para Zoe. Colores 8€ 2 cuadernos 2€ ",
    "date": "2024-02-02T00:00:00.000Z",
    "total": 12,
    "type": "Expense",
    "account": "Efectivo",
    "createdAt": "2024-02-03T12:30:27.976Z",
    "updatedAt": "2024-02-03T12:30:27.976Z",
    "__v": 0
  },
   */
  {
    _id: "65ba6bf37e45aa0c79118a91",
    category: "Restaurante",
    comment: "Pizza para mi y Zoé de I'NS",
    date: "2024-01-31T00:00:00.000Z",
    total: 1450,
    type: "Expense",
    account: "Efectivo",
    createdAt: "2024-01-31T15:49:07.492Z",
    updatedAt: "2024-01-31T15:49:07.492Z",
    __v: 0,
  },
  {
    _id: "65ba6c127e45aa0c79118a94",
    category: "Belleza e higiene",
    comment: "Senzodine y Jabón Dove x2",
    date: "2024-01-31T00:00:00.000Z",
    total: 745.7,
    type: "Expense",
    account: "Efectivo",
    createdAt: "2024-01-31T15:49:38.908Z",
    updatedAt: "2024-01-31T15:49:38.908Z",
    __v: 0,
  },
  {
    _id: "65b8a9097ba007857713a547",
    category: "Servicios",
    comment: "Desmontar acondicionador en casa de sra Enso 5pm",
    date: "2024-01-29T00:00:00.000Z",
    total: 10500.99,
    type: "Income",
    account: "Efectivo",
    createdAt: "2024-01-30T07:45:13.311Z",
    updatedAt: "2024-01-30T07:45:13.311Z",
    __v: 0,
  },
  {
    _id: "65b8a93e7ba007857713a54a",
    category: "Alimentos y bebidas",
    comment: "Uova x18 y acqua x6",
    date: "2024-01-29T00:00:00.000Z",
    total: 4,
    type: "Expense",
    account: "Efectivo",
    createdAt: "2024-01-30T07:46:06.643Z",
    updatedAt: "2024-01-30T07:46:06.643Z",
    __v: 0,
  },
  {
    _id: "65b6b660b5c2308bdca29d18",
    category: "Alimentos y bebidas",
    comment: "Cebolla blanca y ahji amarillolomo",
    date: "2024-01-28T00:00:00.000Z",
    total: 1,
    type: "Expense",
    account: "Efectivo",
    createdAt: "2024-01-28T20:17:36.333Z",
    updatedAt: "2024-01-28T20:17:36.333Z",
    __v: 0,
  },
  {
    _id: "65b6b685b5c2308bdca29d1b",
    category: "Regalos",
    comment: "Para Zoé se fue de paseo a Milan",
    date: "2024-01-27T00:00:00.000Z",
    total: 1,
    type: "Expense",
    account: "Efectivo",
    createdAt: "2024-01-28T20:18:13.745Z",
    updatedAt: "2024-01-28T20:18:13.745Z",
    __v: 0,
  },
  {
    _id: "65b0006823780e7a33112d5e",
    category: "Alimentos y bebidas",
    comment: "Acqua x6 1.5€ y huevo x6 1.5€",
    date: "2024-01-22T00:00:00.000Z",
    total: 3,
    type: "Expense",
    account: "Efectivo",
    createdAt: "2024-01-23T18:07:36.756Z",
    updatedAt: "2024-01-23T18:07:36.756Z",
    __v: 0,
  },
  {
    _id: "65ad7f8ef7ad82ec6b12a43f",
    category: "Servicios",
    comment:
      "Desmontar muebles de cocina ropero y sala. Y hacer traslochi a varias casas... 9h de 10am a 7pm. Cena en casa de Jhon (tallarín íntegral con verduras)",
    date: "2024-01-21T00:00:00.000Z",
    total: 60,
    type: "Income",
    account: "Efectivo",
    createdAt: "2024-01-21T20:33:18.433Z",
    updatedAt: "2024-01-21T20:33:18.433Z",
    __v: 0,
  },
  {
    _id: "65ab593ed44b234ee55fb4d4",
    category: "Facturas y pagos",
    comment: "Recarga Wintre ",
    date: "2024-01-19T00:00:00.000Z",
    total: 10,
    type: "Expense",
    account: "Efectivo",
    createdAt: "2024-01-20T05:25:18.697Z",
    updatedAt: "2024-01-20T05:25:18.697Z",
    __v: 0,
  },
  {
    _id: "65a588ae53663e1ed8244766",
    category: "Alimentos y bebidas",
    comment: "3.5 uove e 1.5 acqua ",
    date: "2024-01-12T00:00:00.000Z",
    total: 5,
    type: "Expense",
    account: "Efectivo",
    createdAt: "2024-01-15T19:34:06.975Z",
    updatedAt: "2024-01-15T19:34:06.975Z",
    __v: 0,
  },
  {
    _id: "659e96a28a62aecf612a928b",
    category: "Restaurante",
    comment: "Pizza kebab para el piccante 1€",
    date: "2024-01-09T00:00:00.000Z",
    total: 1,
    type: "Expense",
    account: "Efectivo",
    createdAt: "2024-01-10T13:07:46.849Z",
    updatedAt: "2024-01-10T13:07:46.849Z",
    __v: 0,
  },
  {
    _id: "659e96de8a62aecf612a9290",
    category: "Restaurante",
    comment: "Per il pranzo. Pizza margherita 1.5€ - panino 2€ - Gaytore 0.6€",
    date: "2024-01-08T00:00:00.000Z",
    total: 4,
    type: "Expense",
    account: "Efectivo",
    createdAt: "2024-01-10T13:08:46.985Z",
    updatedAt: "2024-01-10T13:08:46.985Z",
    __v: 0,
  },
  {
    _id: "6595f5acc866b3c5dddf78ec",
    category: "Alimentos y bebidas",
    comment: "2.8€ risotto y 1.4€ chifle plátano. Compra en stazione ",
    date: "2024-01-03T00:00:00.000Z",
    total: 4,
    type: "Expense",
    account: "Efectivo",
    createdAt: "2024-01-04T00:02:52.751Z",
    updatedAt: "2024-01-04T00:02:52.751Z",
    __v: 0,
  },
  {
    _id: "659bcf57377a593e630cf262",
    category: "Otros ingresos",
    comment: "Ahorro del año anterior 2023",
    date: "2024-01-01T00:00:00.000Z",
    total: 164,
    type: "Income",
    account: "Caja fuerte",
    createdAt: "2024-01-08T10:32:55.071Z",
    updatedAt: "2024-01-08T10:32:55.071Z",
    __v: 0,
  },
];

const HistoryPage = () => {
  const [isOpen, setIsOpen] = useState(false);
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
      <section className={` text-white ${inter.className} `}>
        <div className="w-full px-5 py-10 flex flex-row justify-between items-center">
          <div>
            <h1 className="text-gray-400">Presupuesto Mayo</h1>
            <h1 className="text-white text-xl">$3900.00</h1>
          </div>
          <h1 className="text-5xl font-thin -tracking-wider">2024</h1>
        </div>

        <h1 className="px-5"> Presupuesto del mes: $14500 ^ - $1200 v </h1>

        <div className="xhidden bg-gray-800/30 p-5 text-gray-200 border-b border-gray-500">
          <div className="flex flex-row justify-between mb-5">
            <div>
              <h1 className="text-3xl font-extralight -tracking-wider">
                Enero
              </h1>
              <h1 className="-mt-1 text-lg font-light -tracking-wider">2024</h1>
            </div>
            <h1 className=" text-5xl font-thin -tracking-wider mb-5">$ 1359</h1>
          </div>

          <div className="hidden xflex flex-row">
            <div className="w-1/2">
              <h1 className="text-sm uppercase">Expenses</h1>
              <h1 className="flex text-xl text-pink-600 font-medium">
                <span className="text-sm pt-1 mr-1">$ </span>
                68,982.57
              </h1>
            </div>
            <div className="w-1/2">
              <h1 className="text-sm uppercase">Income</h1>
              <h1 className="flex text-xl text-indigo-600 font-medium">
                <span className="text-sm pt-1 mr-1">$</span>
                180,000.00
              </h1>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 ">
            <div className=" bg-gray-800/50 px-4 py-8 rounded-lg border border-gray-600">
              <h1 className="h-1 w-4/5 bg-indigo-600 mb-5"></h1>
              <h1 className="text-sm ">Income</h1>
              <h1 className="flex text-xl  font-medium">
                <span className="text-sm pt-1 mr-1">$</span>
                5,000.00
              </h1>
            </div>

            <div className=" bg-gray-800/50 px-4 py-8 rounded-lg border border-gray-600">
              <h1 className="h-1 w-2/5 bg-pink-600 mb-5"></h1>
              <h1 className="text-sm ">Expenses</h1>
              <h1 className="flex text-xl font-medium">
                <span className="text-sm pt-1 mr-1">$ </span>
                3,900.50
              </h1>
            </div>

            <div className=" bg-gray-800/50 px-4 py-8 rounded-lg border border-gray-600">
              <h1 className="h-1 w-3/5 bg-orange-600 mb-5"></h1>
              <div className="flex flex-row justify-between items-center">
                <h1 className="text-sm ">Transacciones</h1>
                <h1 className="flex text-xl font-medium">{bd.length}</h1>
              </div>
            </div>

            <div className=" bg-gray-800/50 px-4 py-8 rounded-lg border border-gray-600">
              <h1 className="h-1 w-1/5 bg-green-600 mb-5"></h1>
              <div className="flex flex-row justify-between items-center">
                <h1 className="text-sm ">Categorias</h1>
                <h1 className="text-xl font-medium">07</h1>
              </div>
            </div>
          </div>
        </div>

        <h1 className="Xhidden h-2 bg-gradient-to-r from-indigo-600 to-pink-600">
          {" "}
        </h1>

        <div className="hidden p-5 Xflex flex-row text-gray-300">
          <div className="w-14 h-14 ">
            <h1 className="bg-red-400 rounded-full">IMG</h1>
          </div>
          <div className="w-full px-3 flex flex-col">
            <h1>14:00</h1>
            <h1 className="text-white text-xl">Fetch Tyler From Daycare</h1>
          </div>
          <div className="w-20 text-center">
            <h1 className="text-2xl">18</h1>
            <h1>LUN</h1>
          </div>
        </div>

        <div className="">
          <div className="px-5 flex flex-row justify-between items-center text-white font-medium bg-gray-800/50 border-b border-gray-300/50">
            <div className=" py-5 Xtext-lg Xfont-light ">
              Transacciones
              <span className=""> ({bd.length} items) </span>
            </div>

            <Link
              href="/form"
              className={`w-10 h-10 flex items-center justify-center cursor-pointer active:animate-ping bg-gray-800/50 
                    ${isOpen ? " " : " "}                    
                    `}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5 "
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </Link>
          </div>

          {/** FILAS OCULTO*/}
          <div className="hidden px-5 pb-10">
            {bd.map((item, index) => (
              <div key={index}>
                <>
                  <div
                    onClick={() => setIsOpen((prev) => !prev)}
                    className={`flex flex-row text-gray-400 cursor-pointer`}
                  >
                    <div className="w-10 pr-3 py-6 ">
                      <img
                        src={`./images/category/${item.category}.png`}
                        className={`w-5 transform transition-all duration-500 ${
                          !isOpen && " mt-1 scale-150 "
                        } `}
                        alt={item.category}
                      />
                    </div>

                    <div className="relative w-full mr-5 py-5 flex flex-col border-b border-gray-500">
                      <h1 className="text-base text-gray-300">
                        {item.category}
                      </h1>
                      <h1
                        className={`-mt-1 text-xl font-light  ${
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
                      <h1 className="text-sm text-justify" hidden={isOpen}>
                        {item.comment}
                      </h1>
                      <div
                        onClick={() => handleDelete(item._id)}
                        className="absolute text-gray-300 top-10 -right-8 rounded-full bg-gray-600 p-0.5"
                        hidden={isOpen}
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
                            d="M5 12h14"
                          />
                        </svg>
                      </div>
                    </div>
                    {/* DATE - DIA */}
                    <div
                      className={` w-20 pt-5 pl-4 text-center border-l border-gray-500 
                    ${!isOpen && " text-yellow-400 "}
                    `}
                    >
                      {item.date.substr(5, 5) === "groupDate" ? (
                        <></>
                      ) : (
                        <>
                          <h1 className="text-3xl font-extralight">
                            {item.date.substr(8, 2)}
                          </h1>
                          <h1 className="uppercase text-sm">
                            {nameDiaxFecha(item.date)}
                          </h1>
                        </>
                      )}
                      <p className="hidden">
                        {(groupDate = item.date.substr(5, 5))}
                      </p>
                    </div>
                  </div>
                </>
              </div>
            ))}
          </div>
          {/** LLAMAR A LAS FILAS*/}
          <div className="w-full Xpx-5 pb-10">
            {bd?.map((item, index) => (
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
                    <p className="Xhidden bg-transparent text-gray-300 pt-3 px-3 text-sm">
                      {nameDiaxFecha(item.date) + ", "}{" "}
                      <span className="">{item.date.substr(8, 2)} </span>
                      {" de " + cmeses[Number(3 - 1)]}
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
      <div className="bg-gray-800/50 py-7 mt-5 text-center text-gray-200">
        @copyright
      </div>
    </>
  );
};

export default HistoryPage;
