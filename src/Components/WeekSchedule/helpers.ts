import { DraggableLocation } from "react-beautiful-dnd";
import { LessonType } from "../../Models/Lesson.model";

export const reorder = (
  list: LessonType[],
  startIndex: number,
  endIndex: number
): LessonType[] => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result as LessonType[];
};

// Moves an item from one list to another list.
export const move = (
  source: LessonType[],
  destination: LessonType[],
  droppableSource: DraggableLocation,
  droppableDestination: DraggableLocation
) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result: {[x:number]:LessonType[]}= {
    [droppableSource.droppableId] : sourceClone,
    [droppableDestination.droppableId] : destClone,
  };

  return result;
};

// fake data generator
export const generateLesson = (lessonSubject: string) => [
  {
    id: `${Math.round(Math.random() * 100000)}`,
    subject: `${lessonSubject} Lesson`,
    description: "this is a lesson",
  },
];