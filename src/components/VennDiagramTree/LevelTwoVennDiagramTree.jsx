import React from 'react';

import Arrow from '../Arrow/Arrow';

function LevelTwoVennDiagramTree(props) {
  const {
    order,
    combinedVennDiagram,
    conclusionOrReducedVennDiagram,
    ...rest
  } = props;
  const renderLevelTwoArrow = () => {
    let x1;
    let y1;
    let x2;
    let y2;

    if (order === 3) {
      x1 = 150;
      y1 = 0;
      x2 = 150;
      y2 = 150;
    } else if (order === 4) {
      x1 = 300;
      y1 = 0;
      x2 = 300;
      y2 = 150;
    }

    return (
      <Arrow
        id="arrowLevel2"
        width={400}
        height={175}
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
      />
    );
  };
  return (
    <div {...rest}>
      {
        combinedVennDiagram
      }
      {
        renderLevelTwoArrow()
      }
      {
        conclusionOrReducedVennDiagram
      }
    </div>
  );
}

export default LevelTwoVennDiagramTree;
