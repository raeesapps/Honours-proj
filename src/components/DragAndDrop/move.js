export default function move(source, destination, criteria, droppableSource, droppableDestination) {
  if (!criteria) {
    return {};
  }

  const sourceCopy = [...source];
  const destinationCopy = [...destination];
  const [removed] = sourceCopy.splice(droppableSource.index, 1);

  destinationCopy.splice(droppableDestination.index, 0, removed);

  return {
    [droppableSource.droppableId]: sourceCopy,
    [droppableDestination.droppableId]: destinationCopy,
  };
}
