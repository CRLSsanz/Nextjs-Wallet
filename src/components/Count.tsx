"use client";
import React from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { decrement, increment } from "@/redux/features/counterSlice";

const Count = () => {
  const count = useAppSelector((state) => state.counterReducer.counter);
  const dispatch = useAppDispatch();

  //const wallet = useAppSelector((state) => state.wallet);
  //const dispatch = useAppDispatch();

  return (
    <>
      <div>
        <h1 className="w-full text-xl">Total: {count}</h1>
        <button
          onClick={() => {
            dispatch(increment());
          }}
          className="bg-zinc-400 rounded-md px-5 py-2 mr-5"
        >
          Increment
        </button>
        <button
          onClick={() => {
            dispatch(decrement());
          }}
          className="bg-zinc-400/50 rounded px-5 py-2"
        >
          Decrement
        </button>
      </div>
      {/*
      <div>
        {wallet?.map((item, index) => (
          <div key={index} className="flex border rounded-md mb-2">
            <h1>Type: {item.type}</h1>
            <h1>Email user: {item.email}</h1>
          </div>
        ))}
      </div>
      */}
    </>
  );
};

export default Count;
