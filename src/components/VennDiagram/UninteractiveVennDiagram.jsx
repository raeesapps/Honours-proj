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

const shadings = Object.freeze({
  BLACK: 0,
  RED: 1,
});

class UninteractiveVennDiagram extends React.Component {
  static shadeParts(div, part, shading) {
    const { RED, BLACK } = shadings;
    div.selectAll('g').each(function onEach() {
      const node = d3.select(this);
      const nodePath = node.select('path');
      const nodePart = node.attr('venn-area-part-id');
      if (nodePart === part) {
        switch (shading) {
          case RED:
            nodePath.attr('style', 'fill: url(#diagonal3)');
            break;
          case BLACK:
            nodePath.attr('style', 'fill: url(#diagonal2)');
            break;
          default:
            break;
        }
      }
    });
  }

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
