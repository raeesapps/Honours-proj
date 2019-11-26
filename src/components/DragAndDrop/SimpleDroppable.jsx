import React from 'react';
import { Droppable } from 'react-beautiful-dnd';

import SimpleDraggable from './SimpleDraggable';
import styles from '../../assets/components/jss/DragAndDrop/simple_droppable_styles';

function SimpleDroppable({ items, droppableId, alignment }) {
  return (
    <Droppable droppableId={droppableId} direction="horizontal">
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          style={styles(snapshot.isDraggingOver, alignment)}
          {...provided.droppableProps}
        >
          {items.map((item, index) => (
            <SimpleDraggable item={item} index={index} />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}

export default SimpleDroppable;
