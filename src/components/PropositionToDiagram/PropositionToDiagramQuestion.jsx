import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import PropositionToDiagram from './PropositionToDiagram';
import withQuestionTemplate from '../Questions/QuestionTemplate';
import styles from '../../assets/components/jss/PropositionToDiagramQuestion/proposition_to_diagram_question_styles';

class PropositionToDiagramQuestion extends React.Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    const { content: nextPropositionCollection, questionidx: questionIdx } = nextProps;
    const { propositionCollection } = prevState;

    if (nextPropositionCollection.hashCode() !== propositionCollection.hashCode()) {
      return {
        propositionCollection: nextPropositionCollection,
        key: Math.random(),
        questionIdx,
      };
    }

    return null;
  }

  constructor(props) {
    super(props);
    const { content, questionidx: questionIdx } = props;

    this.state = {
      propositionCollection: content,
      key: Math.random(),
      questionIdx,
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
    const { propositionCollection, questionIdx } = this.state;
    const { setQuestionTitle, setQuestionNumber, setInstructions } = this.props;

    const proposition = propositionCollection.propositions[0];

    setQuestionTitle("Represent proposition on a Venn diagram");
    setQuestionNumber(Number(questionIdx) + 1);
    setInstructions(`Shade the Venn diagram to represent ${proposition.toSymbolicForm()}. If the proposition is existentially quantified, then you need to create an x-sequence that contains all the compartments where the subject could reside.`);
  }

  componentDidUpdate() {
    const { propositionCollection, questionIdx } = this.state;
    const { setQuestionNumber, setInstructions } = this.props;

    const proposition = propositionCollection.propositions[0];

    setQuestionNumber(Number(questionIdx) + 1);
    setInstructions(`Shade the Venn diagram to represent ${proposition.toSymbolicForm()}. If the proposition is existentially quantified, then you need to create an x-sequence that contains all the compartments where the subject could reside.`);
  }

  render() {
    const { propositionCollection, key } = this.state;

    if (!propositionCollection.propositions.length) {
      throw new Error('No propositions in proposition collection!');
    }
    return (
      <div key={key}>
        <PropositionToDiagram renderTitle={false} ref={this.vennDiagramRef} propositionCollection={propositionCollection} />
        <Button variant="contained" color="primary" onClick={this.validate}>Validate</Button>
      </div>
    );
  }
}

export default withStyles(styles)(withQuestionTemplate(PropositionToDiagramQuestion));
