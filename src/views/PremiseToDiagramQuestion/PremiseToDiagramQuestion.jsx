import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import PremiseToDiagram from '../../components/PremiseToDiagram/PremiseToDiagram';
import withQuestionTemplate from '../../components/Questions/QuestionTemplate';
import styles from '../../assets/views/jss/PremiseToDiagramQuestion/premise_to_diagram_question_styles';

class PremiseToDiagramQuestion extends React.Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    const { content: nextPremiseCollection } = nextProps;
    const { premiseCollection } = prevState;

    if (nextPremiseCollection.hashCode() !== premiseCollection.hashCode()) {
      return {
        premiseCollection: nextPremiseCollection,
        key: Math.random(),
      };
    }

    return null;
  }

  constructor(props) {
    super(props);
    const { content } = props;

    this.state = {
      premiseCollection: content,
      key: Math.random(),
    };
    this.vennDiagramRef = React.createRef();
  }

  validate = () => {
    const { onValidate } = this.props;

    if (!this.vennDiagramRef.current) {
      throw new Error('Ref not set!');
    }

    const result = this.vennDiagramRef.current.validate();
    onValidate(result, 'Incorrect!');
  }

  render() {
    const { premiseCollection, key } = this.state;
    const { classes } = this.props;

    if (!premiseCollection.premises.length) {
      throw new Error('No premises in premise collection!');
    }

    const premise = premiseCollection.premises[0];

    const width = premiseCollection.terms.length === 4 ? { width: '640px' } : { width: '312px' };
    return (
      <div key={key}>
        <Typography className={classes.instructions} variant="h5">
          Shade the Venn Diagram to represent
          {
            ` "${premise.toSymbolicForm()}" `
          }
        </Typography>
        <Paper className={classes.paper} style={width}>
          <PremiseToDiagram renderTitle={false} ref={this.vennDiagramRef} premiseCollection={premiseCollection} />
        </Paper>
        <Button variant="contained" color="primary" onClick={this.validate}>Validate</Button>
      </div>
    );
  }
}

export default withStyles(styles)(withQuestionTemplate(PremiseToDiagramQuestion));
