import React from 'react';

import * as d3 from 'd3';

import {
  NOT_SHADED,
  createThreeSetCircularVennDiagram,
  threeSetCircles,
  mapRegion,
  bindMouseEventListeners,
} from './venn_utils';

class ThreeSetInteractiveVennDiagram extends React.Component {
  constructor() {
    super();

    this.state = {
      a: null,
      b: null,
      c: null,
    };
    this.getShadings = this.getShadings.bind(this);
  }

  componentDidMount() {
    const { title, premises } = this.props;

    this.setState({
      a: premises.terms[0],
      b: premises.terms[1],
      c: premises.terms[2],
    });

    const id = title.split(' ').join('');
    const div = createThreeSetCircularVennDiagram(id, threeSetCircles, bindMouseEventListeners);
    this.div = div;
  }

  getShadings() {
    const {
      a,
      b,
      c,
    } = this.state;

    const mappings = {};
    this.div.selectAll('path').each(function each() {
      const node = d3.select(this);
      const nodeId = node.attr('id');
      const nodeShaded = node.attr('shaded') || NOT_SHADED;
      const mappedId = mapRegion(nodeId, a, b, c);

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

export default ThreeSetInteractiveVennDiagram;
