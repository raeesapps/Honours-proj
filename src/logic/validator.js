import { symbolicForms, getEntailmentSymbol, getSymbolicForm } from './premise';
import copy from '../utils/copy';

const stages = Object.freeze({
  REPRESENTATION_STAGE: 0,
  COMBINATION_STAGE: 1,
  REDUCTION_STAGE: 2,
});

function validateArgument(premiseCollection, conclusion) {
  const result = premiseCollection.argue(conclusion);
  return result;
}

function validateVennDiagram(premiseCollection, refOrRefs, stage, termsInMapping) {
  function getShadings() {
    const { REPRESENTATION_STAGE, COMBINATION_STAGE, MAPPING_STAGE } = stages;

    let vennDiagramParts;
    const mappings = {};

    let column;
    switch (stage) {
      case REPRESENTATION_STAGE:
      case COMBINATION_STAGE:
        column = premiseCollection.unifyAndResolve();
        vennDiagramParts = premiseCollection.getVennDiagramParts().slice(1);
        break;
      case MAPPING_STAGE:
        // eslint-disable-next-line no-case-declarations
        const {
          mappedTableUnified,
          vennDiagramParts: mappedVennDiagramParts,
        } = premiseCollection.map(termsInMapping);
        column = mappedTableUnified;
        vennDiagramParts = mappedVennDiagramParts.slice(1);
        break;
      default:
        break;
    }

    vennDiagramParts
      .filter(({ compartment }) => compartment.hashCode() in column)
      .forEach((partWithCompartment) => {
        const { compartment, vennDiagramPart } = partWithCompartment;
        const resolvedValueArray = column[compartment.hashCode()];

        if (resolvedValueArray.length) {
          mappings[vennDiagramPart] = resolvedValueArray;
        }
      });

    return mappings;
  }

  function sortObject(unordered) {
    const unorderedWithSortedKeys = {};
    Object.keys(unordered).forEach((key) => {
      const sortedKey = String([...key].sort());
      unorderedWithSortedKeys[sortedKey] = unordered[key];
    });
    const ordered = {};
    Object.keys(unorderedWithSortedKeys).sort().forEach((key) => {
      ordered[key] = unorderedWithSortedKeys[key];
    });
    return ordered;
  }

  const { REPRESENTATION_STAGE, COMBINATION_STAGE, MAPPING_STAGE } = stages;

  let result;

  if (stage === REPRESENTATION_STAGE) {
    result = refOrRefs.filter((ref) => {
      const actualShadings = sortObject(ref.current.getShadings());
      const expectedShadings = sortObject(getShadings());

      return JSON.stringify(expectedShadings) === JSON.stringify(actualShadings);
    }).length === refOrRefs.length;
  } else if (stage === COMBINATION_STAGE || stage === MAPPING_STAGE) {
    const actualShadings = sortObject(refOrRefs.current.getShadings());
    const expectedShadings = sortObject(getShadings());

    result = JSON.stringify(expectedShadings) === JSON.stringify(actualShadings);
  }

  return result;
}

function validateMappings(firstEntry, secondEntry, thirdEntry, premise, mappingTable) {
  function isLetter(character) {
    const asciiCode = character.charCodeAt(0);
    return (asciiCode >= 65 && asciiCode < 91) || (asciiCode >= 97 && asciiCode < 123);
  }
  const {
    A_ENTAILS_B,
    A_DOES_NOT_ENTAIL_B,
    A_ENTAILS_NOT_B,
    A_DOES_NOT_ENTAIL_NOT_B,
  } = symbolicForms;

  function updateMappingTable() {
    const { firstTerm, secondTerm } = premise.terms;
    const nextMappingTable = copy(mappingTable);
    const nextMappingTableValues = Object.values(nextMappingTable);

    if (firstEntry.length > 0) {
      const firstSymbolIn0 = firstEntry[0].content;
      if (!(firstSymbolIn0 in nextMappingTable) && isLetter(firstSymbolIn0) && !nextMappingTableValues.includes(firstTerm)) {
        nextMappingTable[firstSymbolIn0] = firstTerm;
      } else if (firstSymbolIn0.length > 1) {
        const firstSymbolIn1 = firstSymbolIn0[1];

        if (!(firstSymbolIn1 in nextMappingTable) && isLetter(firstSymbolIn1) && !nextMappingTableValues.includes(firstTerm)) {
          nextMappingTable[firstSymbolIn1] = firstTerm;
        }
      }
    }

    if (thirdEntry.length > 0) {
      const thirdSymbolIn0 = thirdEntry[0].content;

      if (!(thirdSymbolIn0 in nextMappingTable) && isLetter(thirdSymbolIn0) && !nextMappingTableValues.includes(secondTerm)) {
        nextMappingTable[thirdSymbolIn0] = secondTerm;
      } else if (thirdSymbolIn0.length > 1) {
        const thirdSymbolIn1 = thirdSymbolIn0[1];

        if (!(thirdSymbolIn1 in nextMappingTable) && isLetter(thirdSymbolIn1) && !nextMappingTableValues.includes(secondTerm)) {
          nextMappingTable[thirdSymbolIn1] = secondTerm;
        }
      }
    }

    return nextMappingTable;
  }

  function performValidation() {
    const updatedMappingTable = updateMappingTable();
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
            secondMappingKey = `¬${mappingKey}`;
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

  return performValidation();
}

export {
  stages,
  validateVennDiagram,
  validateMappings,
  validateArgument,
};
