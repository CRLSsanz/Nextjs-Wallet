import React from "react";
import { useAppDispatch } from "@/redux/hooks";
import { updateWallet } from "@/redux/features/walletSlice";

const ModalEdit = ({ item, visible, onClose }: any) => {
  const dispatch = useAppDispatch();

  if (!visible) return null;

  const handelOnClose = (e: any) => {
    //onClose();
    if (e.target.id === "container") onClose();
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    dispatch(
      updateWallet({
        _id: item._id,
        total: Number(e.target.elements.total.value),
        comment: e.target.elements.comment.value,
      })
    );
    alert("DATA SEND: " + JSON.stringify(item.category));
    onClose();
  };

  return (
    <div
      id="container"
      tabIndex={-1}
      onClick={handelOnClose}
      className="fixed z-50 inset-0 bg-black bg-opacity-70 backdrop-blur-sm h-screen w-full px-5 text-gray-300 flex items-center justify-center"
    >
      <form onSubmit={handleSubmit} className=" w-full bg-card   ">
        <div className=" p-5 flex flex-row items-center justify-between bg-purple-700">
          <h1 className="uppercase text-sm ">Actualizar {item.type}</h1>
          <h1 className="py-1 px-3 border text-sm ">+ Nuevo </h1>
        </div>
        <div className="p-5 flex flex-col Xborder Xborder-gray-500/50 ">
          <div
            onClick={onClose}
            className="text-cyan-600/90 mb-7 flex flex-row items-center "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
              />
            </svg>
            <span className="ml-2">Regresar</span>
          </div>
          {/** CATEGORY */}
          <div className="flex flex-row mb-5">
            <div className="bg-gray-800/50 w-14 flex items-center justify-center">
              <img
                src={`./images/category/${item.category}.png`}
                className={`w-8 h-8`}
                alt={item.category}
              />
            </div>
            <div className="w-full relative">
              <h1
                className="w-full p-3 bg-gray-600/50 appearance-none focus:outline-none"
                //value={form.account}
              >
                {item.category}
              </h1>

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
              name="total"
              type="number"
              defaultValue={item.total}
              className="w-full p-3 bg-gray-600/50 focus:outline-none"
              placeholder="Precio, monto, saldo"
            />
          </div>
          {/** DATE */}

          {/** DESCRIPTION */}
          <div className="flex flex-row items-start mb-5">
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
              defaultValue={item.comment}
              rows={4}
              className="w-full p-3 bg-gray-600/50 focus:outline-none"
              placeholder="Descripcion, detalle, nota"
            />
          </div>

          <div className="flex flex-row py-5">
            <h1
              onClick={onClose}
              className="hidden bg-red-600/90 py-3 w-14 xflex justify-center"
            >
              {"<-"}
            </h1>
            <button className="w-full p-3 bg-gray-400/60 focus:outline-none">
              Actualizar
            </button>
          </div>
        </div>
      </form>

      <div className="hidden py-5">
        <div onClick={onClose}> cerrar </div>
      </div>
    </div>
  );
};

export default ModalEdit;
