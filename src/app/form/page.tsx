import React from "react";

const FormPage = () => {
  return (
    <div className="px-10 pt-20 ">
      <div className="border border-black/50 bg-black/10 p-5">
        <div className="text-lg font-semibold text-white py-10">
          Nueva transaccion{" "}
        </div>
        <div className="relative mb-5">
          <input
            className="w-full py-2 px-4 border border-gray-300 rounded-full"
            type="text"
            placeholder="User name"
          />
          <div className="absolute text-gray-400 top-3 right-3 ">
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
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
              />
            </svg>
          </div>
        </div>
        <div className="relative">
          <input
            className="w-full py-2 px-4 border border-gray-300 rounded-full"
            type="password"
            placeholder="password"
          />
          <div className="absolute text-gray-400 top-3 right-3 ">
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
                d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
              />
            </svg>
          </div>
        </div>

        <div className="py-10 w-full">
          <a
            href="/history"
            className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 shadow-lg shadow-cyan-500/50 font-medium rounded-full text-sm px-5 py-2.5 text-center"
          >
            Get started
          </a>
        </div>
      </div>
    </div>
  );
};

export default FormPage;
