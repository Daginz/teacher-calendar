import * as React from "react";
import type { View } from "@/features/calendar/model/types";
import { getRowCount } from "@/features/calendar/utils/grid";
import { useAppSelector } from "../store/hooks";
import { selectVisibleDays } from "@/features/calendar/store/selectors";
import TimeAxis from "./TimeAxis";
import DayColumn from "./DayColumn";


export default function CalendarGrid({ view, startDateLocal, granularity }: { view: View; startDateLocal: Date; granularity: number; }) {
const days = useAppSelector((s) => selectVisibleDays(s, view, startDateLocal));
const rows = React.useMemo(() => getRowCount(granularity), [granularity]);


return (
<div className="grid border rounded-lg overflow-hidden"
    style={{
gridTemplateColumns: `var(--time-col-width) repeat(${days.length}, minmax(0, 1fr))`,
gridTemplateRows: `40px repeat(${rows}, minmax(28px, 1fr))`,}}
>
<div className="bg-background border-b" style={{ gridColumn: "1 / 2", gridRow: "1 / 2" }} />


{days.map((d, i) => (
<div key={+d} className="bg-background border-b text-center font-medium" 
style={{ gridColumn: `${2 + i} / ${3 + i}`, gridRow: "1 / 2" }}>
    {d.toLocaleDateString(undefined, { weekday: "short", day: "2-digit", month: "short" })}
</div>
))}


<TimeAxis rows={rows} granularity={granularity} />
{days.map((d, i) => (
    <DayColumn key={+d} dayLocal={d} dayIndex={i} granularity={granularity} />
))}</div>
);}