export type ISO = string;

export type ScheduleInterval = {
  startTime: ISO;
  endTime: ISO;
};

export type Lesson = {
  id: number | string;
  duration: 30 | 60 | 90;
  startTime: ISO;
  endTime: ISO;
  student: string;
  bookedByOther?: boolean;
};

export type View = "day" | "3days" | "week";