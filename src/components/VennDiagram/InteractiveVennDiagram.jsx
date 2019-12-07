import React from 'react';

import * as d3 from "d3";
import * as venn from 'venn.js';

import {
  DEFAULT_SET,
  NOT_SHADED,
  MAYBE_SHADED,
  SHADED,
  removeOriginalVennAreas,
  getIntersectionAreasMapping,
  appendLabels,
  appendVennAreaParts,
  appendPatterns,
  getShadings,
  shadeAccordingToShadings,
} from './venn_utils';

import '../../assets/components/css/components/VennDiagram/venn_styles.css';

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
    const { sets, premise } = this.props;

    if (sets) {
      this.drawVennDiagram(sets);
    } else if (premise) {
      this.drawVennDiagram(premise.getSets());
    } else {
      this.drawVennDiagram(DEFAULT_SET);
    }
  }

  getShadings() {
    return getShadings(this.div);
  }

  drawVennDiagram(sets) {
    const { title, shadings } = this.props;
    const { width, height } = this.state;
    const id = title.split(' ').join('');

    const chart = venn.VennDiagram().width(width).height(height);
    const div = d3.select(`#${id}`).datum(sets).call(chart);
    const svg = div.select('svg');
    const defs = svg.append('defs');
    const labels = div.selectAll('text').remove();
    const intersectionAreasMapping = getIntersectionAreasMapping();

    this.div = div;

    appendPatterns(defs);
    appendVennAreaParts(svg, intersectionAreasMapping, true);
    appendLabels(svg, labels);
    InteractiveVennDiagram.bindVennAreaPartListeners(div);
    removeOriginalVennAreas();

    if (shadings) {
      shadeAccordingToShadings(this.div, shadings);
    }
  }

  render() {
    const { title } = this.props;
    const { width, height, ...other } = this.state;
    const id = title.split(' ').join('');

    return <div id={id} style={{ padding: 0, width: `${width}px`, height: `${height}px` }} {...other} />;
  }
}

export default InteractiveVennDiagram;
