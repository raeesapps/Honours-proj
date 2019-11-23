const grid = 8;

function styles(isDraggingOver) {
  return {
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
    display: 'inline-block',
    padding: grid,
    overflow: 'auto',
    minHeight: '68px',
    minWidth: '80px',
    marginRight: '10px',
  };
}

export default styles;
