import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type Transaction = {
  id: String;
  date: String;
  account: String;
  total: number;
  category: String;
  comment: String;
  type: String;
};

export const walletApi = createApi({
  reducerPath: "walletAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000/api/",
  }),
  endpoints: (builder) => ({
    //getUsers: builder.mutation({}) usar para enviar datos
    getWallet: builder.query<Transaction[], null>({
      query: () => "transaction", //https://jsonplaceholder.typicode.com/users
    }),
    getWalletById: builder.query<Transaction, { id: string }>({
      query: ({ id }) => `transaction/${id}`, //https://jsonplaceholder.typicode.com/user/id:5
    }),
  }),
});

export const { useGetWalletQuery, useGetWalletByIdQuery } = walletApi;
