import React from 'react';

import * as d3 from "d3";
import * as venn from 'venn.js'

class VennDiagram extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sets: [{ sets: ['A'], size: 12 }, { sets: ['B'], size: 12 }, { sets: ['C'], size: 12 }, { sets: ['A', 'B'], size: 2 }, { sets: ['B', 'C'], size: 2 }, { sets: ['A', 'C'], size: 2 }, { sets: ['A', 'B', 'C'], size: 2 }],
    };
  }

  componentDidMount() {
    const { anchor } = this.refs;
    const { sets } = this.state;
    const chart = venn.VennDiagram();
    d3.select(anchor).datum(sets).call(chart);
  }

  render() {
    return <g ref="anchor" />;
  }
}

export default VennDiagram;
