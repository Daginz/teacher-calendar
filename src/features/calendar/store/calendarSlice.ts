import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Lesson, ScheduleInterval } from "@/features/calendar/model/types";
import { DEFAULT_GRANULARITY } from "@/features/calendar/model/constants";


interface CalendarState {
schedule: ScheduleInterval[];
lessons: Lesson[];
granularity: 15 | 30 | 60;
}


const initialState: CalendarState = {
schedule: [],
lessons: [],
granularity: DEFAULT_GRANULARITY,
};


const calendarSlice = createSlice({
name: "calendar",
initialState,
reducers: {
setData(
state,
action: PayloadAction<{ schedule: ScheduleInterval[]; lessons: Lesson[]; granularity?: 15 | 30 | 60 }>
) {
state.schedule = action.payload.schedule;
state.lessons = action.payload.lessons;
state.granularity = action.payload.granularity ?? state.granularity;
},
setGranularity(state, action: PayloadAction<15 | 30 | 60>) {
state.granularity = action.payload;
},
},
});


export const { setData, setGranularity } = calendarSlice.actions;
export default calendarSlice.reducer;