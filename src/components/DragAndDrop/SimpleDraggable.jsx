import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

import styles from '../../assets/components/jss/DragAndDrop/simple_draggable_styles';

function SimpleDraggable({ item, index, ...rest }) {
  return (
    <Draggable draggableId={item.id} index={index} {...rest}>
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
