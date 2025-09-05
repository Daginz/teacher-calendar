import type { RootState } from "../store";
import { addDays, startOfDay } from "date-fns";
import { splitIntervalsByLocalDays, getLocalDayKey, filterLessonsByLocalDay } from "@/features/calendar/utils/time";
import { USER_TZ } from "@/features/calendar/model/constants";

export function selectView(state: RootState) {
  return state.view.view;
}

export function selectStartDateLocal(state: RootState) {
  return new Date(state.view.startDateISO);
}

export function selectGranularity(state: RootState) {
  return state.calendar.granularity;
}

export function selectVisibleDays(state: RootState, view: "day" | "3days" | "week", startDateLocal: Date) {
  const count = view === "day" ? 1 : view === "3days" ? 3 : 7;
  return Array.from({ length: count }, (_, i) => startOfDay(addDays(startDateLocal, i)));
}

export function selectDayIntervalsLocal(state: RootState, dayLocal: Date) {
  const split = splitIntervalsByLocalDays(state.calendar.schedule, USER_TZ);
  const key = getLocalDayKey(dayLocal);
  return split[key] ?? [];
}

export function selectLessonsForDay(state: RootState, dayLocal: Date) {
  return filterLessonsByLocalDay(state.calendar.lessons, dayLocal, USER_TZ);
}