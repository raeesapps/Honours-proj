import React from 'react';

import Typography from '@material-ui/core/Typography';

import { stages, validateVennDiagram } from '../../logic/validator';

import TwoSetInteractiveVennDiagram from '../VennDiagram/TwoSetInteractiveVennDiagram';
import ThreeSetInteractiveVennDiagram from '../VennDiagram/ThreeSetInteractiveVennDiagram';
import FourSetInteractiveVennDiagram from '../VennDiagram/FourSetInteractiveVennDiagram';

import { TWO_SET_CIRCLES_ORIENTATION } from '../VennDiagram/venn_utils';

const { HORIZONTAL } = TWO_SET_CIRCLES_ORIENTATION;

class PropositionToDiagram extends React.PureComponent {
  constructor() {
    super();
    this.vennDiagramRef = React.createRef();
  }

  validate = () => {
    const { REPRESENTATION_STAGE } = stages;
    const { vennDiagramRef } = this;
    const { propositionCollection } = this.props;

    return validateVennDiagram(propositionCollection, [vennDiagramRef], REPRESENTATION_STAGE);
  }

  render() {
    const { vennDiagramRef } = this;
    const {
      propositionCollection,
      vennDiagramShading,
      renderTitle,
      ...rest
    } = this.props;

    if (!propositionCollection.propositions.length) {
      throw new Error('No propositions in proposition collection!');
    }

    const proposition = propositionCollection.propositions[0];
    const title = proposition.toSentence();
    const numberOfTermsInPropositionCollection = propositionCollection.terms.length;

    if (numberOfTermsInPropositionCollection > 4 || numberOfTermsInPropositionCollection < 2) {
      throw new Error('Invalid number of terms for PropositionToDiagram.jsx!');
    }

    return (
      <div {...rest}>
        <Typography variant="h5">
          {
            renderTitle && title
          }
        </Typography>
        {
          numberOfTermsInPropositionCollection === 2 && <TwoSetInteractiveVennDiagram title={`${title}rep`} proposition={proposition} ref={vennDiagramRef} orientation={HORIZONTAL} shadings={vennDiagramShading} disableLongClick="true" />
        }
        {
          numberOfTermsInPropositionCollection === 3 && <ThreeSetInteractiveVennDiagram title={`${title}rep`} propositions={propositionCollection} ref={vennDiagramRef} disableLongClick="true" />
        }
        {
          numberOfTermsInPropositionCollection === 4 && <FourSetInteractiveVennDiagram title={`${title}rep`} propositions={propositionCollection} ref={vennDiagramRef} disableLongClick="true" />
        }
      </div>
    );
  }
}

export default PropositionToDiagram;
