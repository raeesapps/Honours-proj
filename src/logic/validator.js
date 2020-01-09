import PremiseCollection from "./premise_collection";
import { symbolicForms, getEntailmentSymbol, getSymbolicForm } from './premise';
import copy from '../utils/copy';

const NOT_SHADED = '0';
const MAYBE_SHADED = '1';
const SHADED = '2';

const stages = Object.freeze({
  REPRESENTATION_STAGE: 0,
  COMBINATION_STAGE: 1,
});

function validateVennDiagram(premisesOrArgument, refOrRefs, stage) {
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
    }).length === refOrRefs.length;
  } else if (stage === COMBINATION_STAGE) {
    const actualShadings = sortObject(refOrRefs.current.getShadings());
    const expectedShadings = sortObject(getShadings(premisesOrArgument));

    result = JSON.stringify(expectedShadings) === JSON.stringify(actualShadings);
  }

  return result;
}

function validateMappings(firstEntry, secondEntry, thirdEntry, premise, mappingTable) {
  const {
    A_ENTAILS_B,
    A_DOES_NOT_ENTAIL_B,
    A_ENTAILS_NOT_B,
    A_DOES_NOT_ENTAIL_NOT_B,
  } = symbolicForms;

  function updateMappingTable() {
    if (firstEntry.length && secondEntry.length && thirdEntry.length) {
      const symbolicForm = getSymbolicForm(premise);
      const { firstTerm, secondTerm } = premise.terms;
      const updatedMappingTable = copy(mappingTable);

      const { content: firstEntryContents } = firstEntry[0];
      const { content: thirdEntryContents } = thirdEntry[0];

      let firstSymbol;
      if (firstEntryContents.length === 2) {
        const [, secondItem] = firstEntryContents;
        firstSymbol = secondItem;
      } else {
        const [firstItem] = firstEntryContents;
        firstSymbol = firstItem;
      }

      if (!(firstSymbol in mappingTable)) {
        const firstTermKey = Object.keys(updatedMappingTable).find((key) => updatedMappingTable[key] === firstTerm);

        if (firstTermKey) {
          delete updatedMappingTable[firstTermKey];
        }
        updatedMappingTable[firstSymbol] = firstTerm;
      }

      let secondSymbol;
      switch (symbolicForm) {
        case A_DOES_NOT_ENTAIL_NOT_B:
        case A_ENTAILS_NOT_B:
          if (thirdEntryContents.length !== 1) {
            const [, secondItem] = thirdEntryContents;
            secondSymbol = secondItem;
          }
          break;
        case A_ENTAILS_B:
        case A_DOES_NOT_ENTAIL_B:
          if (thirdEntryContents.length !== 2) {
            const [firstItem] = thirdEntryContents;
            secondSymbol = firstItem;
          }
          break;
        default:
          break;
      }
      if (!(secondSymbol in mappingTable)) {
        const secondTermKey = Object.keys(updatedMappingTable).find((key) => updatedMappingTable[key] === secondTerm);

        if (secondTermKey) {
          delete updatedMappingTable[secondTermKey];
        }
        updatedMappingTable[secondSymbol] = secondTerm;
      }

      return updatedMappingTable;
    }

    return null;
  }
  function performValidation() {
    const updatedMappingTable = updateMappingTable();
    if (updatedMappingTable) {
      let hint;
      let result = true;

      if (firstEntry.length === 0) {
        hint = 'Please drag an item into the first box!';
        result = false;
      }

      if (secondEntry.length === 0) {
        hint = 'Please drag an item into the second box!';
        result = false;
      }

      if (thirdEntry.length === 0) {
        hint = 'Please drag an item into the third box!';
        result = false;
      }

      if (!hint) {
        const { content: firstEntryContents } = firstEntry[0];
        const { content: secondEntryContents } = secondEntry[0];
        const { content: thirdEntryContents } = thirdEntry[0];

        const symbolicFormOfPremise = getSymbolicForm(premise);
        const expectedEntailmentSymbol = getEntailmentSymbol(symbolicFormOfPremise);
        const { firstTerm, secondTerm } = premise.terms;

        let count = 0;
        Object.keys(updatedMappingTable).forEach((mappingKey) => {
          const entry = updatedMappingTable[mappingKey];

          let secondMappingKey;
          switch (symbolicFormOfPremise) {
            case A_DOES_NOT_ENTAIL_NOT_B:
            case A_ENTAILS_NOT_B:
              secondMappingKey = `!${mappingKey}`;
              break;
            case A_ENTAILS_B:
            case A_DOES_NOT_ENTAIL_B:
              secondMappingKey = mappingKey;
              break;
            default:
              break;
          }

          if ((entry === firstTerm && mappingKey === firstEntryContents)
            || (entry === secondTerm && secondMappingKey === thirdEntryContents)) {
            count += 1;
          }
        });
        result = result && count === 2 && expectedEntailmentSymbol === secondEntryContents;

        if (expectedEntailmentSymbol !== secondEntryContents && count !== 2) {
          hint = 'Both your mappings and entailment symbol are wrong!';
        } else if (expectedEntailmentSymbol !== secondEntryContents) {
          hint = 'Your entailment symbol is wrong!';
        } else if (count !== 2) {
          hint = 'Your mappings are wrong!';
        }
      }
      return {
        hint,
        result,
        updatedMappingTable,
      };
    }
    return null;
  }

  return performValidation();
}

export {
  stages,
  validateVennDiagram,
  validateMappings,
};
