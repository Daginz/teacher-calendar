import * as React from "react";
import CalendarView from "@/features/calendar/components/CalendarView";
import { useAppDispatch } from "../features/calendar/store/hooks";
import { setData } from "@/features/calendar/store/calendarSlice";
import { setView, setStartDateToday } from "@/features/calendar/store/viewSlice";

// Test data
const schedule = [
{ startTime: "2025-09-03T22:30:00+00:00", endTime: "2025-09-04T02:29:59+00:00" },
{ startTime: "2025-09-05T01:30:00+00:00", endTime: "2025-09-05T04:59:59+00:00" },
{ startTime: "2025-09-05T11:00:00+00:00", endTime: "2025-09-05T19:29:59+00:00" },
{ startTime: "2025-09-07T02:30:00+00:00", endTime: "2025-09-07T06:59:59+00:00" },
{ startTime: "2025-09-08T23:00:00+00:00", endTime: "2025-09-08T08:29:59+00:00" },
{ startTime: "2025-09-10T22:30:00+00:00", endTime: "2025-09-11T02:29:59+00:00" },
{ startTime: "2025-09-01T01:30:00+00:00", endTime: "2025-09-01T04:59:59+00:00" },
{ startTime: "2025-09-01T11:00:00+00:00", endTime: "2025-09-01T19:29:59+00:00" },
];


const lessons = [
{ id: 52, duration: 60, startTime: "2025-09-05T13:30:00+00:00", endTime: "2025-09-05T14:29:59+00:00", student: "Alex" },
{ id: 53, duration: 30, startTime: "2025-09-01T11:30:00+00:00", endTime: "2025-09-01T11:59:59+00:00", student: "Kim" },
{ id: 54, duration: 90, startTime: "2025-09-07T07:00:00+00:00", endTime: "2025-09-07T08:29:59+00:00", student: "Sara", bookedByOther: true },
];


export default function CalendarPage() {
const dispatch = useAppDispatch();


React.useEffect(() => {
dispatch(setStartDateToday());
dispatch(setView("week"));
dispatch(setData({ schedule, lessons, granularity: 30 }));
}, [dispatch]);


return (
<div className="space-y-4">
<CalendarView />
</div>
);
}