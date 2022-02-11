import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {DayContainer, WeekContainer} from "./WeekSchedule.styled"
import Lesson from "../Lesson/Lesson";
import { Days } from "../../Models/Days.model";



// fake data generator
const getItems = (count: any, offset = 0) => [
  {
    id: `${Math.round(Math.random() * 100000)}`,
    content: `item ${offset}`,
  },
];

const reorder = (list: any, startIndex: any, endIndex: any) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (
  source: any,
  destination: any,
  droppableSource: { droppableId: number; index: number },
  droppableDestination: any
) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result: any = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

export default function WeekSchedule() {
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

  const removeLessonHandler = (daysIndex: number, lessonIndex: number) => {
    const newState = [...state];
    newState[daysIndex].splice(lessonIndex, 1);
    setState(newState);
  };

  

  

  return (
    <div>
     
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
    </div>
  );
}
