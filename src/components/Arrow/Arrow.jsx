import React from 'react';

import * as d3 from 'd3';

class Arrow extends React.Component {
  componentDidMount() {
    const {
      id,
      width,
      height,
      x1,
      y1,
      x2,
      y2,
    } = this.props;

    const drawingSpace = d3.select(`#${id}`)
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    drawingSpace.append('svg:defs').append('svg:marker')
      .attr('id', 'triangle')
      .attr('refX', 6)
      .attr('refY', 6)
      .attr('markerWidth', 30)
      .attr('markerHeight', 30)
      .attr('orient', 'auto')
      .append('path')
      .attr('d', 'M 0 0 12 6 0 12 3 6')
      .style('fill', 'lightblue');

    drawingSpace.append('line')
      .attr('x1', x1)
      .attr('y1', y1)
      .attr('x2', x2)
      .attr('y2', y2)
      .attr('stroke-width', 3)
      .attr('stroke', 'lightblue')
      .attr('marker-end', 'url(#triangle)');
  }

  render() {
    const { id, ...rest } = this.props;
    return <div id={id} {...rest} />;
  }
}

export default Arrow;
