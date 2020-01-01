import React from 'react';

import {
  createTwoSetCircularVennDiagram,
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
    const { title } = this.props;
    const id = title.split(' ').join('');
    this.div = createTwoSetCircularVennDiagram(id, twoSetCircles);
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
