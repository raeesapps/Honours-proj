import * as d3 from 'd3';

const DEFAULT_SET = [
  { sets: ['A'], size: 8 },
  { sets: ['B'], size: 8 },
  { sets: ['C'], size: 8 },
  { sets: ['A', 'B'], size: 2 },
  { sets: ['B', 'C'], size: 2 },
  { sets: ['A', 'C'], size: 2 },
  { sets: ['A', 'B', 'C'], size: 2 },
];

function removeOriginalVennAreas() {
  d3.selectAll('g.venn-area').remove();
}

function getIntersectionAreasMapping() {
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

function getPartId(vennArea, intersectedAreas) {
  let partId = `(${vennArea.sets.join('&')})`;
  partId += intersectedAreas.length > 1 ? '\\(' : '';
  partId += intersectedAreas.length === 1 ? '\\' : '';
  partId += intersectedAreas
    .map((intersectedArea) => intersectedArea.sets)
    .map((set) => `${(set.join('&'))}`).join('|');
  partId += intersectedAreas.length > 1 ? ')' : '';
  return partId;
}

function appendLabels(svg, labels) {
  labels.nodes().forEach((label) => {
    svg.append(() => label);
  });
}

function appendVennAreaPart(svg, d, partId, pointer) {
  if (pointer) {
    svg.append('g')
      .attr('class', 'venn-area-part')
      .attr('venn-area-part-id', partId)
      .append('path')
      .attr('d', d)
      .attr('fill-rule', 'evenodd');
  } else {
    svg.append('g')
      .attr('class', 'venn-area-part')
      .attr('venn-area-part-id', partId)
      .append('path')
      .attr('d', d)
      .attr('fill-rule', 'evenodd')
      .style('cursor', 'default');
  }
}

function appendVennAreaParts(svg, intersectionAreasMapping, pointer) {
  Object.keys(intersectionAreasMapping).forEach((areaSetsId) => {
    const intersectionAreasItem = intersectionAreasMapping[areaSetsId];
    const { vennArea, intersectedAreas } = intersectionAreasItem;
    const partId = getPartId(vennArea, intersectedAreas);
    const d = [vennArea.d].concat(intersectedAreas.map((intersectedArea) => intersectedArea.d));
    appendVennAreaPart(svg, d.join(''), partId, pointer);
  });
}

function appendPatterns(defs) {
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

export {
  DEFAULT_SET,
  removeOriginalVennAreas,
  getIntersectionAreasMapping,
  appendLabels,
  appendVennAreaParts,
  appendPatterns,
};
