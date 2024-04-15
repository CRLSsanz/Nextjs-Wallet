"use client";
import Image from "next/image";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";

const LoginPage = () => {
  const { data: session } = useSession();
  console.log(session);

  return (
    <div className="flex justify-center">
      <div className="w-full md:max-w-[600px] mt-32 mx-4 min-h-[calc(100vh-250px)] bg-gray-50 rounded-2xl rounded-tl-[80px] rounded-br-[40px]">
        <div className="text-base px-8 md:px-24">
          <h1 className="h-16 md:h-32"></h1>
          <h1 className="text-4xl text-gray-300 mb-3">
            Manage your <span className="text-cyan-600">Expenses</span> more
            easily
          </h1>
          <p className=" text-gray-500 text-sm mb-6">
            Get complete control over your expenses and save as mush as you
            want.
          </p>

          <div className="p-4">
            <div className="mb-2 hidden">Login</div>
            <div className="hidden relative">
              <input
                className="w-full py-2 px-4 border border-gray-300 rounded-full mb-2"
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
            <div className="hidden relative">
              <input
                className="w-full py-2 px-4 border border-gray-300 rounded-full mb-5"
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

            {/* LOGIN CON GOOGLE FACCEBOOK Y GITHUB */}

            {!session?.user ? (
              <div className="flex flex-col items-center text-gray-600 space-y-5">
                <div
                  onClick={() => signIn("google")}
                  className="w-72 flex flex-row items-center py-2 px-3 border border-gray-300 rounded-md cursor-pointer"
                >
                  <Image
                    src="/images/Google.png"
                    width={27}
                    height={27}
                    alt="facebook image"
                  />
                  <span className="w-full text-center">Acceder con Google</span>
                </div>

                <div
                  onClick={() => signIn("facebook")}
                  className="w-72 flex flex-row items-center py-2 px-3 border border-gray-300 rounded-md cursor-pointer"
                >
                  <img
                    src="/images/facebook.png"
                    style={{ width: "30px" }}
                    alt="google image"
                  />
                  <span className="w-full text-center">
                    Acceder con Facebook
                  </span>
                </div>

                <div
                  onClick={() => signIn("github")}
                  className="w-72 flex flex-row items-center py-2 px-3 border border-gray-300 rounded-md cursor-pointer"
                >
                  <Image
                    src="/images/github.png"
                    width={30}
                    height={30}
                    alt="github image"
                  />
                  <span className="w-full text-center">Acceder con Github</span>
                </div>
              </div>
            ) : (
              <Link
                href="/analytics"
                className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 shadow-lg shadow-cyan-500/50 font-medium rounded-full text-sm px-5 py-2.5 text-center"
              >
                Get started
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
