import { PayloadAction, createSlice } from "@reduxjs/toolkit";

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
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.counter += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export default counterSlice.reducer;
