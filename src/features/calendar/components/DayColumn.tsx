import * as React from "react";
import { useAppSelector } from "../store/hooks";
import { generateSlots, isSlotAvailable } from "@/features/calendar/utils/time";
import { rowStartFromIndex, lessonSpanRows } from "@/features/calendar/utils/grid";
import { selectDayIntervalsLocal, selectLessonsForDay } from "@/features/calendar/store/selectors";
import SlotCell from "./SlotCell";
import LessonBlock from "./LessonBlock";


export default function DayColumn({ dayLocal, dayIndex, granularity }: { dayLocal: Date; dayIndex: number; granularity: number; }) {
    const dayIntervals = useAppSelector((s) => selectDayIntervalsLocal(s, dayLocal));
    const lessons = useAppSelector((s) => selectLessonsForDay(s, dayLocal));
    const slots = React.useMemo(() => generateSlots(dayLocal, granularity), [dayLocal, granularity]);


return (
<>
{slots.map(({ start, end, index }) => {
    const available = isSlotAvailable(start, end, dayIntervals);
        return (
            <SlotCell key={index} available={available} dayIndex={dayIndex} row={rowStartFromIndex(index)} slotTime={{ start, end }} />
);
})}


{lessons.map((les) => {
    const minutesFromDayStart = new Date(les.startTime);
    const start = new Date(les.startTime);
    const startIndex = Math.floor((start.getHours() * 60 + start.getMinutes()) / granularity);
    const span = lessonSpanRows(les.duration, granularity);
    const rowStart = 2 + startIndex;
    const rowEnd = rowStart + span;
    return (
        <LessonBlock key={les.id} dayIndex={dayIndex} rowStart={rowStart} rowEnd={rowEnd} lesson={les} />
);
})}
</>
);
}