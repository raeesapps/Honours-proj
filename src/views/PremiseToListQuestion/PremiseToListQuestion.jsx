import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';

import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import SimpleDroppable from '../../components/DragAndDrop/SimpleDroppable';
import move from '../../components/DragAndDrop/move';
import reorder from '../../components/DragAndDrop/reorder';

import styles from '../../assets/views/jss/PremiseToListQuestion/premise_to_list_question_styles';

const functions = [];

const functions2 = [];

const functions3 = [
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

class PremiseToListQuestion extends React.Component {
  constructor() {
    super();
    this.state = {
      items: [...functions],
      items2: [...functions2],
      items3: [...functions3],
    };
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  onDragEnd(result) {
    const { items, items2, items3 } = this.state;
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    let sourceList;
    let key;
    switch (source.droppableId) {
      case 'droppable':
        sourceList = items;
        key = 'items';
        break;
      case 'droppable2':
        sourceList = items2;
        key = 'items2';
        break;
      case 'droppable3':
        sourceList = items3;
        key = 'items3';
        break;
      default:
        break;
    }

    let destinationList;
    switch (destination.droppableId) {
      case 'droppable':
        destinationList = items;
        break;
      case 'droppable2':
        destinationList = items2;
        break;
      case 'droppable3':
        destinationList = items3;
        break;
      default:
        break;
    }

    if (destination.droppableId === source.droppableId) {
      const reorderedItems = reorder(sourceList, source.index, destination.index);

      this.setState({ [key]: reorderedItems });
    } else {
      const moveResult = move(sourceList, destinationList, destinationList.length <= 5, source, destination);

      if (Object.keys(moveResult).length > 0) {
        const state = {};

        if ('droppable' in moveResult) {
          state.items = moveResult.droppable;
        }

        if ('droppable2' in moveResult) {
          state.items2 = moveResult.droppable2;
        }

        if ('droppable3' in moveResult) {
          state.items3 = moveResult.droppable3;
        }

        this.setState(state);
      }
    }
  }

  render() {
    const { items, items2, items3 } = this.state;
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
          <SimpleDroppable items={items3} droppableId="droppable3" />
        </DragDropContext>
      </Container>
    );
  }
}

export default withStyles(styles)(PremiseToListQuestion);
