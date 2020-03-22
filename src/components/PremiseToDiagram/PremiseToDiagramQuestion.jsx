import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import PremiseToDiagram from './PremiseToDiagram';
import withQuestionTemplate from '../Questions/QuestionTemplate';
import styles from '../../assets/components/jss/PremiseToDiagramQuestion/premise_to_diagram_question_styles';

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

  componentDidMount() {
    const { premiseCollection } = this.state;
    const { setQuestionTitle, setQuestionNumber, setInstructions } = this.props;

    const premise = premiseCollection.premises[0];

    setQuestionTitle("Represent premise on a Venn Diagram");
    setQuestionNumber(1);
    setInstructions(`Shade the Venn Diagram to represent ${premise.toSymbolicForm()}. If the premise is existentially quantified, then you need to create an x-sequence that contains all the compartments where the subject could reside.`);
  }

  render() {
    const { premiseCollection, key } = this.state;

    if (!premiseCollection.premises.length) {
      throw new Error('No premises in premise collection!');
    }
    return (
      <div key={key}>
        <PremiseToDiagram renderTitle={false} ref={this.vennDiagramRef} premiseCollection={premiseCollection} />
        <Button variant="contained" color="primary" onClick={this.validate}>Validate</Button>
      </div>
    );
  }
}

export default withStyles(styles)(withQuestionTemplate(PremiseToDiagramQuestion));
