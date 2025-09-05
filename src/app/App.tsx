import * as React from "react";
import { Routes, Route, Link } from "react-router-dom";
import CalendarPage from "../routes/CalendarPage";


export default function App() {
return (
<div className="min-h-full">
  <header className="border-b sticky top-0 bg-background z-20">
    <div className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
      <Link to="/" className="font-semibold">Teacher Calendar</Link>
      <nav className="text-sm">
        <Link to="/" className="hover:underline">Calendar</Link>
      </nav>
    </div>
  </header>
  <main className="mx-auto max-w-6xl px-4 py-4">
    <Routes>
      <Route path="/" element={<CalendarPage />} />
    </Routes>
  </main>
</div>
);
}