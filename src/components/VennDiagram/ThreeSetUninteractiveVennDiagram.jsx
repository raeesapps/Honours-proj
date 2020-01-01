import React from 'react';

import {
  createThreeSetCircularVennDiagram,
  threeSetCircles,
  applyShadings,
} from './venn_utils';

class ThreeSetUninteractiveVennDiagram extends React.Component {
  constructor() {
    super();

    this.state = {
      a: null,
      b: null,
      c: null,
    };
    this.applyShading = this.applyShading.bind(this);
  }

  componentDidMount() {
    const { title } = this.props;
    const id = title.split(' ').join('');
    this.div = createThreeSetCircularVennDiagram(id, threeSetCircles);
  }

  applyShading(premiseCollection) {
    const [a, b, c] = premiseCollection.terms;

    if (!(this.state.a && this.state.b && this.state.c)) {
      this.setState({ a, b, c });
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

export default ThreeSetUninteractiveVennDiagram;
