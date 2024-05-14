import { createSlice } from "@reduxjs/toolkit";

const hoy = new Date().toISOString();
const year = hoy.substr(0, 4);

const initialState = {
  byYear: year,
  byMonth: "",
  byType: "",
};

export const filterAnalyticsSlice = createSlice({
  name: "filterAnalytics",
  initialState,
  reducers: {
    filterByYear: (state, action) => {
      return { ...state, byYear: action.payload };
    },
    filterByMonth: (state, action) => {
      return { ...state, byMonth: action.payload };
    },
    filterByType: (state, action) => {
      return { ...state, byType: action.payload };
    },
  },
});

export const { filterByYear, filterByMonth, filterByType } =
  filterAnalyticsSlice.actions;

export default filterAnalyticsSlice.reducer;
