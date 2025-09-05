import { addDays, addMinutes, endOfDay, isAfter, isBefore, isSameDay, startOfDay } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import type { ScheduleInterval, Lesson } from "@/features/calendar/model/types";


export function toLocal(isoUtc: string, tz: string): Date {
return toZonedTime(new Date(isoUtc), tz);
}


export function getLocalDayKey(d: Date) {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
}


export function splitIntervalsByLocalDays(intervals: ScheduleInterval[], tz: string) {
    const map: Record<string, { start: Date; end: Date }[]> = {};
        for (const it of intervals) {
            let s = toLocal(it.startTime, tz);
            let e = toLocal(it.endTime, tz);
                if (isAfter(s, e)) {
                    [s, e] = [e, s];
                }
            let curDayStart = startOfDay(s);
            let curDayEnd = endOfDay(s);


        while (isBefore(curDayEnd, e)) {
            const key = getLocalDayKey(curDayStart);
            (map[key] ||= []).push({ start: s, end: curDayEnd });
            curDayStart = startOfDay(addDays(curDayStart, 1));
            curDayEnd = endOfDay(curDayStart);
            s = curDayStart;
        }
        const key = getLocalDayKey(curDayStart);
        (map[key] ||= []).push({ start: s, end: e });
}
    return map;
}


export function generateSlots(dayLocal: Date, granularity = 30) {
    const start = startOfDay(dayLocal);
    const slots: { start: Date; end: Date; index: number }[] = [];
    const rows = (24 * 60) / granularity;
        for (let i = 0; i < rows; i++) {
            const s = addMinutes(start, i * granularity);
            const e = addMinutes(s, granularity);
            slots.push({ start: s, end: e, index: i });
}
    return slots;
}


export function intervalsOverlap(aStart: Date, aEnd: Date, bStart: Date, bEnd: Date) {
    return isBefore(aStart, bEnd) && isAfter(aEnd, bStart);
}


export function isSlotAvailable(slotStart: Date, slotEnd: Date, dayIntervalsLocal: { start: Date; end: Date }[]) {
    return dayIntervalsLocal.some(({ start, end }) => intervalsOverlap(start, end, slotStart, slotEnd));
}


export function filterLessonsByLocalDay(lessons: Lesson[], dayLocal: Date, tz: string) {
    return lessons.filter((l) => {
    const s = toLocal(l.startTime, tz);
    return isSameDay(s, dayLocal);
});
}