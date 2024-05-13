import { createSlice } from "@reduxjs/toolkit";

const hoy = new Date().toISOString();
const year = hoy.substr(0, 4);
const month = hoy.substr(5, 2);

const initialState = {
  byYear: year,
  byMonth: month,
};

export const filterSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    filterByYear: (state, action) => {
      return { ...state, byYear: action.payload };
    },
    filterByMonth: (state, action) => {
      return { ...state, byMonth: action.payload };
    },
  },
});

export const { filterByYear, filterByMonth } = filterSlice.actions;

export default filterSlice.reducer;
