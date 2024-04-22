import React from "react";

const expensesCategory = [
  { name: "Alimentos y bebidas", active: true }, // compras en el supermercado
  { name: "Automovil", active: false }, // gasolina, reparaciones, labado, otros
  { name: "Bebe", active: true }, // compras para bebe.
  { name: "Belleza e higiene", active: true }, // gym, spa, peluqueria, accesorios, productos de limpieza otros
  { name: "Casa o vivienda", active: true }, // muebles, alquiler, reparaciones.
  { name: "Celular", active: true }, // accesorios o pago de linea,
  { name: "Cine", active: false }, // cine, transporte y comida,
  { name: "Computadora", active: false }, // computadora laptop o accesorios,
  { name: "Dulces", active: true }, // Dulces helados chocolate etc,
  { name: "Entretenimiento", active: true }, // divercion salidas juegos mecanicos,
  { name: "Equipos electronicos", active: false }, //artefactos, pc,
  { name: "Estudios formacion", active: true }, // libros, cursos, etc
  { name: "Facturas y pagos", active: false }, //luz, gas, agua, celu, tv, inter, otros
  { name: "Mascota", active: true }, // veterinaria, comida, otros
  { name: "Propina", active: true }, // Propinas,
  { name: "Regalos", active: true }, // cumpleanos, obsequios, otros
  { name: "Restaurante", active: true }, // comida fuera de casa
  { name: "Ropa y calzado", active: true }, //ropa, calzado, accesorios
  { name: "Salud", active: true }, // dentista, medicos, farmacia, otros.
  { name: "Transporte", active: false }, // pasajes, taxi, carne de pasaje, otros
  { name: "Vacaciones", active: true }, // paseos, playas, viajes.
  { name: "Video juegos", active: true }, // paseos, playas, viajes.
  { name: "Otros gastos", active: false },
];

const CategoryPage = () => {
  return (
    <div>
      <div className="p-5 text-gray-100">
        <h1 className="hidden text-5xl font-thin -tracking-wider">
          Septiembre
        </h1>
        <h1 className="text-2xl font-light mb-5">Categorias</h1>

        <div className="grid grid-cols-4 gap-3">
          {expensesCategory.map((item, index) => (
            <div
              key={index}
              className={` relative p-3 py-4 rounded-2xl Xrounded-tr-[50px] flex flex-col items-center Xjustify-between 
              ${
                item.active === true
                  ? " bg-gradient-to-br from-cyan-400 to-blue-700 "
                  : "  bg-gray-600/50  "
              }
              `}
            >
              <div className="w-10 h-10 rounded-full mb-4 ">
                <img
                  src={`./images/category/${item.name}.png`}
                  alt="Img category"
                  className={` rounded-full p-2 ${
                    item.active === true ? " bg-white/70 " : "bg-gray-600/50"
                  }`}
                />
              </div>

              <h1 className="w-full text-center text-xs truncate Xtext-ellipsis ">
                {item.name}
              </h1>

              <div
                className="absolute top-2 right-2 p-0.5 bg-white rounded-full text-blue-600"
                hidden={item.active === !true ? true : false}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2.5"
                  stroke="currentColor"
                  className="w-3 h-3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m4.5 12.75 6 6 9-13.5"
                  />
                </svg>
              </div>

              <div className="hidden text-green-500 Xflex items-end">
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    value=""
                    className="sr-only peer"
                    //checked={item.active === true ? true : false}
                  />
                  <div className="relative w-9 h-5 bg-gray-600 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all  peer-checked:bg-blue-600"></div>
                  <span className="hidden ms-3 text-sm font-medium text-gray-900">
                    Small toggle
                  </span>
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
