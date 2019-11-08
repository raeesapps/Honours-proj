import PremiseCollection from "../../logic/premise_collection";

const NOT_SHADED = '0';
const MAYBE_SHADED = '1';
const SHADED = '2';

function validate(state) {
  function getShadings(premise) {
    const argument = new PremiseCollection([premise]);
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

  const { refs, premises } = state;

  const result = refs.filter((ref, idx) => {
    const premise = premises[idx];

    const actualShadings = sortObject(ref.current.getShadings());
    const expectedShadings = sortObject(getShadings(premise));

    return JSON.stringify(expectedShadings) === JSON.stringify(actualShadings);
  }).length === 2;

  console.log(result);

  return result;
}

export default validate;
