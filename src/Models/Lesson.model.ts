export type LessonType = {
  id: string;
  dayIndex?: string | number;
  subject: string;
  description: string;
}

export type WeekScheduleType = [
  LessonType[],
  LessonType[],
  LessonType[],
  LessonType[],
  LessonType[],
  LessonType[],
  LessonType[],
]