import React from 'react';

import * as d3 from 'd3';

import {
  NOT_SHADED,
  createTwoSetCircularVennDiagram,
  twoSetCircles,
  mapRegion,
  bindMouseEventListeners,
} from './venn_utils';

class TwoSetInteractiveVennDiagram extends React.Component {
  constructor() {
    super();

    this.state = {
      a: null,
      b: null,
    };
    this.getShadings = this.getShadings.bind(this);
  }

  componentDidMount() {
    const { title, premise } = this.props;

    const { firstTerm, secondTerm } = premise.terms;

    this.setState({
      a: firstTerm,
      b: secondTerm,
    });

    const id = title.split(' ').join('');
    const div = createTwoSetCircularVennDiagram(id, twoSetCircles, bindMouseEventListeners);
    this.div = div;
  }

  getShadings() {
    const {
      a,
      b,
    } = this.state;

    const mappings = {};
    this.div.selectAll('path').each(function each() {
      const node = d3.select(this);
      const nodeId = node.attr('id');
      const nodeShaded = node.attr('shaded') || NOT_SHADED;
      const mappedId = mapRegion(nodeId, a, b);

      mappings[mappedId] = nodeShaded;
    });

    return mappings;
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

export default TwoSetInteractiveVennDiagram;
