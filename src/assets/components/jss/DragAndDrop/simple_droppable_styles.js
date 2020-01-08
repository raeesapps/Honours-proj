import alignment from '../../../../components/DragAndDrop/alignment';

const grid = 8;
const { HORIZONTAL } = alignment;

function styles(isDraggingOver, direction) {
  return {
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
    display: direction === HORIZONTAL ? 'inline-flex' : 'inline-block',
    padding: grid,
    overflow: 'auto',
    minHeight: '68px',
    minWidth: '80px',
    marginRight: '10px',
  };
}

export default styles;
