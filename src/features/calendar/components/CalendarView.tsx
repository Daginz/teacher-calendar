import { useRef, useMemo } from "react";
import CalendarGrid from "./CalendarGrid";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  selectGranularity,
  selectStartDateLocal,
  selectView,
} from "@/features/calendar/store/selectors";
import {
  next,
  prev,
  setStartDateToday,
  setView,
} from "@/features/calendar/store/viewSlice";
import useResponsiveView from "../hooks/useResponsiveView";
import { useSwipeNav } from "../hooks/useSwipeNav";
import type { View } from "@/features/calendar/model/types";

function formatRangeLabel(view: View, startDate: Date) {
  const opts: Intl.DateTimeFormatOptions = { day: "2-digit", month: "short" };
  const startStr = startDate.toLocaleDateString(undefined, opts);

  if (view === "day") return startStr;

  const end = new Date(startDate);
  end.setDate(end.getDate() + (view === "3days" ? 2 : 6));
  const endStr = end.toLocaleDateString(undefined, opts);

  const sameMonth = startDate.getMonth() === end.getMonth();
  if (sameMonth) {
    // пример: "12 – 18 Sep"
    const sDay = startStr.split(" ")[0];
    return `${sDay} – ${endStr}`;
  }
  // пример: "30 Sep – 06 Oct"
  return `${startStr} – ${endStr}`;
}

export default function CalendarView() {
  const dispatch = useAppDispatch();

  const view = useAppSelector(selectView);
  const startDate = useAppSelector(selectStartDateLocal);
  const granularity = useAppSelector(selectGranularity);

  useResponsiveView();

  const scrollRef = useRef<HTMLDivElement>(null);
  useSwipeNav(scrollRef, () => dispatch(next()), () => dispatch(prev()));

  const label = useMemo(() => formatRangeLabel(view, startDate), [view, startDate]);

  return (
    <section className="space-y-3">
      <header className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="border rounded px-2 py-1 hover:bg-accent active:brightness-95"
            onClick={() => dispatch(prev())}
            aria-label="Previous range"
          >
            {"<"}
          </button>
          <button
            type="button"
            className="border rounded px-2 py-1 hover:bg-accent active:brightness-95"
            onClick={() => dispatch(next())}
            aria-label="Next range"
          >
            {">"}
          </button>
          <button
            type="button"
            className="border rounded px-3 py-1 hover:bg-accent active:brightness-95"
            onClick={() => dispatch(setStartDateToday())}
          >
            Сегодня
          </button>
        </div>

        <div className="text-sm opacity-80 font-medium select-none">
          {label} · {view.toUpperCase()}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className={`border rounded px-3 py-1 ${
              view === "day" ? "bg-foreground text-background" : "hover:bg-accent"
            }`}
            onClick={() => dispatch(setView("day"))}
          >
            Day
          </button>
          <button
            type="button"
            className={`border rounded px-3 py-1 ${
              view === "3days" ? "bg-foreground text-background" : "hover:bg-accent"
            }`}
            onClick={() => dispatch(setView("3days"))}
          >
            3 days
          </button>
          <button
            type="button"
            className={`border rounded px-3 py-1 ${
              view === "week" ? "bg-foreground text-background" : "hover:bg-accent"
            }`}
            onClick={() => dispatch(setView("week"))}
          >
            Week
          </button>
        </div>
      </header>

      <div ref={scrollRef} className="overflow-x-auto scroll-x-snap">
        <CalendarGrid
          view={view}
          startDateLocal={startDate}
          granularity={granularity}
        />
      </div>
    </section>
  );
}
