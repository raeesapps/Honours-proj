import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

import PropositionFormInput from './PropositionFormInput';

import styles from '../../assets/components/jss/ArgumentForm/argument_form_styles';

class ArgumentForm extends React.PureComponent {
  constructor() {
    super();
    const propositions = [
      {
        name: 'Proposition1',
        ref: React.createRef(),
      },
      {
        name: 'Proposition2',
        ref: React.createRef(),
      },
      {
        name: 'Conclusion',
        ref: React.createRef(),
      },
    ];
    this.state = {
      propositions,
    };
  }

  onRemove = (idx) => {
    const {
      propositions,
    } = this.state;

    const {
      onError,
    } = this.props;

    const n = propositions.length;

    if (idx >= n || idx < 0) {
      onError('Proposition does not exist!');
      return;
    }

    if (propositions[idx].name === 'Conclusion') {
      onError('You cannot delete the conclusion!');
      return;
    }

    if (idx < 2) {
      onError('You cannot delete the major or minor premise!');
      return;
    }

    propositions.splice(idx, 1);

    this.setState({ propositions: [...propositions] });
  }

  onAddProposition = () => {
    const {
      propositions,
    } = this.state;

    const {
      warn,
    } = this.props;

    const n = propositions.length;

    if (n > 3) {
      warn();
    } else {
      this.addProposition();
    }
  }

  addProposition = () => {
    const {
      propositions,
    } = this.state;

    const conclusion = propositions.pop();

    const n = propositions.length;
    propositions.push({
      name: `Proposition${n + 1}`,
      ref: React.createRef(),
    });

    propositions.push(conclusion);

    this.setState({
      propositions: [...propositions],
    });
  }

  render() {
    const {
      propositions,
    } = this.state;
    const {
      classes,
      onSubmit,
    } = this.props;
    return (
      <div>
        <form style={{ display: 'flex' }} noValidate autoComplete="off">
          <Grid container spacing={3}>
            {
              propositions.map((proposition, idx) => {
                const { name, ref } = proposition;
                return <Grid item key={name} xs={4}><PropositionFormInput ref={ref} name={name} idx={idx} onRemove={this.onRemove} /></Grid>;
              })
            }
          </Grid>
          <div>
            <Typography variant="subtitle1" color="secondary">
              Add premise
            </Typography>
            <Fab style={{ margin: '20px' }} color="primary" aria-label="add" className={classes.fab} onClick={this.onAddProposition}>
              <AddIcon />
            </Fab>
          </div>
        </form>
        <Button variant="contained" color="primary" className={classes.button} onClick={onSubmit}>
          Validate
        </Button>
      </div>
    );
  }
}

export default withStyles(styles)(ArgumentForm);
