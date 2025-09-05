import * as React from "react";
import { cn } from "@/lib/utils";

export default function SlotCell({
  available, dayIndex, row, slotTime,
}:{ available: boolean; dayIndex: number; row: number; slotTime: { start: Date; end: Date }; }) {
  const col = 2 + dayIndex;
  const commonStyle = { gridColumn: `${col} / ${col + 1}`, gridRow: `${row} / ${row + 1}` } as const;

  if (!available) {
    return <div className="border-b border-r bg-gray-100" style={commonStyle} aria-disabled />;
  }

  return (
    <button
      className={cn(
        "border-b border-r h-full w-full text-left bg-green-200 px-2",
        "md:hover:bg-green-300",             // hover только на md+
        "active:brightness-95 touch-manipulation" // приятный тап на мобиле
      )}
      style={commonStyle}
      onClick={() =>
        alert(slotTime.start.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }))
      }
    />
  );
}
