import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

import PremiseFormInput from './PremiseFormInput';

import styles from '../../../assets/views/jss/InstantSolver/Components/argument_form_styles';

class ArgumentForm extends React.Component {
  constructor() {
    super();
    const premises = [
      {
        name: 'Premise',
        ref: React.createRef(),
      },
      {
        name: 'Premise',
        ref: React.createRef(),
      },
      {
        name: 'Conclusion',
        ref: React.createRef(),
      },
    ];
    this.state = {
      premises,
    };

    this.onRemove = this.onRemove.bind(this);
    this.onAddPremise = this.onAddPremise.bind(this);
    this.addPremise = this.addPremise.bind(this);
  }

  onRemove(idx) {
    const {
      premises,
    } = this.state;

    const {
      onError,
    } = this.props;

    const n = premises.length;

    if (idx >= n || idx < 0) {
      onError('Premise does not exist!');
      return;
    }

    if (premises[idx].name === 'Conclusion') {
      onError('You cannot delete the conclusion!');
      return;
    }

    if (idx < 2) {
      onError('You cannot delete the major or minor premise!');
      return;
    }

    premises.splice(idx, 1);

    this.setState({ premises: [...premises] });
  }

  onAddPremise() {
    const {
      premises,
    } = this.state;

    const {
      warn,
    } = this.props;

    const n = premises.length;

    if (n > 4) {
      warn();
    } else {
      this.addPremise();
    }
  }

  addPremise() {
    const {
      premises,
    } = this.state;

    const conclusion = premises.pop();

    premises.push({
      name: 'Premise',
      ref: React.createRef(),
    });

    premises.push(conclusion);

    this.setState({
      premises: [...premises],
    });
  }

  render() {
    const {
      premises,
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
              premises.map((premise, idx) => {
                const { name, ref } = premise;
                return <Grid item xs={4}><PremiseFormInput ref={ref} name={name} idx={idx} onRemove={this.onRemove} /></Grid>;
              })
            }
          </Grid>
          <Fab color="primary" aria-label="add" className={classes.fab} onClick={this.onAddPremise}>
            <AddIcon />
          </Fab>
        </form>
        <Button variant="outlined" className={classes.button} onClick={onSubmit}>
          Validate
        </Button>
      </div>
    );
  }
}

ArgumentForm.propTypes = {
  classes: PropTypes.objectOf(PropTypes.object).isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default withStyles(styles)(ArgumentForm);