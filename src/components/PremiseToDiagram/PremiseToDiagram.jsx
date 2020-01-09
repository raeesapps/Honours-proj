import React from 'react';

import Typography from '@material-ui/core/Typography';

import { stages, validateVennDiagram } from '../../logic/validator';

import TwoSetInteractiveVennDiagram from '../VennDiagram/TwoSetInteractiveVennDiagram';
import ThreeSetInteractiveVennDiagram from '../VennDiagram/ThreeSetInteractiveVennDiagram';
import FourSetInteractiveVennDiagram from '../VennDiagram/FourSetInteractiveVennDiagram';

class PremiseToDiagram extends React.Component {
  constructor() {
    super();
    this.vennDiagramRef = React.createRef();

    this.validate = this.validate.bind(this);
    this.toSentenceAndVennDiagram = this.toSentenceAndVennDiagram.bind(this);
  }

  validate() {
    const { REPRESENTATION_STAGE } = stages;
    const { vennDiagramRef } = this;
    const { premiseCollection } = this.props;

    return validateVennDiagram(premiseCollection, [vennDiagramRef], REPRESENTATION_STAGE);
  }

  toSentenceAndVennDiagram(premiseCollection) {
    const { vennDiagramRef } = this;
    const { vennDiagramShading } = this.props;

    if (!premiseCollection.premises.length) {
      throw new Error('No premises in premise collection!');
    }

    const premise = premiseCollection.premises[0];
    const title = premise.toSentence();
    const numberOfTermsInPremiseCollection = premiseCollection.terms.length;

    if (numberOfTermsInPremiseCollection > 4 || numberOfTermsInPremiseCollection < 2) {
      throw new Error('Invalid number of terms for PremiseToDiagram.jsx!');
    }

    return (
      <div>
        <Typography variant="h5">
          {
            title
          }
        </Typography>
        {
          numberOfTermsInPremiseCollection === 2 && <TwoSetInteractiveVennDiagram title={`${title}rep`} premise={premise} ref={vennDiagramRef} shadings={vennDiagramShading} />
        }
        {
          numberOfTermsInPremiseCollection === 3 && <ThreeSetInteractiveVennDiagram title={`${title}rep`} premises={premiseCollection} ref={vennDiagramRef} />
        }
        {
          numberOfTermsInPremiseCollection === 4 && <FourSetInteractiveVennDiagram title={`${title}rep`} premises={premiseCollection} ref={vennDiagramRef} />
        }
      </div>
    );
  }

  render() {
    const { premiseCollection } = this.props;

    return this.toSentenceAndVennDiagram(premiseCollection);
  }
}

export default PremiseToDiagram;
