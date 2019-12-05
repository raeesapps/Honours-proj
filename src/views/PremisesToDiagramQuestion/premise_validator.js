import PremiseCollection from "../../logic/premise_collection";

const NOT_SHADED = '0';
const MAYBE_SHADED = '1';
const SHADED = '2';

const stages = Object.freeze({
  REPRESENTATION_STAGE: 0,
  COMBINATION_STAGE: 1,
});

function validate(premisesOrArgument, refOrRefs, stage) {
  function getShadings(premiseOrArgument) {
    const argument = (premiseOrArgument instanceof PremiseCollection) ? premiseOrArgument : new PremiseCollection([premiseOrArgument]);
    const argumentVennDiagramParts = argument.getVennDiagramParts().slice(1);
    const resolvedColumn = argument.unifyAndResolve();
    const mappings = {};

    argumentVennDiagramParts.forEach((argumentVennDiagramPart) => {
      const { compartment, vennDiagramPart } = argumentVennDiagramPart;
      const resolvedValueArray = resolvedColumn[compartment.hashCode()];

      if (resolvedValueArray.length) {
        const shading = resolvedValueArray[0] === 'e' ? MAYBE_SHADED : SHADED;
        mappings[vennDiagramPart] = shading.toString();
      } else {
        mappings[vennDiagramPart] = NOT_SHADED.toString();
      }
    });

    return mappings;
  }

  function sortObject(unordered) {
    const ordered = {};
    Object.keys(unordered).sort().forEach((key) => {
      ordered[key] = unordered[key];
    });
    return ordered;
  }

  const { REPRESENTATION_STAGE, COMBINATION_STAGE } = stages;

  let result;

  if (stage === REPRESENTATION_STAGE) {
    result = refOrRefs.filter((ref, idx) => {
      const premise = premisesOrArgument[idx];

      const actualShadings = sortObject(ref.current.getShadings());
      const expectedShadings = sortObject(getShadings(premise));

      return JSON.stringify(expectedShadings) === JSON.stringify(actualShadings);
    }).length === 2;
  } else if (stage === COMBINATION_STAGE) {
    const actualShadings = sortObject(refOrRefs.current.getShadings());
    const expectedShadings = sortObject(getShadings(premisesOrArgument));

    result = JSON.stringify(expectedShadings) === JSON.stringify(actualShadings);
  }

  console.log(result);

  return result;
}

export {
  stages,
  validate,
};
