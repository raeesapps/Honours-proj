import React from 'react';

import * as d3 from "d3";
import * as venn from 'venn.js';

import '../../assets/css/venn.css';

const NOT_SHADED = '0';
const MAYBE_SHADED = '1';
const SHADED = '2';

class VennDiagram extends React.Component {
  static removeOriginalVennAreas() {
    d3.selectAll('g.venn-area').remove();
  }

  static getIntersectionAreasMapping() {
    const intersectionAreasMapping = {};
    const vennAreas = d3.selectAll('.venn-area');
    vennAreas.each((areaData, areaIdx, areas) => {
      const area = areas[areaIdx];
      const areaSets = areaData.sets;
      const areaSelection = d3.select(area);
      const areaD = areaSelection.select('path').attr('d');
      const areaSetsId = area.dataset.vennSets;
      const intersectedAreas = d3.selectAll('.venn-area')
        .filter((cAreaData, cAreaIdx, cAreas) => {
          const cAreaSetsId = cAreas[cAreaIdx].dataset.vennSets;
          const cAreaSets = cAreaData.sets;
          const isContained = areaSets.every((setId) => cAreaSets.indexOf(setId) > -1);
          return (isContained && cAreaSetsId !== areaSetsId);
        }).nodes().map((intersectedArea) => {
          const intersectedAreaSelection = d3.select(intersectedArea);
          return {
            sets: intersectedAreaSelection.data()[0].sets,
            d: intersectedAreaSelection.select('path').attr('d'),
          };
        });

      intersectionAreasMapping[areaSetsId] = {
        vennArea: {
          sets: areaSets,
          d: areaD,
        },
        intersectedAreas,
      };
    });
    return intersectionAreasMapping;
  }

  static getPartId(vennArea, intersectedAreas) {
    let partId = `(${vennArea.sets.join('n')})`;
    partId += intersectedAreas.length > 1 ? '\\(' : '';
    partId += intersectedAreas.length === 1 ? '\\' : '';
    partId += intersectedAreas
      .map((intersectedArea) => intersectedArea.sets)
      .map((set) => `${(set.join('n'))}`).join('u');
    partId += intersectedAreas.length > 1 ? ')' : '';
    return partId;
  }

  static appendLabels(svg, labels) {
    labels.nodes().forEach((label) => {
      svg.append(() => label);
    });
  }

  static appendVennAreaPart(svg, d, partId) {
    svg.append('g')
      .attr('class', 'venn-area-part')
      .attr('venn-area-part-id', partId)
      .append('path')
      .attr('d', d)
      .attr('fill-rule', 'evenodd');
  }

  static appendVennAreaParts(svg, intersectionAreasMapping) {
    Object.keys(intersectionAreasMapping).forEach((areaSetsId) => {
      const intersectionAreasItem = intersectionAreasMapping[areaSetsId];
      const { vennArea, intersectedAreas } = intersectionAreasItem;
      const partId = VennDiagram.getPartId(vennArea, intersectedAreas);
      const d = [vennArea.d].concat(intersectedAreas.map((intersectedArea) => intersectedArea.d));
      VennDiagram.appendVennAreaPart(svg, d.join(''), partId);
    });
  }

  static appendPatterns(defs) {
    const colours = [
      {
        rectColour: 'none',
        pathColour: '#000000',
      },
      {
        rectColour: 'none',
        pathColour: '#ff0000',
      },
      {
        rectColour: '#009fdf',
        pathColour: '#000000',
      },
      {
        rectColour: '#009fdf',
        pathColour: '#ff0000',
      },
    ];
    colours.forEach((colour, idx) => {
      const { rectColour, pathColour } = colour;
      const diagonal = defs.append('pattern')
        .attr('id', 'diagonal'.toString() + idx.toString())
        .attr('patternUnits', 'userSpaceOnUse')
        .attr('width', '10')
        .attr('height', '10');
      diagonal.append('rect')
        .attr('width', '10')
        .attr('height', '10')
        .attr('x', '0')
        .attr('y', '0')
        .attr('fill', rectColour)
        .attr('fill-opacity', '0.15');
      diagonal.append('path')
        .attr('d', 'M-1,1 l2,-2 M0,10 l10,-10 M9,11 l2,-2')
        .attr('stroke', pathColour)
        .attr('opacity', '1')
        .attr('stroke-width', '1');
    });
  }

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
        console.log(node.attr('venn-area-part-id'));
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
    const intersectionAreasMapping = VennDiagram.getIntersectionAreasMapping();

    VennDiagram.appendPatterns(defs);
    VennDiagram.appendVennAreaParts(svg, intersectionAreasMapping);
    VennDiagram.appendLabels(svg, labels);
    VennDiagram.bindVennAreaPartListeners(div);
    VennDiagram.removeOriginalVennAreas();
  }

  render() {
    const { width, height } = this.state;
    return <div id="venn" style={{ padding: 0, width: `${width}px`, height: `${height}px` }} />;
  }
}

export default VennDiagram;
