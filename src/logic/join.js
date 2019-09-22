import {
  ALL_A_IS_B,
  SOME_A_IS_B,
  SOME_A_IS_NOT_B,
  NO_A_IS_B,
} from './forms';

import {
  M_P_S_M,
  P_M_S_M,
  M_P_M_S,
  P_M_M_S,
} from './figure';

// assume relationship 1 for now
function joinPremises(pair) {
  function figureSet(form, a, b) {
    switch (form) {
      case ALL_A_IS_B:
        a.add(0);
        b.add(0);
        break;
      case SOME_A_IS_NOT_B:
      case SOME_A_IS_B:
        a.add(0);
        a.add(1);
        b.add(0);
        break;
      case NO_A_IS_B:
        b.add(0);
        break;
      default:
        break;
    }
  }

  const { firstPremise, secondPremise } = pair.getPremises();
  const relationship = pair.getRelationship();

  const formOfFirstPremise = firstPremise.getForm();
  const formOfSecondPremise = secondPremise.getForm();

  const m = new Set();
  const p = new Set();
  const s = new Set();

  switch (relationship) {
    case M_P_M_S:
      figureSet(formOfFirstPremise, m, p);
      figureSet(formOfSecondPremise, m, s);
      break;
    case P_M_S_M:
      figureSet(formOfFirstPremise, p, m);
      figureSet(formOfSecondPremise, s, m);
      break;
    case M_P_S_M:
      figureSet(formOfFirstPremise, m, p);
      figureSet(formOfSecondPremise, s, m);
      break;
    case P_M_M_S:
      figureSet(formOfFirstPremise, p, m);
      figureSet(formOfSecondPremise, m, s);
      break;
    default:
      break;
  }

  return { m, p, s };
}

export default joinPremises;
