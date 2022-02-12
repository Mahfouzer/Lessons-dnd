import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {
  AddLessonButton,
  Banner,
  DayContainer,
  DayInfo,
  WeekContainer,
  CloseButton,
} from "./WeekSchedule.styled";
import Lesson from "../Lesson/Lesson";
import { Days } from "../../Models/Days.model";
import LessonModal from "../LessonModal/LessonModal";
import LessonForm from "../LessonForm/LessonForm";
import { getItems, move, reorder } from "./helpers";

export default function WeekSchedule() {
  const [isLessonModalOpen, updateModalVisibility] = useState(false);
  const [targetLesson, setTargetLesson] = useState(null);
  const [state, setState] = useState([
    getItems(10),
    getItems(15, 10),
    getItems(5, 15),
    getItems(25, 20),
    getItems(25, 25),
    getItems(5, 30),
    getItems(5, 35),
  ]);

  function onDragEnd(result: any) {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }
    const sInd: number = +source.droppableId;
    const dInd = +destination.droppableId;

    // dropped inside the same column
    if (sInd === dInd) {
      const items = reorder(state[sInd], source.index, destination.index);
      const newState: any[] = [...state];
      newState[sInd] = items;
      setState(newState);
    } else {
      const result: any = move(state[sInd], state[dInd], source, destination);
      const newState: any[] = [...state];
      newState[sInd] = result[sInd];
      newState[dInd] = result[dInd];

      setState(newState);
    }
  }

  const toggleModalVisibility = () => {
    updateModalVisibility((visible) => !visible);
  };

  const removeLessonHandler = (daysIndex: number, lessonIndex: number) => {
    const newState = [...state];
    newState[daysIndex].splice(lessonIndex, 1);
    setState(newState);
  };

  const addNewLesson = (data: any) => {
    const dayNumber = Number(data.dayIndex);
    delete data.dayIndex;
    let schedule = [...state];
    schedule[dayNumber] = [...schedule[dayNumber], data];
    setState(schedule);
  };

  const updateCurrentLesson = (data: any) => {
    let schedule = [...state];
    const dayNumber = Number(data.dayIndex);
    const { id, subject, description } = data;
    delete data.dayIndex;

    let targetedLessonIndex = schedule[dayNumber].findIndex(
      (lesson) => lesson.id == id
    );
    schedule[dayNumber][targetedLessonIndex] = { id, subject, description };

    setState(schedule);
    setTargetLesson(null);
  };

  const renderDaysName = () =>
    Array.from({ length: 7 }).map((el, ind) => (
      <DayInfo key={Days[ind]}>{Days[ind]}</DayInfo>
    ));

  return (
    <div>
      <AddLessonButton
        type="button"
        onClick={() => {
          setTargetLesson(null);
          toggleModalVisibility();
        }}
      >
        Add new item
      </AddLessonButton>

      <WeekContainer>{renderDaysName()}</WeekContainer>
      <Banner>Weekdays</Banner>

      <WeekContainer>
        <DragDropContext onDragEnd={onDragEnd}>
          {state.map((el, daysIndex) => (
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
                            item: any,
                            daysIndex: any,
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
          submitHandler={(data: any) => {
            if (targetLesson) {
              updateCurrentLesson(data);
            } else {
              addNewLesson(data);
            }
            toggleModalVisibility();
          }}
          defaultValues={targetLesson}
        />
      </LessonModal>
    </div>
  );
}
