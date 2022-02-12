import { DraggableProvided, DraggableStateSnapshot } from "react-beautiful-dnd";
import { LessonType } from "../../Models/Lesson.model";
import {
  LessonCard,
  LessonContentWrapper,
  LessonDescription,
  RemoveButton,
  UpdateButton,
} from "./Lesson.styled";

interface LessonProps {
  item: LessonType;
  daysIndex: number;
  lessonIndex: number;
  provided: DraggableProvided;
  snapshot: DraggableStateSnapshot;
  removeLessonHandler: (daysIndex: number, lessonIndex: number) => void;
  updateLessonHandler: (
    item: LessonType,
    daysIndex: number,
    lessonIndex: number
  ) => void;
}

export default function Lesson({
  item,
  daysIndex,
  lessonIndex,
  provided,
  snapshot,
  removeLessonHandler,
  updateLessonHandler,
}: LessonProps) {
  return (
    <LessonCard
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      isDragged={snapshot.isDragging}
    >
      <LessonContentWrapper>
        {item.subject}
        <LessonDescription>{item.description}</LessonDescription>

        <UpdateButton
          type="button"
          onClick={() => updateLessonHandler(item, daysIndex, lessonIndex)}
        >
          Edit
        </UpdateButton>

        <RemoveButton
          type="button"
          onClick={() => removeLessonHandler(daysIndex, lessonIndex)}
        >
          Delete
        </RemoveButton>
      </LessonContentWrapper>
    </LessonCard>
  );
}
