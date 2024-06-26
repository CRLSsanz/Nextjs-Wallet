import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { useSession } from "next-auth/react";

type Transaction = {
  id: String;
  email: String;
  date: String;
  account: String;
  total: number;
  category: String;
  comment: String;
  type: String;
};

//const sessioEmail = "demo-wallet@gmail.com";

export const walletApi: any = createApi({
  reducerPath: "walletAPI",
  baseQuery: fetchBaseQuery({
    //baseUrl: "http://localhost:4000/api",
    baseUrl: "https://node-api-wallet.onrender.com/api",
  }),
  tagTypes: ["ListWallet", "OtherName"],
  endpoints: (builder) => ({
    //getUsers: builder.mutation({}) usar para enviar datos
    getWallet: builder.query<Transaction[], string>({
      //query: () => `/transaction/${sessioEmail}`, //https://jsonplaceholder.typicode.com/users
      query: (email) => `/transaction/${email}`,
      providesTags: ["ListWallet"],
      //transformResponse:(response:any)=>response.sort((a:any,b:any)=>b.id - a.id)
    }),

    //getWalletByEmail: builder.query<Transaction[], string>({
    //  query: (email) => `/transaction/${email}`, //https://jsonplaceholder.typicode.com/user/id:5
    //}),

    createWallet: builder.mutation({
      query: (newWallet) => ({
        url: "/transaction/",
        method: "POST",
        body: newWallet,
      }),
      invalidatesTags: ["ListWallet"],
    }),

    updateWallet: builder.mutation({
      query: (updateWallet) => ({
        url: `/transaction/${updateWallet.id}`,
        method: "PATCH",
        body: updateWallet,
      }),
      invalidatesTags: ["ListWallet"],
    }),

    deleteWallet: builder.mutation({
      query: (id) => ({
        url: `/transaction/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ListWallet"],
    }),
  }),
});

export const {
  useGetWalletQuery,
  //useGetWalletByEmailQuery,
  useCreateWalletMutation,
  useUpdateWalletMutation,
  useDeleteWalletMutation,
} = walletApi;
