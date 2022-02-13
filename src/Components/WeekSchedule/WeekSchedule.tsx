import { useEffect, useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import {
  DayContainer,
  WeekContainer,
  CloseButton,
  ScheduleContainer,
  WeekActionButtonsContainer,
  ActionButton,
  LoadingText,
} from "./WeekSchedule.styled";
import Lesson from "../Lesson/Lesson";
import LessonModal from "../LessonModal/LessonModal";
import LessonForm from "../LessonForm/LessonForm";
import { move, notifyError, notifySuccess, reorder } from "./helpers";
import WeekScheduleHeader from "./WeekScheduleHeader";
import { LessonType, WeekScheduleType } from "../../Models/Lesson.model";

export default function WeekSchedule() {
  const [isLessonModalOpen, updateModalVisibility] = useState(false);
  const [targetLesson, setTargetLesson] = useState<null | LessonType>(null);
  const [currentWeekNumber, setWeekNumber] = useState(0);
  const [weekScheduleData, setWeekScheduleData] =
    useState<null | WeekScheduleType>(null);

  useEffect(() => {
    fetch(`https://brass-graceful-rodent.glitch.me/weeks/${currentWeekNumber}`)
      .then((response) => response.json())
      .then(({ data }) => setWeekScheduleData(data))
      .catch((e)=> notifyError());
  }, [currentWeekNumber]);

  if (!weekScheduleData) {
    return <LoadingText>loading...</LoadingText>;
  }

  const UpdateWeekData = async (data: WeekScheduleType) => {
    // fallback data
    const preUpdatedData: WeekScheduleType = [...weekScheduleData];

    //optimistic update
    setWeekScheduleData(data);

    //request options
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: currentWeekNumber, data }),
    };

    //updating with server
    fetch(
      `https://brass-graceful-rodent.glitch.me/weeks/${currentWeekNumber}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((SuccessfulUpdatedWeek) => {
        setWeekScheduleData(SuccessfulUpdatedWeek.data);
        notifySuccess();
      })
      .catch((e) => {
        alert("An error happened please try again later");
        //fallback to previous data
        setWeekScheduleData(preUpdatedData);
        notifyError();
      });
  };

  function onDragEnd(result: DropResult): void {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination || !weekScheduleData) {
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

      const newWeekScheduleData: WeekScheduleType = [...weekScheduleData];
      newWeekScheduleData[sourceIndex] = items;
      UpdateWeekData(newWeekScheduleData);
    } else {
      const result = move(
        weekScheduleData[sourceIndex],
        weekScheduleData[destinationIndex],
        source,
        destination
      );
      const newWeekScheduleData: WeekScheduleType = [...weekScheduleData];
      newWeekScheduleData[sourceIndex] = result[sourceIndex];
      newWeekScheduleData[destinationIndex] = result[destinationIndex];

      UpdateWeekData(newWeekScheduleData);
    }
  }

  const toggleModalVisibility = (): void => {
    updateModalVisibility((visible: boolean) => !visible);
  };

  const removeLessonHandler = (
    daysIndex: number,
    lessonIndex: number
  ): void => {
    const newWeekScheduleData: WeekScheduleType = [...weekScheduleData];
    newWeekScheduleData[daysIndex].splice(lessonIndex, 1);
    UpdateWeekData(newWeekScheduleData);
  };

  const addNewLesson = (data: LessonType): void => {
    const dayNumber = Number(data.dayIndex);
    delete data.dayIndex;
    let newWeekScheduleData: WeekScheduleType = [...weekScheduleData];
    newWeekScheduleData[dayNumber] = [...newWeekScheduleData[dayNumber], data];
    UpdateWeekData(newWeekScheduleData);
  };

  const updateCurrentLesson = (data: LessonType): void => {
    let newWeekScheduleData: WeekScheduleType = [...weekScheduleData];
    const dayNumber = Number(data.dayIndex);
    const { id, subject, description } = data;
    delete data.dayIndex;

    let targetedLessonIndex = newWeekScheduleData[dayNumber].findIndex(
      (lesson: LessonType) => lesson.id == id
    );
    newWeekScheduleData[dayNumber][targetedLessonIndex] = {
      id,
      subject,
      description,
    };

    UpdateWeekData(newWeekScheduleData);
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

  const goToNextWeekHandler = () => {
    setWeekNumber((number) => number + 1);
  };

  const goToPreviousWeekHandler = () => {
    setWeekNumber((number) => number - 1);
  };

  return (
      <ScheduleContainer>
      <WeekActionButtonsContainer>
        <ActionButton
          type="button"
          onClick={goToPreviousWeekHandler}
          disabled={currentWeekNumber === 0}
        >
          Previous Week
        </ActionButton>
        <ActionButton type="button" onClick={openNewLessonModal}>
          + Add new Lesson
        </ActionButton>
        <ActionButton
          type="button"
          onClick={goToNextWeekHandler}
          disabled={currentWeekNumber === 2}
        >
          Next Week
        </ActionButton>
      </WeekActionButtonsContainer>

        <WeekScheduleHeader />

        <WeekContainer>
          <DragDropContext onDragEnd={onDragEnd}>
            {weekScheduleData &&
              weekScheduleData.map((dayData: LessonType[], daysIndex) => (
                <Droppable key={daysIndex} droppableId={`${daysIndex}`}>
                  {(provided, snapshot) => (
                    <DayContainer
                      ref={provided.innerRef}
                      isDraggingOver={snapshot.isDraggingOver}
                      {...provided.droppableProps}
                    >
                      {Boolean(dayData.length) &&
                        dayData.map((item, lessonIndex) => (
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
                                  setTargetLesson({
                                    ...item,
                                    dayIndex: daysIndex,
                                  });
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
  );
}
