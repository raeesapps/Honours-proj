import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { alignments, move, reorder } from '../DragAndDrop/drag_and_drop_utils';
import SimpleDroppable from '../DragAndDrop/SimpleDroppable';

import { symbolicForms, getSymbolicForm, getEntailmentSymbol } from '../../logic/proposition';

import styles from '../../assets/components/jss/PropositionToSymbolicForm/proposition_to_symbolic_form_styles';

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
    content: '⊯',
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

class PropositionToSymbolicForm extends React.PureComponent {
  constructor(props) {
    super(props);

    const { dragdropentries: dragDropEntries } = props;
    const state = {};

    droppables.forEach((droppable) => {
      const { name, initialContents } = droppable;

      if (name === 'entries') {
        state[name] = [...entriesArray, ...dragDropEntries];
      } else {
        state[name] = [...initialContents];
      }
    });

    const { proposition, table: mappingTable } = props;

    if (mappingTable) {
      const {
        A_ENTAILS_NOT_B,
        A_DOES_NOT_ENTAIL_NOT_B,
      } = symbolicForms;
      const { firstTerm, secondTerm } = proposition.terms;
      const symbolicFormOfProposition = getSymbolicForm(proposition);
      const entailmentSymbol = getEntailmentSymbol(symbolicFormOfProposition);
      const mappingTableKeys = Object.keys(mappingTable);
      const firstKey = mappingTableKeys.find((key) => mappingTable[key] === firstTerm);
      let secondKey = mappingTableKeys.find((key) => mappingTable[key] === secondTerm);
      switch (symbolicFormOfProposition) {
        case A_DOES_NOT_ENTAIL_NOT_B:
        case A_ENTAILS_NOT_B:
          secondKey = `!${secondKey}`;
          break;
        default:
          break;
      }

      const itemThatShouldBeFirstEntry = state.entries.find((entry) => entry.content === firstKey);
      const itemThatShouldBeSecondEntry = state.entries.find((entry) => entry.content === entailmentSymbol);
      const itemThatShouldBeThirdEntry = state.entries.find((entry) => entry.content === secondKey);

      state.firstEntry.push(itemThatShouldBeFirstEntry);
      state.secondEntry.push(itemThatShouldBeSecondEntry);
      state.thirdEntry.push(itemThatShouldBeThirdEntry);

      state.entries = state.entries.filter((entry) => entry.id !== itemThatShouldBeFirstEntry.id);
      state.entries = state.entries.filter((entry) => entry.id !== itemThatShouldBeSecondEntry.id);
      state.entries = state.entries.filter((entry) => entry.id !== itemThatShouldBeThirdEntry.id);
    }

    this.state = state;
  }

  onDragEnd = (result) => {
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

  getEntries = () => {
    const {
      firstEntry,
      secondEntry,
      thirdEntry,
    } = this.state;

    return { firstEntry, secondEntry, thirdEntry };
  }

  render() {
    const {
      entries,
      firstEntry,
      secondEntry,
      thirdEntry,
    } = this.state;
    const { classes, proposition, ...rest } = this.props;
    const { HORIZONTAL, VERTICAL } = alignments;
    return (
      <div {...rest}>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Grid container spacing={2}>
            <Grid item>
              <Typography className={classes.titleTypography} variant="h5">
                {
                  `${proposition.toSentence()} <=>`
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
      </div>
    );
  }
}

export default withStyles(styles)(PropositionToSymbolicForm);
