import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

import styles from '../../assets/components/jss/DragAndDrop/simple_draggable_styles';

function SimpleDraggable({ item, index }) {
  return (
    <Draggable key={item.id} draggableId={item.id} index={index}>
      {(providedInner, snapshotInner) => (
        <div
          ref={providedInner.innerRef}
          {...providedInner.draggableProps}
          {...providedInner.dragHandleProps}
          style={styles(
            snapshotInner.isDragging,
            providedInner.draggableProps.style,
          )}
        >
          {item.content}
        </div>
      )}
    </Draggable>
  );
}

export default SimpleDraggable;
