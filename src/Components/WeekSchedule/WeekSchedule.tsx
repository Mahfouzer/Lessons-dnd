import { useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import {
  AddLessonButton,
  DayContainer,
  WeekContainer,
  CloseButton,
  ScheduleContainer,
} from "./WeekSchedule.styled";
import Lesson from "../Lesson/Lesson";
import LessonModal from "../LessonModal/LessonModal";
import LessonForm from "../LessonForm/LessonForm";
import { generateLesson, move, reorder } from "./helpers";
import WeekScheduleHeader from "./WeekScheduleHeader";
import { LessonType } from "../../Models/Lesson.model";

export default function WeekSchedule() {
  const [isLessonModalOpen, updateModalVisibility] = useState(false);
  const [targetLesson, setTargetLesson] = useState<null|LessonType>(null);
  const [weekScheduleData, setWeekScheduleData] = useState([
    generateLesson("Math"),
    [],
    generateLesson("English"),
    [],
    [],
    generateLesson("Art"),
    generateLesson("Programming"),
  ]);

  function onDragEnd(result: DropResult): void {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }
    const sourceIndex: number = Number(source.droppableId);
    const destinationIndex: number = Number(destination.droppableId);

    // dropped inside the same column
    if (sourceIndex === destinationIndex) {
      const items: LessonType[] = reorder(
        weekScheduleData[sourceIndex],
        source.index,
        destination.index
      );
      const newWeekScheduleData = [...weekScheduleData];

      newWeekScheduleData[sourceIndex] = items;
      setWeekScheduleData(newWeekScheduleData);
    } else {
      const result = move(
        weekScheduleData[sourceIndex],
        weekScheduleData[destinationIndex],
        source,
        destination
      );
      const newWeekScheduleData = [...weekScheduleData];
      newWeekScheduleData[sourceIndex] = result[sourceIndex];
      newWeekScheduleData[destinationIndex] = result[destinationIndex];

      setWeekScheduleData(newWeekScheduleData);
    }
  }

  const toggleModalVisibility = (): void => {
    updateModalVisibility((visible: boolean) => !visible);
  };

  const removeLessonHandler = (
    daysIndex: number,
    lessonIndex: number
  ): void => {
    const newWeekScheduleData = [...weekScheduleData];
    newWeekScheduleData[daysIndex].splice(lessonIndex, 1);
    setWeekScheduleData(newWeekScheduleData);
  };

  const addNewLesson = (data: LessonType): void => {
    const dayNumber = Number(data.dayIndex);
    delete data.dayIndex;
    let schedule = [...weekScheduleData];
    schedule[dayNumber] = [...schedule[dayNumber], data];
    setWeekScheduleData(schedule);
  };

  const updateCurrentLesson = (data: LessonType): void => {
    let schedule = [...weekScheduleData];
    const dayNumber = Number(data.dayIndex);
    const { id, subject, description } = data;
    delete data.dayIndex;

    let targetedLessonIndex = schedule[dayNumber].findIndex(
      (lesson: LessonType) => lesson.id == id
    );
    schedule[dayNumber][targetedLessonIndex] = { id, subject, description };

    setWeekScheduleData(schedule);
    setTargetLesson(null);
  };

  const openNewLessonModal = () => {
    setTargetLesson(null);
    toggleModalVisibility();
  };

  const handleLessonSubmit = (data: LessonType): void => {
    if (targetLesson) {
      updateCurrentLesson(data);
    } else {
      addNewLesson(data);
    }
    toggleModalVisibility();
  };

  return (
    <>
      <AddLessonButton type="button" onClick={openNewLessonModal}>
        + Add new Lesson
      </AddLessonButton>
      <ScheduleContainer>
        <WeekScheduleHeader />
        <WeekContainer>
          <DragDropContext onDragEnd={onDragEnd}>
            {weekScheduleData.map((el, daysIndex) => (
              <Droppable key={daysIndex} droppableId={`${daysIndex}`}>
                {(provided, snapshot) => (
                  <DayContainer
                    ref={provided.innerRef}
                    isDraggingOver={snapshot.isDraggingOver}
                    {...provided.droppableProps}
                  >
                    {el.map((item, lessonIndex) => (
                      <Draggable
                        key={item.id}
                        draggableId={item.id}
                        index={lessonIndex}
                      >
                        {(provided, snapshot) => (
                          <Lesson
                            item={item}
                            lessonIndex={lessonIndex}
                            daysIndex={daysIndex}
                            provided={provided}
                            snapshot={snapshot}
                            removeLessonHandler={removeLessonHandler} // could be refactored into a component
                            updateLessonHandler={(
                              item: LessonType,
                              daysIndex: number
                            ) => {
                              setTargetLesson({ ...item, dayIndex: daysIndex });
                              toggleModalVisibility();
                            }}
                          />
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </DayContainer>
                )}
              </Droppable>
            ))}
          </DragDropContext>
        </WeekContainer>

        <LessonModal isLessonModalOpen={isLessonModalOpen}>
          <CloseButton onClick={toggleModalVisibility}>Close</CloseButton>
          <LessonForm
            submitHandler={handleLessonSubmit}
            defaultValues={targetLesson}
          />
        </LessonModal>
      </ScheduleContainer>
    </>
  );
}
