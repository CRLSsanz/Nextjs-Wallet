import { createSlice } from "@reduxjs/toolkit";
import React from "react";

const initialState = [
  {
    _id: "66407b97b35f066f70037fb0",
    category: "Computadora",
    comment: "Compra de un mouse gamer con luces de Unieuro",
    date: "2024-05-11T00:00:00.000Z",
    total: 15,
    type: "Expense",
    account: "Efectivo",
    createdAt: "2024-05-12T08:19:35.658Z",
    updatedAt: "2024-05-12T08:19:35.658Z",
    __v: 0,
  },
  {
    _id: "663bf02a6d68ff95e096a536",
    category: "Alimentos y bebidas",
    comment: "Aquel x6 costo 1.6€ y uova x18 a 3.20€",
    date: "2024-05-08T00:00:00.000Z",
    total: 5,
    type: "Expense",
    account: "Efectivo",
    createdAt: "2024-05-08T21:35:38.339Z",
    updatedAt: "2024-05-08T21:35:38.339Z",
    __v: 0,
  },
  {
    _id: "66325215f5455deec60897d9",
    category: "Estudios formacion",
    comment: "Cuadernos para Zoé, 2 unidades. Compra en parri",
    date: "2024-05-01T00:00:00.000Z",
    total: 2,
    type: "Expense",
    account: "Efectivo",
    createdAt: "2024-05-01T14:30:45.746Z",
    updatedAt: "2024-05-01T14:30:45.746Z",
    __v: 0,
  },
  {
    _id: "66325286f5455deec60897dc",
    category: "Alquiler",
    comment: "Inicio de mes en cero ",
    date: "2024-05-01T00:00:00.000Z",
    total: 0,
    type: "Income",
    account: "Efectivo",
    createdAt: "2024-05-01T14:32:38.691Z",
    updatedAt: "2024-05-01T14:32:38.691Z",
    __v: 0,
  },
  {
    _id: "662fc20d70ef923219c46c0e",
    category: "Alimentos y bebidas",
    comment: "Agua x6 biscoti 2€ y uova x10",
    date: "2024-04-29T00:00:00.000Z",
    total: 6,
    type: "Expense",
    account: "Efectivo",
    createdAt: "2024-04-29T15:51:41.268Z",
    updatedAt: "2024-04-29T15:51:41.268Z",
    __v: 0,
  },
  {
    _id: "6630221933f255e20c091385",
    category: "Restaurante",
    comment: "Pizza kebab 1€",
    date: "2024-04-29T00:00:00.000Z",
    total: 1,
    type: "Expense",
    account: "Efectivo",
    createdAt: "2024-04-29T22:41:29.439Z",
    updatedAt: "2024-04-29T22:41:29.439Z",
    __v: 0,
  },
  {
    _id: "662fc16370ef923219c46c02",
    category: "Servicios",
    comment:
      "Pintura sra bárbara... Pago 20€ luego 40 falta 10 ... 13 horas de lavoro , 2 cuartos",
    date: "2024-04-28T00:00:00.000Z",
    total: 60,
    type: "Income",
    account: "Efectivo",
    createdAt: "2024-04-29T15:48:51.719Z",
    updatedAt: "2024-04-29T15:48:51.719Z",
    __v: 0,
  },
  {
    _id: "662fc1e370ef923219c46c09",
    category: "Alimentos y bebidas",
    comment: "Cipolla cinese, aji giallo, dos platanos",
    date: "2024-04-26T00:00:00.000Z",
    total: 4,
    type: "Expense",
    account: "Efectivo",
    createdAt: "2024-04-29T15:50:59.629Z",
    updatedAt: "2024-04-29T15:50:59.629Z",
    __v: 0,
  },
  {
    _id: "662955d7b4a2c868605c469d",
    category: "Servicios",
    comment:
      "Jardinería en Davide. 6:30pm a 8:30pm\nUno El 24Abr y el otro naterios no se bien la fecha",
    date: "2024-04-24T00:00:00.000Z",
    total: 50,
    type: "Income",
    account: "Efectivo",
    createdAt: "2024-04-24T18:56:23.579Z",
    updatedAt: "2024-04-24T18:56:23.579Z",
    __v: 0,
  },
  {
    _id: "6627e0abbdaaa65b9435460d",
    category: "Restaurante",
    comment: "2 pizza margarita de I'Ns",
    date: "2024-04-23T00:00:00.000Z",
    total: 3,
    type: "Expense",
    account: "Efectivo",
    createdAt: "2024-04-23T16:24:11.546Z",
    updatedAt: "2024-04-23T16:24:11.546Z",
    __v: 0,
  },
  {
    _id: "6615e2c6821f539ff31ceb5b",
    category: "Celular",
    comment: "Linea de celular en Wintre ",
    date: "2024-04-19T00:00:00.000Z",
    total: 10,
    type: "Expense",
    account: "Efectivo",
    createdAt: "2024-04-10T00:52:22.492Z",
    updatedAt: "2024-04-10T00:52:22.492Z",
    __v: 0,
  },
  {
    _id: "66220bf68707b8496983c27c",
    category: "Restaurante",
    comment: "Pizza kebab ",
    date: "2024-04-17T00:00:00.000Z",
    total: 1,
    type: "Expense",
    account: "Efectivo",
    createdAt: "2024-04-19T06:15:18.233Z",
    updatedAt: "2024-04-19T06:15:18.233Z",
    __v: 0,
  },
  {
    _id: "66220c1c8707b8496983c27f",
    category: "Propina",
    comment: "Para Zoé compra de un cuaderno ",
    date: "2024-04-16T00:00:00.000Z",
    total: 1,
    type: "Expense",
    account: "Efectivo",
    createdAt: "2024-04-19T06:15:56.799Z",
    updatedAt: "2024-04-19T06:15:56.799Z",
    __v: 0,
  },
  {
    _id: "661cd447db828b5fc96a799d",
    category: "Alimentos y bebidas",
    comment: "acqua x6 y uova x18",
    date: "2024-04-15T00:00:00.000Z",
    total: 4,
    type: "Expense",
    account: "Efectivo",
    createdAt: "2024-04-15T07:16:23.463Z",
    updatedAt: "2024-04-15T07:16:23.463Z",
    __v: 0,
  },
  {
    _id: "66195eee9292acdd9e0d815e",
    category: "Alimentos y bebidas",
    comment: "Para preparar chaufa: Salsa de soya 1€ y cebolla china 1€",
    date: "2024-04-12T00:00:00.000Z",
    total: 2,
    type: "Expense",
    account: "Efectivo",
    createdAt: "2024-04-12T16:18:54.613Z",
    updatedAt: "2024-04-12T16:18:54.613Z",
    __v: 0,
  },
  {
    _id: "6615e141edd51a8a031ccb82",
    category: "Propina",
    comment: "Para Zoé ",
    date: "2024-04-07T00:00:00.000Z",
    total: 2,
    type: "Expense",
    account: "Efectivo",
    createdAt: "2024-04-10T00:45:53.314Z",
    updatedAt: "2024-04-10T00:45:53.314Z",
    __v: 0,
  },
  {
    _id: "6610713856d0d1f365a0a913",
    category: "Alimentos y bebidas",
    comment: "Huevo, agua, macarrones y como de helado x6",
    date: "2024-04-05T00:00:00.000Z",
    total: 8,
    type: "Expense",
    account: "Efectivo",
    createdAt: "2024-04-05T21:46:32.519Z",
    updatedAt: "2024-04-05T21:46:32.519Z",
    __v: 0,
  },
  {
    _id: "6600c39cfa39083035e84bea",
    category: "Alimentos y bebidas",
    comment: "Kion de stazione un frasco ",
    date: "2024-03-24T00:00:00.000Z",
    total: 2,
    type: "Expense",
    account: "Efectivo",
    createdAt: "2024-03-25T00:21:49.000Z",
    updatedAt: "2024-03-25T00:21:49.000Z",
    __v: 0,
  },
  {
    _id: "6600c36cfa39083035e84be7",
    category: "Servicios",
    comment: "Mudanza en 5to piso de los raros",
    date: "2024-03-23T00:00:00.000Z",
    total: 20,
    type: "Income",
    account: "Efectivo",
    createdAt: "2024-03-25T00:21:00.364Z",
    updatedAt: "2024-03-25T00:21:00.364Z",
    __v: 0,
  },
  {
    _id: "65fc802da01cdabf45dfa890",
    category: "Belleza e higiene",
    comment: "Desodorante roll-on 3€ y senzodine 3.5€",
    date: "2024-03-21T00:00:00.000Z",
    total: 6,
    type: "Expense",
    account: "Efectivo",
    createdAt: "2024-03-21T18:45:01.479Z",
    updatedAt: "2024-03-21T18:45:01.479Z",
    __v: 0,
  },
  {
    _id: "65fc80a2a01cdabf45dfa894",
    category: "Facturas y pagos",
    comment: "Recibo Wintre ",
    date: "2024-03-19T00:00:00.000Z",
    total: 10,
    type: "Expense",
    account: "Efectivo",
    createdAt: "2024-03-21T18:46:58.469Z",
    updatedAt: "2024-03-21T18:46:58.469Z",
    __v: 0,
  },
  {
    _id: "65f660e2e4b6e0d6c9856f83",
    category: "Alimentos y bebidas",
    comment: "Agua x6 y fideo macarrones ",
    date: "2024-03-10T00:00:00.000Z",
    total: 3,
    type: "Expense",
    account: "Efectivo",
    createdAt: "2024-03-17T03:17:54.915Z",
    updatedAt: "2024-03-17T03:17:54.915Z",
    __v: 0,
  },
  {
    _id: "65f66090e4b6e0d6c9856f80",
    category: "Restaurante",
    comment: "Pizza kebab ",
    date: "2024-03-02T00:00:00.000Z",
    total: 11,
    type: "Expense",
    account: "Efectivo",
    createdAt: "2024-03-17T03:16:32.172Z",
    updatedAt: "2024-03-17T03:16:32.172Z",
    __v: 0,
  },
  {
    _id: "65de5d4d64b5e8a6cf936612",
    category: "Estudios formacion",
    comment: "Cuadernos uno rallado y uno cuadrículado. Y una Agenda 2.8€",
    date: "2024-02-26T00:00:00.000Z",
    total: 5,
    type: "Expense",
    account: "Efectivo",
    createdAt: "2024-02-27T22:08:13.204Z",
    updatedAt: "2024-02-27T22:08:13.204Z",
    __v: 0,
  },
  {
    _id: "65de5cf964b5e8a6cf93660f",
    category: "Alimentos y bebidas",
    comment:
      "Cumple de Zoé para el domingo lomo saltado. Arroz 2.8 cebolla 0.5 comino 0.5 y sublime 1.2€",
    date: "2024-02-24T00:00:00.000Z",
    total: 3,
    type: "Expense",
    account: "Efectivo",
    createdAt: "2024-02-27T22:06:49.847Z",
    updatedAt: "2024-02-27T22:06:49.847Z",
    __v: 0,
  },
  {
    _id: "65d4f4b318c000f00df159a2",
    category: "Alimentos y bebidas",
    comment: "Huova x16 y agua x6 a €1.25",
    date: "2024-02-20T00:00:00.000Z",
    total: 4,
    type: "Expense",
    account: "Efectivo",
    createdAt: "2024-02-20T18:51:31.543Z",
    updatedAt: "2024-02-20T18:51:31.543Z",
    __v: 0,
  },
  {
    _id: "65d3199716de5f16465cdeff",
    category: "Facturas y pagos",
    comment: "Recarga Wintre ",
    date: "2024-02-19T00:00:00.000Z",
    total: 15,
    type: "Expense",
    account: "Efectivo",
    createdAt: "2024-02-19T09:04:23.788Z",
    updatedAt: "2024-02-19T09:04:23.788Z",
    __v: 0,
  },
  {
    _id: "65d3197516de5f16465cdefc",
    category: "Restaurante",
    comment: "Pizza kebab con Zoé para la Cena",
    date: "2024-02-18T00:00:00.000Z",
    total: 10,
    type: "Expense",
    account: "Efectivo",
    createdAt: "2024-02-19T09:03:49.784Z",
    updatedAt: "2024-02-19T09:03:49.784Z",
    __v: 0,
  },
  {
    _id: "65d09766682c0c009b3e051c",
    category: "Regalos",
    comment: "Juego mecánico para Zoé en parque ",
    date: "2024-02-16T00:00:00.000Z",
    total: 3,
    type: "Expense",
    account: "Efectivo",
    createdAt: "2024-02-17T11:24:22.942Z",
    updatedAt: "2024-02-17T11:24:22.942Z",
    __v: 0,
  },
  {
    _id: "65ccc6fcd8aaf037f215872d",
    category: "Servicios",
    comment: "Romi estante de fierro y poner cuadros.",
    date: "2024-02-14T00:00:00.000Z",
    total: 27,
    type: "Income",
    account: "Efectivo",
    createdAt: "2024-02-14T13:58:20.945Z",
    updatedAt: "2024-02-14T13:58:20.945Z",
    __v: 0,
  },
  {
    _id: "65ccc738d8aaf037f2158730",
    category: "Servicios",
    comment:
      "Cuidar a Favio medio día de 9am a 2pm 5h pero invito almuerzo pizza ",
    date: "2024-02-14T00:00:00.000Z",
    total: 15,
    type: "Income",
    account: "Efectivo",
    createdAt: "2024-02-14T13:59:20.778Z",
    updatedAt: "2024-02-14T13:59:20.778Z",
    __v: 0,
  },
  {
    _id: "65ccc779d8aaf037f2158733",
    category: "Alimentos y bebidas",
    comment: "Cebolla china 1€ y ajos 1.5€ para preparar chaufa ",
    date: "2024-02-14T00:00:00.000Z",
    total: 3,
    type: "Expense",
    account: "Efectivo",
    createdAt: "2024-02-14T14:00:25.954Z",
    updatedAt: "2024-02-14T14:00:25.954Z",
    __v: 0,
  },
  {
    _id: "65d097bb682c0c009b3e051f",
    category: "Regalos",
    comment: "Juego salta salta para Zoé por San Valentín ",
    date: "2024-02-14T00:00:00.000Z",
    total: 10,
    type: "Expense",
    account: "Efectivo",
    createdAt: "2024-02-17T11:25:47.252Z",
    updatedAt: "2024-02-17T11:25:47.252Z",
    __v: 0,
  },
  {
    _id: "65ca60e441e7a6965a0df511",
    category: "Regalos",
    comment: "Golosina para Zoé. Chetos de Indiano",
    date: "2024-02-12T00:00:00.000Z",
    total: 2,
    type: "Expense",
    account: "Efectivo",
    createdAt: "2024-02-12T18:18:12.410Z",
    updatedAt: "2024-02-12T18:18:12.410Z",
    __v: 0,
  },
  {
    _id: "65c96cfc1d7e71490782dacf",
    category: "Alimentos y bebidas",
    comment: "Acqua y Uova ",
    date: "2024-02-11T00:00:00.000Z",
    total: 4,
    type: "Expense",
    account: "Efectivo",
    createdAt: "2024-02-12T00:57:32.977Z",
    updatedAt: "2024-02-12T00:57:32.977Z",
    __v: 0,
  },
  {
    _id: "65c96d1f1d7e71490782dad2",
    category: "Restaurante",
    comment: "Pollo grande en mercato Parri ",
    date: "2024-02-10T00:00:00.000Z",
    total: 2,
    type: "Expense",
    account: "Efectivo",
    createdAt: "2024-02-12T00:58:07.524Z",
    updatedAt: "2024-02-12T00:58:07.524Z",
    __v: 0,
  },
  {
    _id: "65c15e027d3ba185e8cbde6b",
    category: "Alimentos y bebidas",
    comment: "Carote 1.5 y Doritos 2.5",
    date: "2024-02-05T00:00:00.000Z",
    total: 4,
    type: "Expense",
    account: "Efectivo",
    createdAt: "2024-02-05T22:15:30.570Z",
    updatedAt: "2024-02-05T22:15:30.570Z",
    __v: 0,
  },
  {
    _id: "65c15e757d3ba185e8cbde6e",
    category: "Regalos",
    comment: "Entretenimiento con Zoé en el Saltasalta",
    date: "2024-02-05T00:00:00.000Z",
    total: 6,
    type: "Expense",
    account: "Efectivo",
    createdAt: "2024-02-05T22:17:25.656Z",
    updatedAt: "2024-02-05T22:17:25.656Z",
    __v: 0,
  },
  {
    _id: "65be3145ffd42cbde5603db5",
    category: "Servicios",
    comment: "Casa de Davide. Limpieza jardinería ambos. 2h",
    date: "2024-02-03T00:00:00.000Z",
    total: 15,
    type: "Income",
    account: "Efectivo",
    createdAt: "2024-02-03T12:27:49.380Z",
    updatedAt: "2024-02-03T12:27:49.380Z",
    __v: 0,
  },
  {
    _id: "65be31e3ffd42cbde5603dbc",
    category: "Estudios formacion",
    comment: "Para Zoe. Colores 8€ 2 cuadernos 2€ ",
    date: "2024-02-02T00:00:00.000Z",
    total: 12,
    type: "Expense",
    account: "Efectivo",
    createdAt: "2024-02-03T12:30:27.976Z",
    updatedAt: "2024-02-03T12:30:27.976Z",
    __v: 0,
  },
  {
    _id: "65ba6bf37e45aa0c79118a91",
    category: "Restaurante",
    comment: "Pizza para mi y Zoé de I'NS",
    date: "2024-01-31T00:00:00.000Z",
    total: 3,
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
    total: 7,
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
    total: 10,
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
    _id: "662d77aea90418b0b6e2aa4b",
    category: "Salario",
    comment: "Del año pasado €164 ",
    date: "2024-01-01T00:00:00.000Z",
    total: 0,
    type: "Income",
    account: "Caja fuerte",
    createdAt: "2024-04-27T22:09:50.897Z",
    updatedAt: "2024-04-27T22:09:50.897Z",
    __v: 0,
  },
  {
    _id: "658ece9b68a2e30540837aa4",
    category: "Alimentos y bebidas",
    comment:
      "3.5€ Uova -€1.5 Aqua - €1 Rigatoni Bronzo- €2 Frollini cacao e panna",
    date: "2023-12-29T00:00:00.000Z",
    total: 7,
    type: "Expense",
    account: "Efectivo",
    createdAt: "2023-12-29T13:50:19.480Z",
    updatedAt: "2023-12-29T13:50:19.480Z",
    __v: 0,
  },
  {
    _id: "658c3e3bda61743fd46a2475",
    category: "Alimentos y bebidas",
    comment: "Ahí amarillo para preparar Saltado de Pollo",
    date: "2023-12-25T00:00:00.000Z",
    total: 1,
    type: "Expense",
    account: "Efectivo",
    createdAt: "2023-12-27T15:09:47.424Z",
    updatedAt: "2023-12-27T15:09:47.424Z",
    __v: 0,
  },
  {
    _id: "658ebc26be54819c7ef437dc",
    category: "Alimentos y bebidas",
    comment:
      "Para la cena en casa de Jhon. 1€ Sale. 3.5€ papa bianca. 2.5€ limón. 2€ succhero",
    date: "2023-12-24T00:00:00.000Z",
    total: 9,
    type: "Expense",
    account: "Efectivo",
    createdAt: "2023-12-29T12:31:34.399Z",
    updatedAt: "2023-12-29T12:31:34.399Z",
    __v: 0,
  },
  {
    _id: "65829b10b57340c442f1c661",
    category: "Facturas y pagos",
    comment: "Línea di teléfono Wintre ",
    date: "2023-12-20T00:00:00.000Z",
    total: 10,
    type: "Expense",
    account: "Efectivo",
    createdAt: "2023-12-20T07:43:12.481Z",
    updatedAt: "2023-12-20T07:43:12.481Z",
    __v: 0,
  },
  {
    _id: "658355e08cd5c7272a34df0d",
    category: "Servicios",
    comment:
      "Sra Elena pintado de marco y puestas de madera. De 9am a 4pm (pranzo incluído) y colocar una repisa en casa de su hermana",
    date: "2023-12-20T00:00:00.000Z",
    total: 30,
    type: "Income",
    account: "Efectivo",
    createdAt: "2023-12-20T21:00:16.365Z",
    updatedAt: "2023-12-20T21:00:16.365Z",
    __v: 0,
  },
  {
    _id: "658356038cd5c7272a34df10",
    category: "Casa o vivienda",
    comment: "Affitto posto letto",
    date: "2023-12-20T00:00:00.000Z",
    total: 70,
    type: "Expense",
    account: "Efectivo",
    createdAt: "2023-12-20T21:00:51.473Z",
    updatedAt: "2023-12-20T21:00:51.473Z",
    __v: 0,
  },
  {
    _id: "658063ebdd6430bae5b20750",
    category: "Restaurante",
    comment: "Panino 1 pizza margarita de iN's ",
    date: "2023-12-18T00:00:00.000Z",
    total: 1,
    type: "Expense",
    account: "Efectivo",
    createdAt: "2023-12-18T15:23:23.131Z",
    updatedAt: "2023-12-18T15:23:23.131Z",
    __v: 0,
  },
  {
    _id: "657f11cbeafa0e94e4d499d7",
    category: "Alimentos y bebidas",
    comment: "Uova x18 latte x2 aqua x6",
    date: "2023-12-16T00:00:00.000Z",
    total: 6,
    type: "Expense",
    account: "Efectivo",
    createdAt: "2023-12-17T15:20:43.051Z",
    updatedAt: "2023-12-17T15:20:43.051Z",
    __v: 0,
  },
  {
    _id: "657b1a6a372781f8768965c9",
    category: "Servicios",
    comment:
      "Limpieza de persianas de casa en condominio SanAntonio. También podamos ramas de entrada a garage ",
    date: "2023-12-14T00:00:00.000Z",
    total: 10,
    type: "Income",
    account: "Efectivo",
    createdAt: "2023-12-14T15:08:26.229Z",
    updatedAt: "2023-12-14T15:08:26.229Z",
    __v: 0,
  },
  {
    _id: "657b1b08372781f8768965cf",
    category: "Transporte",
    comment: "Carrera para SanAntonio, carro de Kevin... 11:30 - 2pm",
    date: "2023-12-14T00:00:00.000Z",
    total: 1,
    type: "Expense",
    account: "Efectivo",
    createdAt: "2023-12-14T15:11:04.927Z",
    updatedAt: "2023-12-14T15:11:04.927Z",
    __v: 0,
  },
  {
    _id: "6579a7c5c4655c80e623af75",
    category: "Regalos",
    comment: "Juguete para leo y para Zoé su BTS. compra en parri",
    date: "2023-12-13T00:00:00.000Z",
    total: 9,
    type: "Expense",
    account: "Efectivo",
    createdAt: "2023-12-13T12:47:01.376Z",
    updatedAt: "2023-12-13T12:47:01.376Z",
    __v: 0,
  },
  {
    _id: "657b1aad372781f8768965cc",
    category: "Alimentos y bebidas",
    comment:
      "Arroz (2.8€) para preparar chaufa y dulces para Zoé. De indiano stazione.",
    date: "2023-12-13T00:00:00.000Z",
    total: 4,
    type: "Expense",
    account: "Efectivo",
    createdAt: "2023-12-14T15:09:33.389Z",
    updatedAt: "2023-12-14T15:09:33.389Z",
    __v: 0,
  },
  {
    _id: "6577264f0a6a4afda5094769",
    category: "Servicios",
    comment:
      "Pintura de arcos de puerta en casa de sra. Katerine. De 9-3pm almorzamos ahí.",
    date: "2023-12-11T00:00:00.000Z",
    total: 35,
    type: "Income",
    account: "Efectivo",
    createdAt: "2023-12-11T15:10:07.723Z",
    updatedAt: "2023-12-11T15:10:07.723Z",
    __v: 0,
  },
  {
    _id: "6580651bdd6430bae5b20755",
    category: "Alimentos y bebidas",
    comment: "Paquete de atún x6 en Esselunga - Debo 7€ a Jhon ",
    date: "2023-12-11T00:00:00.000Z",
    total: 0,
    type: "Expense",
    account: "Efectivo",
    createdAt: "2023-12-18T15:28:27.149Z",
    updatedAt: "2023-12-18T15:28:27.149Z",
    __v: 0,
  },
  {
    _id: "6574a92982c51e3fd5e46748",
    category: "Servicios",
    comment: "Pulizia en casa Sra. Pieralda de 9a 11:30am",
    date: "2023-12-09T00:00:00.000Z",
    total: 20,
    type: "Income",
    account: "Efectivo",
    createdAt: "2023-12-09T17:51:37.901Z",
    updatedAt: "2023-12-09T17:51:37.901Z",
    __v: 0,
  },
  {
    _id: "6574a95682c51e3fd5e4674b",
    category: "Regalos",
    comment: "Muñeco de BTS para Zoé y guantes para invierno ",
    date: "2023-12-09T00:00:00.000Z",
    total: 5,
    type: "Expense",
    account: "Efectivo",
    createdAt: "2023-12-09T17:52:22.602Z",
    updatedAt: "2023-12-09T17:52:22.602Z",
    __v: 0,
  },
  {
    _id: "6572e2158cfe8c81a8b4b759",
    category: "Regalos",
    comment: "Auto de barbio para XOE compra en DM",
    date: "2023-12-07T00:00:00.000Z",
    total: 10,
    type: "Expense",
    account: "Efectivo",
    createdAt: "2023-12-08T09:29:57.536Z",
    updatedAt: "2023-12-08T09:29:57.536Z",
    __v: 0,
  },
  {
    _id: "6572e2508cfe8c81a8b4b75c",
    category: "Alimentos y bebidas",
    comment: 'Botella de spritz para la cena en casa de Jhon "Ají de gallina"',
    date: "2023-12-07T00:00:00.000Z",
    total: 3,
    type: "Expense",
    account: "Efectivo",
    createdAt: "2023-12-08T09:30:56.522Z",
    updatedAt: "2023-12-08T09:30:56.522Z",
    __v: 0,
  },
  {
    _id: "6572e2b68cfe8c81a8b4b75f",
    category: "Belleza e higiene",
    comment: "Senzodine compra en chinise",
    date: "2023-12-05T00:00:00.000Z",
    total: 3,
    type: "Expense",
    account: "Efectivo",
    createdAt: "2023-12-08T09:32:38.733Z",
    updatedAt: "2023-12-08T09:32:38.733Z",
    __v: 0,
  },
  {
    _id: "656eefb54c90df651970eaed",
    category: "Restaurante",
    comment: "Pizza kebat, para ma cena.",
    date: "2023-12-04T00:00:00.000Z",
    total: 1,
    type: "Expense",
    account: "Efectivo",
    createdAt: "2023-12-05T09:39:01.757Z",
    updatedAt: "2023-12-05T09:39:01.757Z",
    __v: 0,
  },
  {
    _id: "656b50b3fd42f715402dc72d",
    category: "Servicios",
    comment:
      "Cada de Davide. Recojer hojas fuori Jardin piscina y bajada de garaje. De 2:00-4:30pm",
    date: "2023-12-02T00:00:00.000Z",
    total: 25,
    type: "Income",
    account: "Efectivo",
    createdAt: "2023-12-02T15:43:47.393Z",
    updatedAt: "2023-12-02T15:43:47.393Z",
    __v: 0,
  },
  {
    _id: "656b6ddc7bf04ed0f5d04b0a",
    category: "Alimentos y bebidas",
    comment: "Uova x18 - acqua x6 - latte x2 - pane hamburger x6",
    date: "2023-12-02T00:00:00.000Z",
    total: 7,
    type: "Expense",
    account: "Efectivo",
    createdAt: "2023-12-02T17:48:12.523Z",
    updatedAt: "2023-12-02T17:48:12.523Z",
    __v: 0,
  },
  {
    _id: "656a0ecbca2f50be35551a6f",
    category: "Alimentos y bebidas",
    comment: "Camote y plátano para freír... de Indiano (para cenar chanchito)",
    date: "2023-12-01T00:00:00.000Z",
    total: 4,
    type: "Expense",
    account: "Efectivo",
    createdAt: "2023-12-01T16:50:19.623Z",
    updatedAt: "2023-12-01T16:50:19.623Z",
    __v: 0,
  },
  {
    _id: "656a0efaca2f50be35551a72",
    category: "Servicios",
    comment: "Sra pieralda. Limpieza casa 2-4pm debe total 42€",
    date: "2023-12-01T00:00:00.000Z",
    total: 0,
    type: "Income",
    account: "Efectivo",
    createdAt: "2023-12-01T16:51:06.303Z",
    updatedAt: "2023-12-01T16:51:06.303Z",
    __v: 0,
  },
  {
    _id: "6569925e584b80581792be2d",
    category: "Servicios",
    comment: "Hidráulico. Cambiar caño de baño y videl. 6:00-7:30",
    date: "2023-11-30T00:00:00.000Z",
    total: 20,
    type: "Income",
    account: "Efectivo",
    createdAt: "2023-12-01T07:59:26.880Z",
    updatedAt: "2023-12-01T07:59:26.880Z",
    __v: 0,
  },
  {
    _id: "656996d89230972240bb37ee",
    category: "Restaurante",
    comment:
      "Compré dos pizza margarita de In's. Para mí y Zoe(Cole el jueves)",
    date: "2023-11-29T00:00:00.000Z",
    total: 1,
    type: "Expense",
    account: "Efectivo",
    createdAt: "2023-12-01T08:18:32.435Z",
    updatedAt: "2023-12-01T08:18:32.435Z",
    __v: 0,
  },
  {
    _id: "6569966d9230972240bb37eb",
    category: "Regalo",
    comment: "Sra. Del condominio de San antonio. Para caffè.",
    date: "2023-11-27T00:00:00.000Z",
    total: 5,
    type: "Income",
    account: "Efectivo",
    createdAt: "2023-12-01T08:16:45.868Z",
    updatedAt: "2023-12-01T08:16:45.868Z",
    __v: 0,
  },
  {
    _id: "6563b1c00aafe082c8cbf433",
    category: "Servicios",
    comment:
      "Casa de Nicola colocar Marcos en puerta principal. De 2:30 a 5:30",
    date: "2023-11-25T00:00:00.000Z",
    total: 20,
    type: "Income",
    account: "Efectivo",
    createdAt: "2023-11-26T20:59:44.619Z",
    updatedAt: "2023-11-26T20:59:44.619Z",
    __v: 0,
  },
];

export const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    listWallet: (state) => state,

    addWallet: (state, action) => {
      //console.log(state, action);
      state.push(action.payload);
      //return newState=[...state, action.payload ]
    },

    findWallet: () => {},

    deleteWallet: (state, action) => {
      const itemFound = state.find((item) => item._id === action.payload);
      if (itemFound) {
        state.splice(state.indexOf(itemFound), 1);
      }
    },

    updateWallet: (state, action) => {
      const { _id, total, comment } = action.payload;
      const foundWallet = state.find((item) => item._id === _id);
      if (foundWallet) {
        (foundWallet.total = total), (foundWallet.comment = comment);
      }
    },
  },
});

export const { listWallet, addWallet, deleteWallet, updateWallet } =
  walletSlice.actions;

export default walletSlice.reducer;
