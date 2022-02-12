import React from "react";
import {
  LessonCard,
  LessonContentWrapper,
  ActionButton,
  LessonDescription,
} from "./Lesson.styled";

export default function Lesson({
  item,
  daysIndex,
  lessonIndex,
  provided,
  snapshot,
  removeLessonHandler,
  updateLessonHandler
}: any) {
  return (
    <LessonCard
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      isDragged={snapshot.isDragging}
    >
      <LessonContentWrapper>
        {item.subject}
        <ActionButton
          type="button"
          onClick={() => removeLessonHandler(daysIndex, lessonIndex)}
        >
          🗑
        </ActionButton>

        <ActionButton
          type="button"
          onClick={() => updateLessonHandler(item, daysIndex, lessonIndex)}
        >
          📝	
        </ActionButton>
        
        <LessonDescription>
        {item.description}
        </LessonDescription>
      </LessonContentWrapper>
    </LessonCard>
  );
}
