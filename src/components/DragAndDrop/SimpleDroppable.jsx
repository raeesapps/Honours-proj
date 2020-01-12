import React from 'react';
import { Droppable } from 'react-beautiful-dnd';

import { alignments } from './drag_and_drop_utils';
import SimpleDraggable from './SimpleDraggable';
import styles from '../../assets/components/jss/DragAndDrop/simple_droppable_styles';

function SimpleDroppable({ items, droppableId, alignment, ...rest }) {
  const { HORIZONTAL } = alignments;
  return (
    <Droppable droppableId={droppableId} direction={alignment === HORIZONTAL ? 'horizontal' : 'vertical'} {...rest}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          style={styles(snapshot.isDraggingOver, alignment)}
          {...provided.droppableProps}
        >
          {items.map((item, index) => (
            <SimpleDraggable key={item.id} item={item} index={index} />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}

export default React.memo(SimpleDroppable);
