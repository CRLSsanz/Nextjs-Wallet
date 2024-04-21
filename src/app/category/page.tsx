import React from "react";

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

const CategoryPage = () => {
  return (
    <div>
      <div className="p-5 text-gray-200">
        <h1 className="hidden text-5xl font-thin -tracking-wider">
          Septiembre
        </h1>
        <h1 className="text-2xl font-light mb-5">Categorias</h1>

        <div className="grid grid-cols-3 gap-3">
          {expensesCategory.map((item, index) => (
            <div
              key={index}
              className="relative p-2 pt-4 bg-gray-600/50 rounded-sm flex flex-col justify-between items-center"
            >
              <div className="w-12 h-12 p-0.5 rounded-full bg-gradient-to-tr from-pink-500 to-cyan-500">
                <img
                  src={`./images/category/${item}.png`}
                  alt="Img category"
                  className=" bg-white/50 rounded-full p-1"
                />
              </div>
              <div className="w-full flex flex-col">
                <h1 className="text-xs text-center">{item}</h1>
              </div>
              <div className=" absolute top-1 right-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2.0"
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m4.5 12.75 6 6 9-13.5"
                  />
                </svg>
              </div>
              <div className="hidden text-green-500 absolute top-2 right-2">
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
                    d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
