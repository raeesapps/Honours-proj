export default function move(source, destination, droppableSource, droppableDestination) {
  const sourceCopy = [...source];
  const destinationCopy = [...destination];
  const [removed] = sourceCopy.splice(droppableSource.index, 1);

  destinationCopy.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceCopy;
  result[droppableDestination.droppableId] = destinationCopy;

  return result;
}
