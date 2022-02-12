export const reorder = (list: any, startIndex: any, endIndex: any) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

/**
 * Moves an item from one list to another list.
 */
export const move = (
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


// fake data generator
export const getItems = (count: any, offset = 0) => [
    {
      id: `${Math.round(Math.random() * 100000)}`,
      subject: `item ${offset}`,
      description: "this is a lesson",
    },
  ];