const grid = 8;

function styles(isDragging, draggableStyle) {
  return {
    userSelect: 'none',
    padding: grid * 2,
    margin: `0 ${grid}px 0 0`,
    background: isDragging ? 'lightgreen' : 'grey',
    ...draggableStyle,
  };
}

export default styles;
