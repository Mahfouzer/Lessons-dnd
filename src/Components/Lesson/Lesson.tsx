import {
  LessonCard,
  LessonContentWrapper,
  LessonDescription,
  RemoveButton,
  UpdateButton,
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
        <LessonDescription>
        {item.description}
        </LessonDescription>

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
