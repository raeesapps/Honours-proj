import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';

import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import SimpleDroppable from '../../components/DragAndDrop/SimpleDroppable';
import move from '../../components/DragAndDrop/move';
import reorder from '../../components/DragAndDrop/reorder';

import styles from '../../assets/views/jss/PremiseToListQuestion/premise_to_list_question_styles';

const functions2 = [
  {
    id: 'item-0',
    content: 'and',
  },
  {
    id: 'item-1',
    content: 'or',
  },
  {
    id: 'item-2',
    content: 'not',
  },
  {
    id: 'item-3',
    content: 'not',
  },
  {
    id: 'item-4',
    content: 'xor',
  },
];

const functions = [];

class PremiseToListQuestion extends React.Component {
  constructor() {
    super();
    this.state = {
      items: [...functions],
      items2: [...functions2],
    };
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  onDragEnd(result) {
    const { items, items2 } = this.state;
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId) {
      const list = source.droppableId === 'droppable2' ? items2 : items;
      const reorderedItems = reorder(list, source.index, destination.index);
      const state = source.droppableId === 'droppable2' ? { items2: reorderedItems } : { items: reorderedItems };

      this.setState(state);
    } else {
      const sourceList = source.droppableId === 'droppable2' ? items2 : items;
      const destinationList = destination.droppableId === 'droppable2' ? items2 : items;
      const moveResult = move(sourceList, destinationList, destinationList.length <= 5, source, destination);

      if (Object.keys(moveResult).length > 0) {
        this.setState({ items: moveResult.droppable, items2: moveResult.droppable2 });
      }
    }
  }

  render() {
    const { items, items2 } = this.state;
    const { classes } = this.props;
    const haskellListTemplate = '[b x | x <- things, a x, b x]';
    return (
      <Container>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <SimpleDroppable items={items} droppableId="droppable" />
          <Typography className={classes.typography} variant="h4">
            {
              haskellListTemplate
            }
          </Typography>
          <br />
          <SimpleDroppable items={items2} droppableId="droppable2" />
        </DragDropContext>
      </Container>
    );
  }
}

export default withStyles(styles)(PremiseToListQuestion);
