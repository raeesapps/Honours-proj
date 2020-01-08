import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';

import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { alignments, move, reorder } from '../../../components/DragAndDrop/drag_and_drop_utils';
import SimpleDroppable from '../../../components/DragAndDrop/SimpleDroppable';
import SnackbarWrapper from '../../../components/Snackbar/SnackbarWrapper';
import snackbarTypes from '../../../components/Snackbar/snackbar_types';

import styles from '../../../assets/views/jss/PremisesToSymbolicFormQuestion/PremiseToSymbolicFormStep/premise_to_symbolic_form_step_styles';

function getDragDropEntries(firstAtom, secondAtom, thirdAtom, fourthAtom) {
  const entries = [
    {
      id: 'item-3',
      content: `!${firstAtom}`,
    },
    {
      id: 'item-4',
      content: `!${secondAtom}`,
    },
    {
      id: 'item-5',
      content: `${firstAtom}`,
    },
    {
      id: 'item-6',
      content: `${secondAtom}`,
    },
  ];

  if (thirdAtom) {
    entries.push(
      {
        id: 'item-7',
        content: `${thirdAtom}`,
      },
      {
        id: 'item-8',
        content: `!${thirdAtom}`,
      },
    );
  }

  if (fourthAtom) {
    entries.push(
      {
        id: 'item-9',
        content: `${fourthAtom}`,
      },
      {
        id: 'item-10',
        content: `!${fourthAtom}`,
      },
    );
  }

  return entries;
}

const firstEntryArray = [];
const secondEntryArray = [];
const thirdEntryArray = [];

const entriesArray = [
  {
    id: 'item-0',
    content: '⊨',
  },
  {
    id: 'item-1',
    content: '!⊨',
  },
];

const droppables = [
  {
    name: 'entries',
    initialContents: entriesArray,
    limit: 100,
  },
  {
    name: 'firstEntry',
    initialContents: firstEntryArray,
    limit: 1,
  },
  {
    name: 'secondEntry',
    initialContents: secondEntryArray,
    limit: 1,
  },
  {
    name: 'thirdEntry',
    initialContents: thirdEntryArray,
    limit: 1,
  },
];

class PremiseToSymbolicFormStep extends React.Component {
  constructor() {
    super();

    const state = {
      errorVisible: false,
      errorMessage: null,
    };

    const dragDropEntries = getDragDropEntries('A', 'B', 'C');

    droppables.forEach((droppable) => {
      const { name, initialContents } = droppable;

      if (name === 'entries') {
        state[name] = [...entriesArray, ...dragDropEntries];
      } else {
        state[name] = [...initialContents];
      }
    });

    this.state = state;
    this.onDragEnd = this.onDragEnd.bind(this);
    this.getEntries = this.getEntries.bind(this);
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

  getEntries() {
    const {
      firstEntry,
      secondEntry,
      thirdEntry,
    } = this.state;

    return { firstEntry, secondEntry, thirdEntry };
  }

  showErrorBar(message) {
    this.setState({
      errorMessage: message,
      errorVisible: true,
    });
  }

  render() {
    const { ERROR } = snackbarTypes;
    const {
      entries,
      firstEntry,
      secondEntry,
      thirdEntry,
      errorMessage,
      errorVisible,
    } = this.state;
    const { classes, premise } = this.props;
    const { HORIZONTAL, VERTICAL } = alignments;
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
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Grid container spacing={2}>
            <Grid item>
              <Typography className={classes.titleTypography} variant="h5">
                {
                  `${premise.toSentence()} <=>`
                }
              </Typography>
            </Grid>
            <Grid item>
              <SimpleDroppable items={firstEntry} droppableId="firstEntry" alignment={VERTICAL} />
              <SimpleDroppable items={secondEntry} droppableId="secondEntry" alignment={VERTICAL} />
              <SimpleDroppable items={thirdEntry} droppableId="thirdEntry" alignment={VERTICAL} />
            </Grid>
          </Grid>
          <div className={classes.spacing} />
          <Typography className={classes.instructionTypography} variant="subtitle1">
            Drag these to the appropriate location.
          </Typography>
          <SimpleDroppable items={entries} droppableId="entries" alignment={HORIZONTAL} />
        </DragDropContext>
        <div className={classes.spacing} />
      </Container>
    );
  }
}

export default withStyles(styles)(PremiseToSymbolicFormStep);
