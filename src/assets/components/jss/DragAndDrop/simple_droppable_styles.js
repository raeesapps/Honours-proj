const grid = 8;

function styles(isDraggingOver) {
  return {
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
    display: 'flex',
    padding: grid,
    overflow: 'auto',
  };
}

export default styles;
