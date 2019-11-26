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

const parentFunctionArray = [];
const grandparentFunctionArray = [];
const contentsArray = [];
const drawnFromArray = [];
const conditionArray = [];

const functionsArray = [
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
    content: 'not (isMan x)',
  },
  {
    id: 'item-4',
    content: 'isMan x',
  },
  {
    id: 'item-5',
    content: 'isMortal x',
  },
  {
    id: 'item-6',
    content: 'not (isMortal x)',
  },
  {
    id: 'item-7',
    content: 'x <- things',
  },
];

const droppables = [
  {
    name: 'functions',
    initialContents: functionsArray,
    limit: 100,
  },
  {
    name: 'contents',
    initialContents: contentsArray,
    limit: 1,
  },
  {
    name: 'grandparent',
    initialContents: grandparentFunctionArray,
    limit: 1,
  },
  {
    name: 'parent',
    initialContents: parentFunctionArray,
    limit: 1,
  },
  {
    name: 'drawnFrom',
    initialContents: drawnFromArray,
    limit: 1,
  },
  {
    name: 'condition',
    initialContents: conditionArray,
    limit: 1,
  },
];

class PremiseToListQuestion extends React.Component {
  constructor() {
    super();
    const state = {};

    droppables.forEach((droppable) => {
      const { name, initialContents } = droppable;
      state[name] = [...initialContents];
    });

    this.state = state;
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  onDragEnd(result) {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    let sourceList;
    let destinationList;
    let destinationListLimit;
    let key;

    droppables.forEach((droppable) => {
      const { name, limit } = droppable;

      if (source.droppableId === name) {
        sourceList = this.state[name];
        key = name;
      }

      if (destination.droppableId === name) {
        destinationList = this.state[name];

        if (limit) {
          destinationListLimit = limit;
        }
      }
    });

    if (destination.droppableId === source.droppableId) {
      const reorderedItems = reorder(sourceList, source.index, destination.index);

      this.setState({ [key]: reorderedItems });
    } else {
      const moveResult = move(sourceList, destinationList, destinationList.length < destinationListLimit, source, destination);
      const dragSuccessful = Object.keys(moveResult).length;

      if (dragSuccessful) {
        const state = {};

        droppables.filter((droppable) => {
          const { name } = droppable;

          return name in moveResult;
        }).forEach((droppable) => {
          const { name } = droppable;

          state[name] = moveResult[name];
        });

        this.setState(state);
      }
    }
  }

  render() {
    const { grandparentVisible } = this.props;
    const {
      functions,
      parent,
      grandparent,
      contents,
      drawnFrom,
      condition,
    } = this.state;
    const { classes } = this.props;
    const { HORIZONTAL, VERTICAL } = alignment;
    return (
      <Container>
        <Typography className={classes.titleTypography} variant="h3">
          Please translate the premise 'All Men are Mortal'
        </Typography>
        <DragDropContext onDragEnd={this.onDragEnd}>
          {
            grandparentVisible && <SimpleDroppable items={grandparent} droppableId="grandparent" alignment={VERTICAL} />
          }
          <SimpleDroppable items={parent} droppableId="parent" alignment={VERTICAL} />
          <Typography className={classes.haskellTypography} variant="h4">
            [
          </Typography>
          <SimpleDroppable items={contents} droppableId="contents" alignment={VERTICAL} />
          <Typography className={classes.haskellTypography} variant="h4">
            |
          </Typography>
          <SimpleDroppable items={drawnFrom} droppableId="drawnFrom" alignment={VERTICAL} />
          <Typography className={classes.haskellTypography} variant="h4">
            ,
          </Typography>
          <SimpleDroppable items={condition} droppableId="condition" alignment={VERTICAL} />
          <Typography className={classes.haskellTypography} variant="h4">
            ]
          </Typography>
          <div className={classes.spacing} />
          <Typography className={classes.instructionTypography} variant="h5">
            Please drag Haskell statements below and drop them into the appropriate location above.
          </Typography>
          <SimpleDroppable items={functions} droppableId="functions" alignment={HORIZONTAL} />
        </DragDropContext>
      </Container>
    );
  }
}

export default withStyles(styles)(PremiseToListQuestion);
