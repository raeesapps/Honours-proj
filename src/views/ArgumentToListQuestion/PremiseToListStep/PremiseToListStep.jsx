import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';

import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import SimpleDroppable from '../../../components/DragAndDrop/SimpleDroppable';
import SnackbarWrapper from '../../../components/Snackbar/SnackbarWrapper';
import snackbarTypes from '../../../components/Snackbar/snackbar_types';
import alignment from '../../../components/DragAndDrop/alignment';
import move from '../../../components/DragAndDrop/move';
import reorder from '../../../components/DragAndDrop/reorder';

import styles from '../../../assets/views/jss/ArgumentToListQuestion/PremiseToListStep/premise_to_list_step_styles';

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
    id: 'item-12',
    content: 'xor',
  },
  {
    id: 'item-11',
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

class PremiseToListStep extends React.Component {
  constructor(props) {
    super(props);

    const { premise } = props;
    const state = {
      errorVisible: false,
      errorMessage: null,
    };

    const premiseFunctions = premise.toFunctions(premise);

    droppables.forEach((droppable) => {
      const { name, initialContents } = droppable;

      if (name === 'functions') {
        state[name] = [...functionsArray, ...premiseFunctions];
      } else {
        state[name] = [...initialContents];
      }
    });

    this.state = state;
    this.onDragEnd = this.onDragEnd.bind(this);
    this.validate = this.validate.bind(this);
    this.showErrorBar = this.showErrorBar.bind(this);
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

  validate() {
    const { premise } = this.props;
    const {
      parent,
      grandparent,
      contents,
      drawnFrom,
      condition,
    } = this.state;

    return premise.validate(parent, grandparent, contents, drawnFrom, condition);
  }

  showErrorBar(message) {
    this.setState({
      errorMessage: message,
      errorVisible: true,
    });
  }

  render() {
    const {
      functions,
      parent,
      grandparent,
      contents,
      drawnFrom,
      condition,
      errorMessage,
      errorVisible,
    } = this.state;
    const { classes, premise } = this.props;
    const { ERROR } = snackbarTypes;
    const { HORIZONTAL, VERTICAL } = alignment;
    const snackbarWrapperDisplayVal = !errorVisible ? 'none' : '';
    return (
      <Container>
        <SnackbarWrapper
          style={{ display: snackbarWrapperDisplayVal, marginBottom: '10px' }}
          variant={ERROR}
          message={errorMessage}
          onClose={() => {
            this.setState({ errorVisible: false, errorMessage: null });
          }}
        />
        <Typography className={classes.titleTypography} variant="h3">
          Please translate the premise
          {
            ` '${premise.toSentence()}'`
          }
        </Typography>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <SimpleDroppable items={grandparent} droppableId="grandparent" alignment={VERTICAL} />
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

export default withStyles(styles)(PremiseToListStep);
