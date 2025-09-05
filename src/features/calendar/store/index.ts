import { configureStore } from "@reduxjs/toolkit";
import calendarReducer from "@/features/calendar/store/calendarSlice";
import viewReducer from "@/features/calendar/store/viewSlice";


export const store = configureStore({
reducer: {
calendar: calendarReducer,
view: viewReducer,
},
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;