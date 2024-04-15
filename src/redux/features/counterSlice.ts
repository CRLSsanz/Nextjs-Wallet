import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  counter: 30,
};

export const counterSlice = createSlice({
  name: "counter", // su nombre
  //initialState:{  // estado inicial
  //    value:0
  //},
  initialState,
  reducers: {
    // funciones que actualizas
    increment: (state) => {
      state.counter += 1;
    },
    decrement: (state) => {
      state.counter -= 1;
    },
  },
});

export const { increment, decrement } = counterSlice.actions;

export default counterSlice.reducer;
