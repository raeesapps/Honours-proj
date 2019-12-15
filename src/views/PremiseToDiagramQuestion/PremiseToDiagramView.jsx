import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import PremiseToDiagram from '../../components/PremiseToDiagram/PremiseToDiagram';
import SnackbarWrapper from '../../components/Snackbar/SnackbarWrapper';
import snackbarTypes from '../../components/Snackbar/snackbar_types';

import styles from '../../assets/views/jss/PremiseToDiagramQuestion/premise_to_diagram_view_styles';

class PremiseToDiagramView extends React.Component {
  constructor() {
    const { ERROR } = snackbarTypes;

    super();
    this.state = {
      premise: null,
      showSnackbar: false,
      snackbarType: ERROR,
    };
    this.vennDiagramRef = React.createRef();
    this.validate = this.validate.bind(this);
  }

  componentWillMount() {
    const { location } = this.props;
    const { question } = location;

    if (!question) {
      throw new Error('Question not provided! You must not use the refresh button on this app.');
    }

    const { content } = question;

    this.setState({
      premise: content,
    });
  }

  validate() {
    const { ERROR, SUCCESS } = snackbarTypes;

    if (!this.vennDiagramRef.current) {
      throw new Error('Ref not set!');
    }

    const result = this.vennDiagramRef.current.validate();

    if (result) {
      this.setState({
        snackbarType: SUCCESS,
        showSnackbar: true,
      });
    } else {
      this.setState({
        snackbarType: ERROR,
        showSnackbar: true,
      });
    }
  }

  render() {
    const { ERROR } = snackbarTypes;

    const { classes } = this.props;
    const { premise, snackbarType, showSnackbar } = this.state;

    const snackbarWrapperDisplayVal = !showSnackbar ? 'none' : '';
    const snackbarMessage = snackbarType === ERROR ? 'Incorrect!' : 'Correct!';
    return (
      <div className={classes.root}>
        <Container>
          <SnackbarWrapper
            style={{ display: snackbarWrapperDisplayVal, marginBottom: '10px' }}
            variant={snackbarType}
            message={snackbarMessage}
            onClose={() => {
              this.setState({ showSnackbar: false });
            }}
          />
          <Typography className={classes.instructions} variant="h5" component="h3">
            Shade the Venn Diagram to represent the premise.
          </Typography>
          <Paper className={classes.paper}>
            <PremiseToDiagram ref={this.vennDiagramRef} premise={premise} />
          </Paper>
          <Button variant="contained" color="primary" onClick={this.validate}>Validate</Button>
        </Container>
      </div>
    );
  }
}

PremiseToDiagramView.propTypes = {
  classes: PropTypes.objectOf(PropTypes.object).isRequired,
  location: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default withStyles(styles)(PremiseToDiagramView);
