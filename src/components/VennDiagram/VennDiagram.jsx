/* eslint-disable */
import React from 'react';

import * as d3 from "d3";
import * as venn from 'venn.js';

import '../../assets/css/venn.css';

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
    const colors = ['none', '#009fdf'];
    colors.forEach((color, idx) => {
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
        .attr('fill', color)
        .attr('fill-opacity', '0.15');
      diagonal.append('path')
        .attr('d', 'M-1,1 l2,-2 M0,10 l10,-10 M9,11 l2,-2')
        .attr('stroke', '#000000')
        .attr('opacity', '1')
        .attr('stroke-width', '1');
    });
  }

  static bindVennAreaPartListeners(div) {
    div.selectAll('g')
      .on('mouseover', function onMouseover() {
        const node = d3.select(this);
        const nodePath = node.select('path');
        const nodeAlreadySelected = node.classed('selected');
        nodePath.attr('style', nodeAlreadySelected ? 'fill: url(#diagonal1)' : 'fill: #009fdf; fill-opacity: 0.15');
      })
      .on('mouseout', function onMouseout() {
        const node = d3.select(this);
        const nodePath = node.select('path');
        const nodeAlreadySelected = node.classed('selected');
        nodePath.attr('style', nodeAlreadySelected ? 'fill: url(#diagonal0)' : 'fill: #ffffff');
      })
      .on('click', function onClick() {
        const node = d3.select(this);
        const nodePath = node.select('path');
        const nodeAlreadySelected = node.classed('selected');
        const nodePathStyle = (!nodeAlreadySelected ? 'fill: url(#diagonal1)' : 'fill: #ffffff');
        nodePath.attr('style', nodePathStyle);
        node.classed('selected', !nodeAlreadySelected);
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
    };
  }

  componentDidMount() {
    const { sets } = this.state;
    const chart = venn.VennDiagram();
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
    return <div id="venn" />;
  }
}

export default VennDiagram;