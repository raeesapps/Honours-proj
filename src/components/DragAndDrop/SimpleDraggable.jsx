import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

import Typography from '@material-ui/core/Typography';

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
          <Typography variant="h4">
            {item.content}
          </Typography>
        </div>
      )}
    </Draggable>
  );
}

export default React.memo(SimpleDraggable);
