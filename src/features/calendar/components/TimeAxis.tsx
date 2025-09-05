import * as React from "react";
import { addMinutes, startOfDay } from "date-fns";

export default function TimeAxis({ rows, granularity }:{ rows: number; granularity: number; }) {
  const start = startOfDay(new Date());
  return (
    <>
      {Array.from({ length: rows }).map((_, i) => {
        const t = addMinutes(start, i * granularity);
        return (
          <div
            key={i}
            className="border-r border-b px-2 text-xs flex items-center justify-end sticky-left"
            style={{ gridColumn: "1 / 2", gridRow: `${2 + i} / ${3 + i}` }}
          >
            {t.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </div>
        );
      })}
    </>
  );
}
