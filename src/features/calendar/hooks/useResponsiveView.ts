import { useEffect } from "react";
import { useAppDispatch } from "../store/hooks";
import { setView } from "../store/viewSlice";

export default function useResponsiveView() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const apply = () => {
      const w = window.innerWidth;
      // <640 — day, 640..1024 — 3days, >=1024 — week
      const next = w < 640 ? "day" : w < 1024 ? "3days" : "week";
      dispatch(setView(next));
    };
    apply();
    window.addEventListener("resize", apply);
    return () => window.removeEventListener("resize", apply);
  }, [dispatch]);
}
