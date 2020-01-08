import { alignments } from '../../../../components/DragAndDrop/drag_and_drop_utils';

const grid = 8;
const { HORIZONTAL } = alignments;

function styles(isDraggingOver, direction) {
  return {
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
    display: direction === HORIZONTAL ? 'inline-flex' : 'inline-block',
    padding: grid,
    overflow: 'auto',
    minHeight: '58px',
    minWidth: '60px',
    marginRight: '10px',
  };
}

export default styles;
