import React from "react";
import {
  LessonCard,
  LessonContentWrapper,
  RemoveButton,
} from "./Lesson.styled";

export default function Lesson({
  item,
  daysIndex,
  lessonIndex,
  provided,
  snapshot,
  removeLessonHandler,
}: any) {
  return (
    <LessonCard
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      isDragged={snapshot.isDragging}
    >
      <LessonContentWrapper>
        {item.content}
        <RemoveButton
          type="button"
          onClick={() => removeLessonHandler(daysIndex, lessonIndex)}
        >
          Remove
        </RemoveButton>
      </LessonContentWrapper>
    </LessonCard>
  );
}