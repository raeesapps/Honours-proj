import React from 'react';

import * as d3 from 'd3';
import * as venn from 'venn.js';

import Typography from '@material-ui/core/Typography';

import {
  DEFAULT_SET,
  removeOriginalVennAreas,
  getIntersectionAreasMapping,
  appendLabels,
  appendVennAreaParts,
  appendPatterns,
  shadeAccordingToShadings,
} from './venn_utils';

import '../../assets/components/css/components/VennDiagram/venn_styles.css';

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
      width: 300,
      height: 300,
      argument: null,
    };
  }

  componentDidMount() {
    const { argument } = this.state;
    const { shading, sets } = this.props;

    if (!argument && shading && sets) {
      this.drawVennDiagram(sets);
    } else {
      this.drawVennDiagram(DEFAULT_SET);
    }
  }

  drawVennDiagram(sets) {
    const { title, shading } = this.props;
    const { width, height, argument } = this.state;

    const id = title.split(' ').join('');
    const chart = venn.VennDiagram().width(width).height(height);
    const div = d3.select(`#${id}`).datum(sets).call(chart);
    const svg = div.select('svg');
    const defs = svg.append('defs');
    const labels = div.selectAll('text').remove();
    const intersectionAreasMapping = getIntersectionAreasMapping();

    this.div = div;

    appendPatterns(defs);
    appendVennAreaParts(svg, intersectionAreasMapping);
    appendLabels(svg, labels);
    removeOriginalVennAreas();

    if (!argument && shading && this.props.sets) {
      shadeAccordingToShadings(this.div, shading);
    }

    div.selectAll('g').each(function each() {
      const node = d3.select(this);

      node.style('cursor', 'default');
    });
  }

  applyShading(argument) {
    const argumentSets = argument.getSets();
    this.setState({ argument });
    this.div.select('svg').remove();
    this.drawVennDiagram(argumentSets);
  }

  shadeAccordingToArgument() {
    const { argument } = this.state;
    const { BLACK, RED } = shadings;

    const mappings = {};
    this.div.selectAll('g').each(function onEach() {
      const node = d3.select(this);
      const nodePart = node.attr('venn-area-part-id');

      if (nodePart.indexOf('\\') > -1) {
        const nodePartSplit = nodePart.split('\\');

        const leftPart = nodePartSplit[0];
        const rightPart = nodePartSplit[1];

        mappings[leftPart] = rightPart;
      } else {
        mappings[nodePart] = '';
      }
    });
    const resolvedColumn = argument.unifyAndResolve();
    const partsToShade = [];
    const argumentVennDiagramParts = argument.getVennDiagramParts();
    argumentVennDiagramParts.forEach((argumentVennDiagramPart) => {
      const { compartment, vennDiagramPart } = argumentVennDiagramPart;
      const resolvedValueArray = resolvedColumn[compartment.hashCode()];

      if (resolvedValueArray.length) {
        const vennDiagramPartSplit = vennDiagramPart.split('\\');
        const leftPart = vennDiagramPartSplit[0];

        if (!(leftPart in mappings)) {
          throw new Error(`Shading algorithm failed! ${leftPart} not found in ${JSON.stringify(mappings)}`);
        }

        const rightPart = mappings[leftPart];
        const shading = resolvedValueArray[0] === 'e' ? BLACK : RED;
        const partStr = rightPart ? `${leftPart}\\${rightPart}` : leftPart;
        partsToShade.push({ part: partStr, shading });
      }
    });
    partsToShade.forEach((partToShade) => {
      const {
        part,
        shading,
      } = partToShade;

      UninteractiveVennDiagram.shadeParts(this.div, part, shading);
    });
  }

  render() {
    const {
      title,
      ...other
    } = this.props;
    const {
      width,
      height,
      argument,
    } = this.state;
    const id = title.split(' ').join('');
    if (argument) {
      this.shadeAccordingToArgument();
    }
    return (
      <div>
        <Typography variant="h6">{title}</Typography>
        <div
          id={id}
          style={{
            padding: 0, width: `${width}px`, height: `${height}px`,
          }}
          {...other}
        />
      </div>
    );
  }
}

export default UninteractiveVennDiagram;
