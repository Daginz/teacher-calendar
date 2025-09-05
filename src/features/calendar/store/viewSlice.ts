import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { View } from "@/features/calendar/model/types";
import { addDays, startOfDay } from "date-fns";

export interface ViewState {
  view: View;
  startDateISO: string;
}

const initialState: ViewState = {
  view: "week",
  startDateISO: startOfDay(new Date()).toISOString(),
};

const viewSlice = createSlice({
  name: "view",
  initialState,
  reducers: {
    setView(state, action: PayloadAction<View>) {
      state.view = action.payload;
    },
    setStartDate(state, action: PayloadAction<string>) {
      state.startDateISO = action.payload;
    },
    setStartDateToday(state) {
      state.startDateISO = startOfDay(new Date()).toISOString();
    },
    next(state) {
      const delta = state.view === "day" ? 1 : state.view === "3days" ? 3 : 7;
      state.startDateISO = startOfDay(addDays(new Date(state.startDateISO), delta)).toISOString();
    },
    prev(state) {
      const delta = state.view === "day" ? -1 : state.view === "3days" ? -3 : -7;
      state.startDateISO = startOfDay(addDays(new Date(state.startDateISO), delta)).toISOString();
    },
  },
});

export const { setView, setStartDate, setStartDateToday, next, prev } = viewSlice.actions;
export default viewSlice.reducer;