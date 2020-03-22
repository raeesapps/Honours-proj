import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

import PremiseFormInput from './PremiseFormInput';

import styles from '../../assets/components/jss/ArgumentForm/argument_form_styles';

class ArgumentForm extends React.PureComponent {
  constructor() {
    super();
    const premises = [
      {
        name: 'Premise1',
        ref: React.createRef(),
      },
      {
        name: 'Premise2',
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
  }

  onRemove = (idx) => {
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

  onAddPremise = () => {
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

  addPremise = () => {
    const {
      premises,
    } = this.state;

    const conclusion = premises.pop();

    const n = premises.length;
    premises.push({
      name: `Premise${n + 1}`,
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
                return <Grid item key={name} xs={4}><PremiseFormInput ref={ref} name={name} idx={idx} onRemove={this.onRemove} /></Grid>;
              })
            }
          </Grid>
          <div>
            <Typography variant="subtitle1" color="secondary">
              Add premise
            </Typography>
            <Fab style={{ margin: '20px' }} color="primary" aria-label="add" className={classes.fab} onClick={this.onAddPremise}>
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
