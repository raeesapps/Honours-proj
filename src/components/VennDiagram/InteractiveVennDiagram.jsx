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

import '../../assets/components/css/components/VennDiagram/venn_styles.css';

const NOT_SHADED = '0';
const MAYBE_SHADED = '1';
const SHADED = '2';

class InteractiveVennDiagram extends React.Component {
  static bindVennAreaPartListeners(div) {
    div.selectAll('g')
      .on('mouseover', function onMouseover() {
        const node = d3.select(this);
        const nodePath = node.select('path');
        const nodeShaded = node.attr('shaded') || NOT_SHADED;
        if (nodeShaded === NOT_SHADED) {
          nodePath.attr('style', 'fill: #009fdf; fill-opacity: 0.15');
        } else if (nodeShaded === MAYBE_SHADED) {
          nodePath.attr('style', 'fill: url(#diagonal2)');
        } else if (nodeShaded === SHADED) {
          nodePath.attr('style', 'fill: url(#diagonal3)');
        }
      })
      .on('mouseout', function onMouseout() {
        const node = d3.select(this);
        const nodePath = node.select('path');
        const nodeShaded = node.attr('shaded') || NOT_SHADED;
        if (nodeShaded === null) {
          node.attr('shaded', NOT_SHADED);
        }
        if (nodeShaded === NOT_SHADED) {
          nodePath.attr('style', 'fill: #ffffff');
        } else if (nodeShaded === MAYBE_SHADED) {
          nodePath.attr('style', 'fill: url(#diagonal0)');
        } else if (nodeShaded === SHADED) {
          nodePath.attr('style', 'fill: url(#diagonal1)');
        }
      })
      .on('click', function onClick() {
        const node = d3.select(this);
        const nodePath = node.select('path');
        const nodeShaded = node.attr('shaded') || NOT_SHADED;
        if (nodeShaded === NOT_SHADED) {
          nodePath.attr('style', 'fill: url(#diagonal2)');
        } else if (nodeShaded === MAYBE_SHADED) {
          nodePath.attr('style', 'fill: url(#diagonal3)');
        } else if (nodeShaded === SHADED) {
          nodePath.attr('style', 'fill: #ffffff');
        }
        node.attr('shaded', (parseInt(nodeShaded) + 1) % 3);
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
    appendVennAreaParts(svg, intersectionAreasMapping, true);
    appendLabels(svg, labels);
    InteractiveVennDiagram.bindVennAreaPartListeners(div);
    removeOriginalVennAreas();
  }

  render() {
    const { width, height, ...other } = this.state;
    return <div id="venn" style={{ padding: 0, width: `${width}px`, height: `${height}px` }} {...other} />;
  }
}

export default InteractiveVennDiagram;
