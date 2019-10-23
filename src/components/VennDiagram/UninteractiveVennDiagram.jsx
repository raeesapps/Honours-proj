import React from 'react';

import * as d3 from "d3";
import * as venn from 'venn.js';

import {
  removeOriginalVennAreas,
  getIntersectionAreasMapping,
  appendLabels,
  appendVennAreaParts,
  appendPatterns,
} from './venn_utils';

import '../../assets/css/venn.css';

class UninteractiveVennDiagram extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sets: [
        { sets: ['A'], size: 8 },
        { sets: ['B'], size: 8 },
        { sets: ['C'], size: 8 },
        { sets: ['A', 'B'], size: 2 },
        { sets: ['B', 'C'], size: 2 },
        { sets: ['A', 'C'], size: 2 },
        { sets: ['A', 'B', 'C'], size: 2 },
      ],
      width: 200,
      height: 200,
    };
  }

  componentDidMount() {
    const { sets, width, height } = this.state;
    const chart = venn.VennDiagram().width(width).height(height);
    const div = d3.select('#venn').datum(sets).call(chart);
    const svg = div.select('svg');
    const defs = svg.append('defs');
    const labels = div.selectAll('text').remove();
    const intersectionAreasMapping = getIntersectionAreasMapping();


    appendPatterns(defs);
    appendVennAreaParts(svg, intersectionAreasMapping, false);
    appendLabels(svg, labels);
    removeOriginalVennAreas();
  }

  render() {
    const { width, height } = this.state;
    return <div id="venn" style={{ padding: 0, width: `${width}px`, height: `${height}px` }} />;
  }
}

export default UninteractiveVennDiagram;