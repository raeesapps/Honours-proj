const grid = 8;

function styles(isDragging, draggableStyle) {
  return {
    userSelect: 'none',
    margin: `0 ${grid}px 0 0`,
    background: isDragging ? 'lightgreen' : 'lightblue',
    ...draggableStyle,
  };
}

export default styles;
