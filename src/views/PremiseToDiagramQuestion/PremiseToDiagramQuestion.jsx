import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import PremiseToDiagram from '../../components/PremiseToDiagram/PremiseToDiagram';
import withSidebar from '../../components/Questions/QuestionSidebar';
import withQuestionTemplate from '../../components/Questions/QuestionTemplate';
import styles from '../../assets/views/jss/PremiseToDiagramQuestion/premise_to_diagram_question_styles';

class PremiseToDiagramView extends React.Component {
  constructor(props) {
    super(props);
    const { location } = props;
    const { question } = location;

    if (!question) {
      throw new Error('Question not provided! You must not use the refresh button on this app.');
    }

    const { content } = question;
    this.premiseCollection = content;
    this.vennDiagramRef = React.createRef();
    this.validate = this.validate.bind(this);
  }

  validate() {
    const { onValidate } = this.props;

    if (!this.vennDiagramRef.current) {
      throw new Error('Ref not set!');
    }

    const result = this.vennDiagramRef.current.validate();
    onValidate(result, 'Incorrect!');
  }

  render() {
    const { classes } = this.props;

    if (!this.premiseCollection.premises.length) {
      throw new Error('No premises in premise collection!');
    }

    const premise = this.premiseCollection.premises[0];

    const width = this.premiseCollection.terms.length === 4 ? { width: '70%' } : { width: '35%' };
    return (
      <div>
        <Typography className={classes.instructions} variant="h5">
          Shade the Venn Diagram to represent
          {
            ` "${premise.toSymbolicForm()}" `
          }
        </Typography>
        <Paper className={classes.paper} style={width}>
          <PremiseToDiagram renderTitle={false} ref={this.vennDiagramRef} premiseCollection={this.premiseCollection} />
        </Paper>
        <Button variant="contained" color="primary" onClick={this.validate}>Validate</Button>
      </div>
    );
  }
}

export default withStyles(styles)(withSidebar(withQuestionTemplate(PremiseToDiagramView)));
