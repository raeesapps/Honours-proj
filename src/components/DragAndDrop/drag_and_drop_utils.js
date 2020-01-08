const alignments = Object.freeze({
  HORIZONTAL: 1,
  VERTICAL: 2,
});

function move(source, destination, criteria, droppableSource, droppableDestination) {
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

function reorder(list, startIndex, endIndex) {
  const result = [...list];
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
}

export { alignments, move, reorder };
