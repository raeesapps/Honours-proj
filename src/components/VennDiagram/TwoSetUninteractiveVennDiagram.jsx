import React from 'react';

import {
  createTwoSetCircularVennDiagram,
  generateMappingObjects,
  shadeRegion,
  twoSetCircles,
  applyShadings,
} from './venn_utils';

class TwoSetUninteractiveVennDiagram extends React.Component {
  constructor() {
    super();

    this.state = {
      a: null,
      b: null,
    };
    this.applyShading = this.applyShading.bind(this);
  }

  componentDidMount() {
    const { title, shadings, terms } = this.props;
    const id = title.split(' ').join('');
    const div = createTwoSetCircularVennDiagram(id, twoSetCircles);
    this.div = div;

    if (shadings) {
      const { firstTerm, secondTerm } = terms;
      const { nodeRegionToMappedRegionMapping } = generateMappingObjects(div, firstTerm, secondTerm);
      Object.keys(shadings).forEach((mapping) => {
        shadeRegion(div, mapping, nodeRegionToMappedRegionMapping, shadings[mapping]);
      });
    }
  }

  applyShading(premiseCollection) {
    const [a, b] = premiseCollection.terms;

    if (!(this.state.a && this.state.b)) {
      this.setState({ a, b });
    }

    applyShadings(this.div, premiseCollection);
  }

  render() {
    const { title } = this.props;
    const id = title.split(' ').join('');
    return (
      <div>
        <div id={id} />
      </div>
    );
  }
}

export default TwoSetUninteractiveVennDiagram;
