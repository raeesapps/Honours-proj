import React from 'react';

import * as d3 from 'd3';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import {
  NOT_SHADED,
  MAYBE_SHADED,
  SHADED,
} from './venn_utils';

import styles from '../../assets/components/jss/VennDiagram/four_set_interactive_venn_diagram_styles';

const ellipses = [
  {
    cX: 196,
    cY: 246,
    rX: 200,
    rY: 110,
    rotationAng: 45,
    eId: 'e4th1',
  },
  {
    cX: 266,
    cY: 176,
    rX: 200,
    rY: 110,
    rotationAng: 45,
    eId: 'e4th2',
  },
  {
    cX: 326,
    cY: 176,
    rX: 200,
    rY: 110,
    rotationAng: 135,
    eId: 'e4th3',
  },
  {
    cX: 396,
    cY: 246,
    rX: 200,
    rY: 110,
    rotationAng: 135,
    eId: 'e4th4',
  },
];

const paths = [
  {
    name: '(A)',
    path: 'M 106.00,84.00 C 106.00,84.00 115.00,84.00 115.00,84.00 126.65,84.02 139.81,87.08 151.00,90.29 173.07,96.63 203.93,111.05 222.00,125.00 227.65,120.60 233.53,112.50 239.00,107.00 255.45,90.47 274.16,71.42 294.00,59.00 289.97,54.24 284.30,51.19 279.00,48.00 270.26,42.74 261.36,37.65 252.00,33.58 252.00,33.58 232.00,25.34 232.00,25.34 196.72,13.10 145.52,7.15 119.90,41.00 115.82,46.38 112.57,52.63 110.34,59.00 107.20,67.99 106.01,74.48 106.00,84.00 Z',
  },
  {
    name: '(A&B)',
    path: 'M 225.00,127.00 C 246.85,141.70 279.29,170.24 295.00,191.00 300.09,187.35 309.68,176.32 315.00,171.00 328.77,157.23 350.29,136.61 367.00,127.00 365.06,120.37 358.77,115.11 354.28,110.00 343.00,97.14 328.41,83.69 315.00,73.00 311.69,70.36 299.57,60.21 296.00,60.26 292.24,60.31 280.40,70.47 277.00,73.20 263.33,84.16 250.54,95.99 238.83,109.00 234.06,114.30 227.31,120.22 225.00,127.00 Z',
  },
  {
    name: '(A&B&C)',
    path: 'M 223.00,127.00 C 202.85,154.42 191.30,169.75 178.40,202.00 178.40,202.00 171.58,222.00 171.58,222.00 170.88,224.45 169.43,228.55 169.81,231.00 170.48,235.31 182.47,247.45 186.00,251.00 198.57,263.62 223.90,286.32 239.00,295.00 239.00,295.00 247.60,270.00 247.60,270.00 258.19,243.78 276.53,214.35 295.00,193.00 290.74,185.70 279.24,174.24 273.00,168.00 260.82,155.82 237.75,135.29 223.00,127.00 Z',
  },
  {
    name: '(A&B&C&D)',
    path: 'M 295.00,196.00 C 284.13,211.29 273.02,225.50 263.86,242.00 256.90,254.54 250.98,267.53 246.05,281.00 244.86,284.27 241.51,292.54 243.11,295.68 244.69,298.76 258.34,306.30 262.00,308.30 262.00,308.30 285.00,319.72 285.00,319.72 287.86,320.95 293.00,323.35 296.00,323.35 299.13,323.35 305.06,320.60 308.00,319.22 308.00,319.22 327.00,309.78 327.00,309.78 327.00,309.78 343.00,300.58 343.00,300.58 345.13,299.23 348.49,297.33 349.31,294.82 350.39,291.54 346.23,281.53 345.00,278.00 339.25,261.45 331.00,245.98 322.00,231.00 322.00,231.00 305.63,207.00 305.63,207.00 302.22,202.46 300.20,198.58 295.00,196.00 Z',
  },
  {
    name: '(A&B&D)',
    path: 'M 353.00,293.00 C 358.98,290.67 365.86,284.84 371.00,280.79 384.13,270.44 394.23,260.77 406.00,249.00 409.83,245.17 420.87,235.27 421.22,230.00 421.44,226.84 417.52,215.53 416.33,212.00 411.16,196.62 404.20,181.97 395.99,168.00 395.99,168.00 377.71,140.00 377.71,140.00 375.99,137.61 371.61,131.12 368.91,130.32 365.08,129.19 354.17,138.86 351.00,141.40 334.21,154.83 327.04,161.78 312.00,177.00 309.22,179.82 299.64,189.30 299.82,193.00 299.96,195.79 304.36,200.69 306.12,203.00 306.12,203.00 321.00,224.00 321.00,224.00 332.84,241.96 348.23,272.08 353.00,293.00 Z',
  },
  {
    name: '(A&C)',
    path: 'M 106.00,85.00 C 104.31,97.70 108.04,117.61 111.58,130.00 120.09,159.82 134.47,185.88 152.43,211.00 152.43,211.00 167.00,230.00 167.00,230.00 169.56,225.69 171.00,218.07 172.67,213.00 172.67,213.00 183.26,187.00 183.26,187.00 190.32,172.41 199.41,157.26 208.72,144.00 208.72,144.00 222.00,126.00 222.00,126.00 190.36,104.93 155.32,88.59 117.00,85.91 117.00,85.91 106.00,85.00 106.00,85.00 Z',
  },
  {
    name: '(A&C&D)',
    path: 'M 299.00,326.00 C 311.08,331.30 329.81,335.63 343.00,336.01 346.27,336.11 353.87,338.07 356.20,335.40 357.70,333.23 356.77,327.61 356.20,325.00 355.22,315.89 354.92,306.83 352.00,298.00 352.00,298.00 321.00,315.68 321.00,315.68 321.00,315.68 299.00,326.00 299.00,326.00 Z',
  },
  {
    name: '(A&D)',
    path: 'M 358.00,336.00 C 367.03,335.99 372.37,335.02 381.00,332.41 386.68,330.69 393.02,327.53 398.00,324.30 418.31,311.15 426.66,286.26 426.66,263.00 426.66,263.00 424.00,235.00 424.00,235.00 424.00,235.00 407.00,251.00 407.00,251.00 407.00,251.00 374.00,281.00 374.00,281.00 374.00,281.00 361.00,291.00 361.00,291.00 361.00,291.00 354.32,297.17 354.32,297.17 354.32,297.17 355.92,309.00 355.92,309.00 355.92,309.00 358.00,336.00 358.00,336.00 Z',
  },
  {
    name: '(B)',
    path: 'M 298.00,59.00 C 316.20,70.50 341.12,94.13 355.91,110.00 355.91,110.00 369.00,125.00 369.00,125.00 369.00,125.00 396.00,108.78 396.00,108.78 418.39,96.97 451.49,84.04 477.00,84.00 477.00,84.00 486.00,84.00 486.00,84.00 485.99,74.48 484.80,67.99 481.66,59.00 479.43,52.63 476.18,46.38 472.10,41.00 446.47,7.14 395.28,13.10 360.00,25.34 360.00,25.34 340.00,33.58 340.00,33.58 330.64,37.65 321.74,42.74 313.00,48.00 307.70,51.19 302.03,54.24 298.00,59.00 Z',
  },
  {
    name: '(B&C)',
    path: 'M 168.00,235.00 C 168.00,235.00 166.09,250.00 166.09,250.00 164.18,277.94 168.27,306.20 193.00,323.56 198.49,327.41 204.65,330.24 211.00,332.33 219.26,335.05 225.33,335.99 234.00,336.00 234.00,336.00 235.75,310.00 235.75,310.00 235.75,310.00 237.36,297.17 237.36,297.17 237.36,297.17 231.00,291.00 231.00,291.00 231.00,291.00 218.00,281.00 218.00,281.00 218.00,281.00 185.00,251.00 185.00,251.00 185.00,251.00 168.00,235.00 168.00,235.00 Z',
  },
  {
    name: '(B&C&D)',
    path: 'M 240.00,298.00 C 237.28,308.26 234.62,326.63 236.00,337.00 253.43,336.84 277.03,333.01 293.00,326.00 293.00,326.00 264.00,311.69 264.00,311.69 264.00,311.69 240.00,298.00 240.00,298.00 Z',
  },
  {
    name: '(B&D)',
    path: 'M 370.00,126.00 C 370.00,126.00 381.57,142.00 381.57,142.00 381.57,142.00 399.57,170.00 399.57,170.00 411.35,190.58 417.47,207.47 424.00,230.00 429.96,225.06 441.33,208.97 446.00,202.00 461.37,179.04 475.71,150.99 482.12,124.00 484.46,114.13 485.60,106.10 486.04,96.00 486.15,93.35 487.46,88.73 485.39,86.78 483.47,84.96 479.45,85.87 477.00,85.96 468.06,86.31 463.89,86.62 455.00,88.40 421.36,95.13 398.74,108.69 370.00,126.00 Z',
  },
  {
    name: '(C)',
    path: 'M 285.00,406.00 C 280.20,403.06 271.34,401.09 263.00,395.22 244.74,382.35 234.20,360.17 234.00,338.00 205.06,337.74 179.51,321.31 169.06,294.00 163.82,280.30 163.98,271.20 164.00,257.00 164.00,257.00 166.18,232.00 166.18,232.00 165.20,228.74 155.72,217.73 153.01,214.00 143.92,201.47 135.67,188.62 128.31,175.00 116.68,153.50 104.04,119.57 104.00,95.00 104.00,95.00 104.00,86.00 104.00,86.00 94.48,86.01 87.99,87.20 79.00,90.34 73.10,92.41 67.05,95.48 62.00,99.16 22.26,128.15 34.82,190.86 52.23,229.00 79.08,287.83 127.67,340.74 183.00,374.00 207.81,388.92 245.66,405.95 275.00,406.00 275.00,406.00 285.00,406.00 285.00,406.00 Z',
  },
  {
    name: '(C&D)',
    path: 'M 236.00,338.00 C 236.01,354.09 241.18,370.47 251.46,383.00 260.85,394.44 280.93,405.43 296.00,405.43 302.01,405.43 312.56,402.33 318.00,399.74 323.67,397.04 329.26,393.99 334.00,389.82 341.53,383.19 345.49,376.93 349.74,368.00 354.15,358.74 355.99,348.19 356.00,338.00 341.55,338.00 332.15,337.16 318.00,333.63 318.00,333.63 296.00,327.37 296.00,327.37 296.00,327.37 274.00,333.63 274.00,333.63 259.85,337.16 250.45,338.00 236.00,338.00 Z',
  },
  {
    name: '(D)',
    path: 'M 488.00,86.00 C 488.00,86.00 488.00,94.00 488.00,94.00 487.95,126.76 470.04,165.55 453.19,193.00 453.19,193.00 435.12,219.00 435.12,219.00 432.96,221.82 426.49,229.25 425.63,232.00 424.76,234.80 426.09,239.07 426.56,242.00 427.41,247.27 427.99,252.66 428.00,258.00 428.02,271.70 427.83,281.91 422.55,295.00 411.93,321.30 386.16,337.75 358.00,338.00 357.77,363.02 344.29,387.41 322.00,399.22 316.52,402.12 312.17,404.05 306.00,405.00 312.05,407.40 325.46,405.51 332.00,404.41 355.32,400.49 377.36,391.64 398.00,380.30 452.42,350.43 500.43,302.42 530.30,248.00 542.38,226.01 555.96,192.30 556.00,167.00 556.02,155.57 556.72,146.21 553.57,135.00 544.83,103.89 520.05,86.02 488.00,86.00 Z',
  },
];

function init(id, ellipses) {
  function drawEllipse(diagram, cX, cY, rX, rY, rotationAng, eID) {
    const transformation = `rotate(${rotationAng} ${cX} ${cY})`;

    diagram.append('ellipse')
      .attr('cx', cX)
      .attr('cy', cY)
      .attr('rx', rX)
      .attr('ry', rY)
      .attr('id', eID)
      .attr('transform', transformation)
      .attr('fill-opacity', 0)
      .attr('stroke', '#ff0000')
      .attr('stroke-width', 1)
      .attr('opacity', 1)
      .attr('fill', '#ffffff');
  }

  function drawEllipsePaths(diagram) {
    function bindMouseEventListeners(div) {
      div
        .on('mouseover', function onMouseover() {
          const node = d3.select(this);
          const nodeShaded = node.attr('shaded') || NOT_SHADED;

          const nodeTransition = node.transition();
          nodeTransition.attr('fill-opacity', 0.2);

          if (nodeShaded === NOT_SHADED) {
            node.attr('fill', '#009fdf');
          } else if (nodeShaded === MAYBE_SHADED) {
            node.attr('fill', '#000000');
          } else if (nodeShaded === SHADED) {
            node.attr('fill', '#ff0000');
          }
        })
        .on('mouseout', function onMouseout() {
          const node = d3.select(this);
          const nodeShaded = node.attr('shaded') || NOT_SHADED;
          if (nodeShaded === null) {
            node.attr('shaded', NOT_SHADED);
          }

          const nodeTransition = node.transition();

          if (node.attr('fill-opacity') < 0.9) {
            nodeTransition.attr('fill-opacity', 0.2);
          }

          if (nodeShaded === NOT_SHADED) {
            nodeTransition.attr('fill', '#ffffff');
          } else if (nodeShaded === MAYBE_SHADED) {
            nodeTransition.attr('fill', '#000000');
          } else if (nodeShaded === SHADED) {
            nodeTransition.attr('fill', '#ff0000');
          }
        })
        .on('click', function onClick() {
          const node = d3.select(this);
          const nodeShaded = node.attr('shaded') || NOT_SHADED;

          const nodeTransition = node.transition();
          nodeTransition.attr('fill-opacity', 1);

          if (nodeShaded === NOT_SHADED) {
            nodeTransition.attr('fill', '#000000');
          } else if (nodeShaded === MAYBE_SHADED) {
            nodeTransition.attr('fill', '#ff0000');
          } else if (nodeShaded === SHADED) {
            nodeTransition.attr('fill', '#ffffff');
          }
          node.attr('shaded', (parseInt(nodeShaded) + 1) % 3);
        });
    }
    paths.forEach((pathEntry) => {
      const { name, path } = pathEntry;
      const appendedPath = diagram.append('path');

      appendedPath
        .attr('d', path)
        .attr('id', name)
        .attr('fill', 'white')
        .attr('fill-opacity', 0.2);

      bindMouseEventListeners(appendedPath);
    });
  }

  if (ellipses.length !== 4) {
    throw new Error('You can only draw four ellipses!');
  }

  const width = 746;
  const height = 500;

  const div = d3.select(`#${id}`);
  const diagram = div.append('svg').attr('width', width).attr('height', height);

  ellipses.forEach((ellipse) => {
    const {
      cX,
      cY,
      rX,
      rY,
      rotationAng,
      eID,
    } = ellipse;
    drawEllipse(diagram, cX, cY, rX, rY, rotationAng, eID);
  });

  drawEllipsePaths(diagram);

  return div;
}

class FourSetInteractiveVennDiagram extends React.Component {
  constructor() {
    super();

    this.state = {
      a: null,
      b: null,
      c: null,
      d: null,
    };
    this.getShadings = this.getShadings.bind(this);
  }

  componentDidMount() {
    const { premises } = this.props;

    const compartments = premises.getSets();
    const filteredCompartments = compartments.filter((compartment) => {
      const { sets } = compartment;
      return sets.length === 4;
    });

    if (filteredCompartments.length !== 1) {
      throw new Error('Something went wrong!');
    }

    const variables = filteredCompartments[0].sets;

    this.setState({
      a: variables[0],
      b: variables[1],
      c: variables[2],
      d: variables[3],
    });

    const div = init('ellipseVenn', ellipses);
    this.div = div;
  }

  getShadings() {
    const {
      a,
      b,
      c,
      d,
    } = this.state;

    const mappings = {};
    this.div.selectAll('path').each(function onEach() {
      const node = d3.select(this);
      const nodeId = node.attr('id');
      const nodeShaded = node.attr('shaded') || NOT_SHADED;

      let mappedId = nodeId;

      if (nodeId.includes('A')) {
        const indexOfA = mappedId.indexOf('A');
        mappedId = `${mappedId.substring(0, indexOfA)}${a}${mappedId.substring(indexOfA + 1)}`;
      }

      if (nodeId.includes('B')) {
        const indexOfB = mappedId.indexOf('B');
        mappedId = `${mappedId.substring(0, indexOfB)}${b}${mappedId.substring(indexOfB + 1)}`;
      }

      if (nodeId.includes('C')) {
        const indexOfC = mappedId.indexOf('C');
        mappedId = `${mappedId.substring(0, indexOfC)}${c}${mappedId.substring(indexOfC + 1)}`;
      }

      if (nodeId.includes('D')) {
        const indexOfD = mappedId.indexOf('D');
        mappedId = `${mappedId.substring(0, indexOfD)}${d}${mappedId.substring(indexOfD + 1)}`;
      }

      mappings[mappedId] = nodeShaded;
    });

    return mappings;
  }

  render() {
    const { classes } = this.props;
    const { a, b, c, d } = this.state;
    return (
      <div className={classes.content}>
        <Typography variant="body1" className={classes.topLeft}>
          {a}
        </Typography>
        <Typography variant="body1" className={classes.topRight}>
          {b}
        </Typography>
        <Typography variant="body1" className={classes.bottomLeft}>
          {c}
        </Typography>
        <Typography variant="body1" className={classes.bottomRight}>
          {d}
        </Typography>
        <div id="ellipseVenn" />
      </div>
    );
  }
}

export default withStyles(styles)(FourSetInteractiveVennDiagram);
