import * as React from "react";
import { cn } from "@/lib/utils";
import type { Lesson } from "@/features/calendar/model/types";


export default function LessonBlock({ dayIndex, rowStart, rowEnd, lesson }: { dayIndex: number; rowStart: number; rowEnd: number; lesson: Lesson; }) {
const col = 2 + dayIndex;
return (
<div
className={cn(
  "border-r rounded-sm px-2 py-1 text-sm flex items-center bg-red-300 md:hover:bg-red-400",
  "active:brightness-95 touch-manipulation",
  lesson.bookedByOther && "opacity-60 pointer-events-none"
)} style={{ gridColumn: `${col} / ${col + 1}`, gridRow: `${rowStart} / ${rowEnd}` }}
title={`${lesson.student}`} role="button"
onClick={() => alert(`${lesson.student}`)}
>
{lesson.student}
</div>
);
}