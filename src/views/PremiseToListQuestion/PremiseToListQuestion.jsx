import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';

import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import SimpleDroppable from '../../components/DragAndDrop/SimpleDroppable';
import alignment from '../../components/DragAndDrop/alignment';
import move from '../../components/DragAndDrop/move';
import reorder from '../../components/DragAndDrop/reorder';

import styles from '../../assets/views/jss/PremiseToListQuestion/premise_to_list_question_styles';

const quantifier = [];
const drawnFrom = [];
const firstCondition = [];
const secondCondition = [];

const functions = [
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
      functions: [...functions],
      quantifier: [...quantifier],
      drawnFrom: [...drawnFrom],
      firstCondition: [...firstCondition],
      secondCondition: [...secondCondition],
    };
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  onDragEnd(result) {
    const { functions, quantifier, drawnFrom, firstCondition, secondCondition } = this.state;
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    let sourceList;
    let key;
    switch (source.droppableId) {
      case 'functionsDroppable':
        sourceList = functions;
        key = 'functionsDroppable';
        break;
      case 'quantifierDroppable':
        sourceList = quantifier;
        key = 'quantifierDroppable';
        break;
      case 'drawnFromDroppable':
        sourceList = drawnFrom;
        key = 'drawnFromDroppable';
        break;
      case 'firstConditionDroppable':
        sourceList = firstCondition;
        key = 'firstConditionDroppable';
        break;
      case 'secondConditionDroppable':
        sourceList = secondCondition;
        key = 'secondConditionDroppable';
        break;
      default:
        break;
    }

    let destinationList;
    switch (destination.droppableId) {
      case 'functionsDroppable':
        destinationList = functions;
        break;
      case 'quantifierDroppable':
        destinationList = quantifier;
        break;
      case 'drawnFromDroppable':
        destinationList = drawnFrom;
        break;
      case 'firstConditionDroppable':
        destinationList = firstCondition;
        break;
      case 'secondConditionDroppable':
        destinationList = secondCondition;
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

        if ('functionsDroppable' in moveResult) {
          state.functions = moveResult.functionsDroppable;
        }

        if ('quantifierDroppable' in moveResult) {
          state.quantifier = moveResult.quantifierDroppable;
        }

        if ('drawnFromDroppable' in moveResult) {
          state.drawnFrom = moveResult.drawnFromDroppable;
        }

        if ('firstConditionDroppable' in moveResult) {
          state.firstCondition = moveResult.firstConditionDroppable;
        }

        if ('secondConditionDroppable' in moveResult) {
          state.secondCondition = moveResult.secondConditionDroppable;
        }

        this.setState(state);
      }
    }
  }

  render() {
    const { functions, quantifier, drawnFrom, firstCondition, secondCondition } = this.state;
    const { classes } = this.props;
    const { HORIZONTAL, VERTICAL } = alignment;
    const haskellListTemplate = '[b x | x <- things, a x, b x]';
    return (
      <Container>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <SimpleDroppable items={quantifier} droppableId="quantifierDroppable" alignment={VERTICAL} />
          <Typography className={classes.typography} variant="h4">
            [b x |
          </Typography>
          <SimpleDroppable items={drawnFrom} droppableId="drawnFromDroppable" alignment={VERTICAL} />
          <Typography className={classes.typography} variant="h4">
            ,
          </Typography>
          <SimpleDroppable items={firstCondition} droppableId="firstConditionDroppable" alignment={VERTICAL} />
          <Typography className={classes.typography} variant="h4">
            ,
          </Typography>
          <SimpleDroppable items={secondCondition} droppableId="secondConditionDroppable" alignment={VERTICAL} />
          <Typography className={classes.typography} variant="h4">
            ]
          </Typography>
          <br />
          <SimpleDroppable items={functions} droppableId="functionsDroppable" alignment={HORIZONTAL} />
        </DragDropContext>
      </Container>
    );
  }
}

export default withStyles(styles)(PremiseToListQuestion);
