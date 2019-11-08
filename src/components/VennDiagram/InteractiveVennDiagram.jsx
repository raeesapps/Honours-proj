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
      width: 300,
      height: 300,
    };
  }

  componentDidMount() {
    const { title, premise } = this.props;
    const { width, height } = this.state;
    const chart = venn.VennDiagram().width(width).height(height);
    const div = d3.select(`#${title}`).datum(premise.getSets()).call(chart);
    const svg = div.select('svg');
    const defs = svg.append('defs');
    const labels = div.selectAll('text').remove();
    const intersectionAreasMapping = getIntersectionAreasMapping();

    appendPatterns(defs);
    appendVennAreaParts(svg, intersectionAreasMapping, true);
    appendLabels(svg, labels);
    InteractiveVennDiagram.bindVennAreaPartListeners(div);
    removeOriginalVennAreas();
  getShadings() {
    const mappings = {};
    this.div.selectAll('g').each(function onEach() {
      const node = d3.select(this);
      const nodePart = node.attr('venn-area-part-id');
      const nodeShaded = node.attr('shaded') || NOT_SHADED;

      if (nodePart.indexOf('\\') > -1) {
        const nodePartSplit = nodePart.split('\\');
        const leftPart = nodePartSplit[0];

        mappings[leftPart] = nodeShaded;
      } else {
        mappings[nodePart] = nodeShaded;
      }
    });

    return mappings;
  }
  }

  render() {
    const { title } = this.props;
    const { width, height, ...other } = this.state;
    return <div id={title} style={{ padding: 0, width: `${width}px`, height: `${height}px` }} {...other} />;
  }
}

export default InteractiveVennDiagram;
