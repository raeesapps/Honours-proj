import React from 'react';

import Arrow from '../Arrow/Arrow';

function LevelOneVennDiagramTree(props) {
  const { order, vennDiagramList, ...rest } = props;
  const renderLevelOneArrow = (idx) => {
    let x1;
    let y1;
    let x2;
    let y2;

    if (order === 3) {
      switch (idx) {
        case 0:
          x1 = 50;
          y1 = 0;
          x2 = 150;
          y2 = 150;
          break;
        case 1:
          x1 = 130;
          y1 = 0;
          x2 = 30;
          y2 = 150;
          break;
        default:
          break;
      }
    } else if (order === 4) {
      switch (idx) {
        case 0:
          x1 = 50;
          y1 = 0;
          x2 = 100;
          y2 = 150;
          break;
        case 1:
          x1 = 90;
          y1 = 0;
          x2 = 90;
          y2 = 150;
          break;
        case 2:
          x1 = 150;
          y1 = 0;
          x2 = 100;
          y2 = 150;
          break;
        default:
          break;
      }
    }

    return (
      <Arrow
        id={`arrow${idx}`}
        width={300}
        height={175}
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
      />
    );
  };
  const renderPropositionVennDiagram = (idx) => (
    <div key={`vennDiagram${idx}`} style={{ marginLeft: '15px', width: '175px' }}>
      {
        vennDiagramList[idx]
      }
      {
        renderLevelOneArrow(idx)
      }
    </div>
  );

  return (
    <div style={{ display: 'flex' }} {...rest}>
      {
        [...Array(order - 1).keys()].map((i) => (
          renderPropositionVennDiagram(i)
        ))
      }
    </div>
  );
}

export default LevelOneVennDiagramTree;
